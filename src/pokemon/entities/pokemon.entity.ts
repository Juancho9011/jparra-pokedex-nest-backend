import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document {

    @Prop({
        unique: true, // Asegura que no se repita
        index: true   // Mejora las consultas por este campo
    })
    numero: number;

    @Prop({
        unique: true, // Asegura que no se repita
        index: true   // Mejora las consultas por este campo
    })
    name: string;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
