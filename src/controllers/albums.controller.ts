import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
  HttpErrors,
} from '@loopback/rest';
import { Albums } from '../models';
import { AlbumsRepository, UsersRepository } from '../repositories';

export class AlbumsController {
  constructor(
    @repository(AlbumsRepository)
    public albumsRepository: AlbumsRepository,
    @repository(UsersRepository)
    public usersRepository: UsersRepository
  ) { }

  @post('/albums', {
    responses: {
      '200': {
        description: 'Albums model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Albums } } },
      },
    },
  })
  async create(@requestBody() albums: Albums): Promise<Albums> {
    const user = await this.usersRepository.findById(albums.userid, {
      fields: {
        id: true,
        name: true,
        username: true
      }
    });

    if (!user) {
      throw new HttpErrors[404]();
    } else {
      return await this.albumsRepository.create(albums);
    }
  }

  @get('/albums/count', {
    responses: {
      '200': {
        description: 'Albums model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Albums)) where?: Where,
  ): Promise<Count> {
    return await this.albumsRepository.count(where);
  }

  @get('/albums', {
    responses: {
      '200': {
        description: 'Array of Albums model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Albums } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Albums)) filter?: Filter,
  ): Promise<Albums[]> {
    return await this.albumsRepository.find(filter);
  }

  @patch('/albums', {
    responses: {
      '200': {
        description: 'Albums PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() albums: Albums,
    @param.query.object('where', getWhereSchemaFor(Albums)) where?: Where,
  ): Promise<Count> {
    return await this.albumsRepository.updateAll(albums, where);
  }

  @get('/albums/{id}', {
    responses: {
      '200': {
        description: 'Albums model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Albums } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Albums> {
    return await this.albumsRepository.findById(id);
  }

  @patch('/albums/{id}', {
    responses: {
      '204': {
        description: 'Albums PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() albums: Albums,
  ): Promise<void> {
    await this.albumsRepository.updateById(id, albums);
  }

  @put('/albums/{id}', {
    responses: {
      '204': {
        description: 'Albums PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() albums: Albums,
  ): Promise<void> {
    await this.albumsRepository.replaceById(id, albums);
  }

  @del('/albums/{id}', {
    responses: {
      '204': {
        description: 'Albums DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.albumsRepository.deleteById(id);
  }
}
