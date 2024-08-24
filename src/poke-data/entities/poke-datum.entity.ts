import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'pokemon_data', timestamps: true })
export class Pokedatum extends Document {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop()
  height: number;

  @Prop()
  weight: number;
}

export const PokedatumSchema = SchemaFactory.createForClass(Pokedatum);
