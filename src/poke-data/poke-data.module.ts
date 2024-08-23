import { Module } from '@nestjs/common';
import { PokeDataService } from './poke-data.service';
import { PokeDataController } from './poke-data.controller';

@Module({
  controllers: [PokeDataController],
  providers: [PokeDataService],
})
export class PokeDataModule {}
