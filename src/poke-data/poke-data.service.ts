import { Injectable } from '@nestjs/common';
import { CreatePokeDatumDto } from './dto/create-poke-datum.dto';
import { UpdatePokeDatumDto } from './dto/update-poke-datum.dto';

@Injectable()
export class PokeDataService {
  create(createPokeDatumDto: CreatePokeDatumDto) {
    return 'This action adds a new pokeDatum';
  }

  findAll() {
    return `This action returns all pokeData`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokeDatum`;
  }

  update(id: number, updatePokeDatumDto: UpdatePokeDatumDto) {
    return `This action updates a #${id} pokeDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokeDatum`;
  }
}
