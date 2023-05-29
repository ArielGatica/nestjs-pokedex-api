import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ConfigModule } from '@nestjs/config';
import { PokeApiUrl } from 'src/config/env.config';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    ConfigModule.forRoot({
      load: [PokeApiUrl]
    }),
    PokemonModule, 
    CommonModule]
})
export class SeedModule {}
