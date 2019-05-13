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
} from '@loopback/rest';
import {Photos} from '../models';
import {PhotosRepository} from '../repositories';

export class PhotosController {
  constructor(
    @repository(PhotosRepository)
    public photosRepository : PhotosRepository,
  ) {}

  @post('/photos', {
    responses: {
      '200': {
        description: 'Photos model instance',
        content: {'application/json': {schema: {'x-ts-type': Photos}}},
      },
    },
  })
  async create(@requestBody() photos: Photos): Promise<Photos> {
    return await this.photosRepository.create(photos);
  }

  @get('/photos/count', {
    responses: {
      '200': {
        description: 'Photos model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Photos)) where?: Where,
  ): Promise<Count> {
    return await this.photosRepository.count(where);
  }

  @get('/photos', {
    responses: {
      '200': {
        description: 'Array of Photos model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Photos}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Photos)) filter?: Filter,
  ): Promise<Photos[]> {
    return await this.photosRepository.find(filter);
  }

  @patch('/photos', {
    responses: {
      '200': {
        description: 'Photos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() photos: Photos,
    @param.query.object('where', getWhereSchemaFor(Photos)) where?: Where,
  ): Promise<Count> {
    return await this.photosRepository.updateAll(photos, where);
  }

  @get('/photos/{id}', {
    responses: {
      '200': {
        description: 'Photos model instance',
        content: {'application/json': {schema: {'x-ts-type': Photos}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Photos> {
    return await this.photosRepository.findById(id);
  }

  @patch('/photos/{id}', {
    responses: {
      '204': {
        description: 'Photos PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() photos: Photos,
  ): Promise<void> {
    await this.photosRepository.updateById(id, photos);
  }

  @put('/photos/{id}', {
    responses: {
      '204': {
        description: 'Photos PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() photos: Photos,
  ): Promise<void> {
    await this.photosRepository.replaceById(id, photos);
  }

  @del('/photos/{id}', {
    responses: {
      '204': {
        description: 'Photos DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.photosRepository.deleteById(id);
  }
}
