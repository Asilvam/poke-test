import { Controller, Get, Param, Post, Body, Logger } from '@nestjs/common';
import { PokedatumService } from './poke-data.service';
import { Pokedatum } from './entities/poke-datum.entity';

@Controller('pokedata')
export class PokedatumController {
  logger = new Logger('PokedatumController');
  constructor(private readonly pokedatumService: PokedatumService) {}

  @Post()
  async create(
    @Body() createPokedatumDto: Partial<Pokedatum>,
  ): Promise<Pokedatum> {
    return this.pokedatumService.create(createPokedatumDto);
  }

  @Get()
  async findAll(): Promise<Pokedatum[]> {
    return this.pokedatumService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Pokedatum> {
    return this.pokedatumService.findOne(id);
  }

  @Get('pokemon/:name')
  async findOnePokemon(@Param('name') name: string) {
    const response = await this.pokedatumService.findOnePokemon(name);
    let payload = {};

    if (response.forms[0].name) {
      // this.logger.log('forms.name --> ' + response.forms[0].name);
      payload = {
        name: response.forms[0].name,
      };
    }
    if (response.name) {
      // this.logger.log('name --> ' + response.name);
      payload = {
        name: response.name,
      };
    }
    payload = {
      ...payload,
      height: response.height,
      weight: response.weight,
      id: response.id,
    };
    return payload;
  }
}
