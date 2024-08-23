import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokedatum } from './entities/poke-datum.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import * as process from 'node:process';

@Injectable()
export class PokedatumService {
  logger = new Logger(PokedatumService.name);
  private readonly BASE_URL = process.env.API_URL;
  constructor(
    @InjectModel(Pokedatum.name) private pokedatumModel: Model<Pokedatum>,
    private readonly httpService: HttpService,
  ) {}

  async create(data: Partial<Pokedatum>): Promise<Pokedatum> {
    const existingPokemon = await this.pokedatumModel
      .findOne({ id: data.id })
      .exec();
    if (existingPokemon) {
      throw new ConflictException(`Pokemon with ID ${data.id} already exists`);
    }
    const createdPokedatum = new this.pokedatumModel(data);
    return createdPokedatum.save();
  }

  async findAll(): Promise<Pokedatum[]> {
    return this.pokedatumModel.find().exec();
  }

  async findOne(id: number): Promise<Pokedatum> {
    const existingPokemon = await this.pokedatumModel.findOne({ id }).exec();
    if (!existingPokemon) {
      throw new NotFoundException(`Pokemon with ID ${id} dont exists`);
    }
    return existingPokemon;
  }

  async findOnePokemon(name: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService
          .get(`${this.BASE_URL}/${name}`)
          .pipe(map((res) => res.data)),
      );
      if (!response) {
        throw new NotFoundException(`Pokémon with name ${name} not found`);
      }
      return response;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundException(`Pokémon with name ${name} not found`);
      } else {
        throw new InternalServerErrorException(
          'An error occurred while fetching Pokémon data',
        );
      }
    }
  }
}
