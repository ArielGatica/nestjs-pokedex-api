import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Model, isValidObjectId } from 'mongoose'
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  private defaultLimit: number;

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService
  ){
    this.defaultLimit = configService.get<number>('defaultLimit')
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase()
    try {
      await this.pokemonModel.create(createPokemonDto)
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async findAll() {
    return await this.pokemonModel.find()
  }

  async findAllPaginated( paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset } = paginationDto;
    return await this.pokemonModel.find().limit(limit).skip(offset).select('-__v')
  }

  async findOne(param: string) {
    let pokemon;

    if(!pokemon && isValidObjectId(param))
      pokemon = await this.pokemonModel.findById({ _id: param})

    if(!isNaN(+param))
      pokemon = await this.pokemonModel.findOne({ no: param })

    if(!pokemon)
      pokemon = await this.pokemonModel.findOne({ name: param.toLocaleLowerCase().trim() })

    if(!pokemon)
      throw new NotFoundException(`Pokemon not found with: '${param}'`)

    return pokemon;
  }

  async update(param: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne( param )
    if(updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase()

    try {
      await pokemon.updateOne(updatePokemonDto, { new: true })
      return { ...pokemon.toJSON(), ...updatePokemonDto }
    } catch (error) {
      this.handleExceptions(error)
    }
    return pokemon
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id })
    if( deletedCount === 0 )
      throw new NotFoundException(`Pokemon not found with _id: '${id}'`)
  }

  private handleExceptions(error: any){
    if(error.code === 11000) 
      throw new BadRequestException(`Pokemon exists yet in database ${JSON.stringify(error.keyValue)}`)

    throw new InternalServerErrorException(`Can't create Pokemon - Chek the logs`)
  }
}
