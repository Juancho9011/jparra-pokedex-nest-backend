import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Document, isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { isString } from 'class-validator';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { PokemonModule } from './pokemon.module';
import { PaginationDto } from 'src/common/dto/PaginationDto.dto';
import { log } from 'console';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {


  private _defaultLimit: number

  constructor(
    @InjectModel(Pokemon.name)
    private readonly _pokemonModelMongoose: Model<Pokemon>,
    private readonly configService: ConfigService
  ) {

    this._defaultLimit = configService.get<number>("default_limit")

  }

  async create(createPokemonDto: CreatePokemonDto) {

    try {

      createPokemonDto.name = createPokemonDto.name.toLowerCase()

      const pokemoncreated = await this._pokemonModelMongoose.create(createPokemonDto)

      return {
        pokemoncreated,
        message: 'The pokemon was create'
      }//;

    } catch (error) {

      this.handleException(error)

    }


  }

  findAll(paginationDto: PaginationDto) {


    let { limit, offset } = paginationDto

    if (!limit) {
      limit = this._defaultLimit
    }

    return this._pokemonModelMongoose.find()
      .limit(limit)
      .skip(offset)
      .sort({
        numero: 1
      })
      .select(['-numero', '-__v'])

  }

  async findOne(terminoBuscar: string) {

    try {
      let pokemon: Pokemon//Document<unknown, {}, Pokemon> & Pokemon & Required<{ _id: unknown; }> & { __v?: number; };
      //Por mongoID
      if (isValidObjectId(terminoBuscar)) {
        console.log("A buscar por mongo id");

        pokemon = await this._pokemonModelMongoose.findById(terminoBuscar)
      }

      // //Por campo numero
      if (!isNaN(+terminoBuscar)) {
        console.log("A buscar por campo numero");

        pokemon = await this._pokemonModelMongoose.findOne({ numero: terminoBuscar })
      }


      if (!pokemon) {
        console.log("A buscar por campo name");

        //Por mongoID
        pokemon = await this._pokemonModelMongoose.findOne({ name: terminoBuscar.toLowerCase().trim() })
      }


      if (!pokemon) {
        throw new NotFoundException(JSON.stringify(pokemon, null, 2))
      }

      return {
        message: `This action returns a #${terminoBuscar} pokemon`,
        pokemon
      }

    } catch (error) {

      console.error({ error });

      if (error.status === 404) {

        throw new NotFoundException(JSON.stringify(error, null, 2))
      }

      throw new InternalServerErrorException(error.message)


    }


  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {


    const pokemon = await this.findOne(term)


    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase()
    }


    try {

      await pokemon.pokemon.updateOne(updatePokemonDto, { new: true })

      return { ...pokemon.pokemon.toJSON(), ...updatePokemonDto }

    } catch (error) {

      this.handleException(error)
    }



  }

  async remove(id: string) {


    //const pokemonToDelete = await this.findOne(id)

    //await pokemonToDelete.pokemon.remove

    //this._pokemonModelMongoose.findByIdAndDelete(id)

    //await pokemonToDelete.pokemon.deleteOne()


    const { deletedCount } = await this._pokemonModelMongoose.deleteOne({ _id: id })

    if (deletedCount === 0) {

      throw new BadRequestException("No se encontró el pokemon para eliminar")

    }


    return `This action removes a #${id} pokemon`;


  }


  private handleException(error: any) {

    if (error.code === 11000) {

      throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue, null, 2)}, Message main ${error.errmsg}`)

    }

    throw new InternalServerErrorException("Check logs")
  }


}
