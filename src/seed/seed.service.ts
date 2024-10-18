import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios'
import { PokemonResponse } from './interfaces/pokemon-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { FetchAdapter } from 'src/common/adapters/fetch.adapter';

@Injectable()
export class SeedService {


  constructor(
    @InjectModel(Pokemon.name)
    private readonly _pokemonModelMongoose: Model<Pokemon>,
    private _httpAdapterSelfAxios: AxiosAdapter,
    private _httpAdapterSelfFetch: FetchAdapter

  ) { }


  async executeSeed() {


    await this._pokemonModelMongoose.deleteMany({})

    const pokemonArraySeed: { name: string, numero: number }[] = []


    //const data = await this._httpAdapterSelfAxios.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=1000')

    const data = await this._httpAdapterSelfFetch.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=1000')


    data.results.forEach(async ({ name, url }) => {


      const segments = url.split("/")
      const numero = Number(segments[segments.length - 2])

      pokemonArraySeed.push({ name, numero })

      //const pokemonCreateed = await this._pokemonModelMongoose.create({ name, numero })


    })


    await this._pokemonModelMongoose.insertMany(pokemonArraySeed)



    return "seed OK"//data.results
  }

}

