import { PokemonResponse } from "src/seed/interfaces/pokemon-response.interface";
import { HttpAdapter } from "../interfaces/http-adapter.interface";
import axios, { AxiosInstance } from "axios";
import { Injectable } from "@nestjs/common";
import { CreatePokemonDto } from "src/pokemon/dto/create-pokemon.dto";

@Injectable()
export class AxiosAdapter implements HttpAdapter {
    
    
    post<T>(url: string, body: CreatePokemonDto): Promise<T> {
        throw new Error("Method not implemented.");
    }


    private readonly _axios: AxiosInstance = axios


    async get<PokemonResponse>(url: string): Promise<PokemonResponse> {

        try {

            const { data } = await this._axios.get<PokemonResponse>(url)

            return data


        } catch (error) {

            throw new Error("Error adaptador axios")

        }

    }

}