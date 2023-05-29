import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/http-adapters/axios.adapter';
import { PokeApiUrl } from 'src/config/env.config';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
    private readonly configService :ConfigService
  ){}
 
  async executeSeed() {
    await this.pokemonModel.deleteMany({})
    const data = await this.http.get<PokeResponse>(this.configService.get<string>('apiUrl'))
    const pokemonToInsert: {name: string, no: number}[] = [];

    data.results.map(({ name, url }) => {
      const segments = url.split('/');
      const no =  +segments[segments.length -2]

      pokemonToInsert.push({ name, no })
    })

    await this.pokemonModel.insertMany(pokemonToInsert);
    return 'Seed exceuted';
  }
}
