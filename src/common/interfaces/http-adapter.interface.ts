import { CreatePokemonDto } from "src/pokemon/dto/create-pokemon.dto"

export interface HttpAdapter {
    get<T>(url: string): Promise<T>
    post<T>(url: string, body: CreatePokemonDto): Promise<T>
}