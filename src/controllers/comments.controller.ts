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
import {Comments} from '../models';
import {CommentsRepository} from '../repositories';

export class CommentsController {
  constructor(
    @repository(CommentsRepository)
    public commentsRepository : CommentsRepository,
  ) {}

  @post('/comments', {
    responses: {
      '200': {
        description: 'Comments model instance',
        content: {'application/json': {schema: {'x-ts-type': Comments}}},
      },
    },
  })
  async create(@requestBody() comments: Comments): Promise<Comments> {
    return await this.commentsRepository.create(comments);
  }

  @get('/comments/count', {
    responses: {
      '200': {
        description: 'Comments model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Comments)) where?: Where,
  ): Promise<Count> {
    return await this.commentsRepository.count(where);
  }

  @get('/comments', {
    responses: {
      '200': {
        description: 'Array of Comments model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Comments}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Comments)) filter?: Filter,
  ): Promise<Comments[]> {
    return await this.commentsRepository.find(filter);
  }

  @patch('/comments', {
    responses: {
      '200': {
        description: 'Comments PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() comments: Comments,
    @param.query.object('where', getWhereSchemaFor(Comments)) where?: Where,
  ): Promise<Count> {
    return await this.commentsRepository.updateAll(comments, where);
  }

  @get('/comments/{id}', {
    responses: {
      '200': {
        description: 'Comments model instance',
        content: {'application/json': {schema: {'x-ts-type': Comments}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Comments> {
    return await this.commentsRepository.findById(id);
  }

  @patch('/comments/{id}', {
    responses: {
      '204': {
        description: 'Comments PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() comments: Comments,
  ): Promise<void> {
    await this.commentsRepository.updateById(id, comments);
  }

  @put('/comments/{id}', {
    responses: {
      '204': {
        description: 'Comments PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() comments: Comments,
  ): Promise<void> {
    await this.commentsRepository.replaceById(id, comments);
  }

  @del('/comments/{id}', {
    responses: {
      '204': {
        description: 'Comments DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.commentsRepository.deleteById(id);
  }
}
