import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PokeDataService } from './poke-data.service';
import { CreatePokeDatumDto } from './dto/create-poke-datum.dto';
import { UpdatePokeDatumDto } from './dto/update-poke-datum.dto';

@Controller('poke-data')
export class PokeDataController {
  constructor(private readonly pokeDataService: PokeDataService) {}

  @Post()
  create(@Body() createPokeDatumDto: CreatePokeDatumDto) {
    return this.pokeDataService.create(createPokeDatumDto);
  }

  @Get()
  findAll() {
    return this.pokeDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pokeDataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokeDatumDto: UpdatePokeDatumDto) {
    return this.pokeDataService.update(+id, updatePokeDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pokeDataService.remove(+id);
  }
}
