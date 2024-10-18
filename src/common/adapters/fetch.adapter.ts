import { PokemonResponse } from "src/seed/interfaces/pokemon-response.interface";
import { HttpAdapter } from "../interfaces/http-adapter.interface";
import axios, { AxiosInstance } from "axios";
import { Injectable } from "@nestjs/common";
import { CreatePokemonDto } from "src/pokemon/dto/create-pokemon.dto";

@Injectable()
export class FetchAdapter implements HttpAdapter {
  
  
    post<T>(url: string, body: CreatePokemonDto): Promise<T> {
        throw new Error("Method not implemented.");
    }


    async get<PokemonResponse>(url: string): Promise<PokemonResponse> {
        try {
            const requestOptions = {
                method: "GET"
            };
    
            // Realiza la petición fetch y procesa la respuesta
            const response = await fetch(url, requestOptions);
    
            // Verifica si la respuesta fue exitosa
            if (!response.ok) {
                throw new Error(`Error en la respuesta: ${response.status}`);
            }
    
            // Convierte la respuesta a formato JSON
            const data: PokemonResponse = await response.json();
    
            return data;
    
        } catch (error) {
            // Lanza un error con más detalles si es posible
            throw new Error(`Error en el adaptador fetch: ${(error as Error).message}`);
        }
    }

  
    

}