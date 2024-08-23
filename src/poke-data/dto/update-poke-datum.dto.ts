import { PartialType } from '@nestjs/mapped-types';
import { CreatePokeDatumDto } from './create-poke-datum.dto';

export class UpdatePokeDatumDto extends PartialType(CreatePokeDatumDto) {}
