import { Module } from '@nestjs/common';
import { PokedatumService } from './poke-data.service';
import { PokedatumController } from './poke-data.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokedatum, PokedatumSchema } from './entities/poke-datum.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pokedatum.name, schema: PokedatumSchema },
    ]),
    HttpModule,
  ],
  controllers: [PokedatumController],
  providers: [PokedatumService],
})
export class PokeDataModule {}
