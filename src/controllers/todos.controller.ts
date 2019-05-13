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
import {Todos} from '../models';
import {TodosRepository} from '../repositories';

export class TodosController {
  constructor(
    @repository(TodosRepository)
    public todosRepository : TodosRepository,
  ) {}

  @post('/todos', {
    responses: {
      '200': {
        description: 'Todos model instance',
        content: {'application/json': {schema: {'x-ts-type': Todos}}},
      },
    },
  })
  async create(@requestBody() todos: Todos): Promise<Todos> {
    return await this.todosRepository.create(todos);
  }

  @get('/todos/count', {
    responses: {
      '200': {
        description: 'Todos model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Todos)) where?: Where,
  ): Promise<Count> {
    return await this.todosRepository.count(where);
  }

  @get('/todos', {
    responses: {
      '200': {
        description: 'Array of Todos model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Todos}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Todos)) filter?: Filter,
  ): Promise<Todos[]> {
    return await this.todosRepository.find(filter);
  }

  @patch('/todos', {
    responses: {
      '200': {
        description: 'Todos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() todos: Todos,
    @param.query.object('where', getWhereSchemaFor(Todos)) where?: Where,
  ): Promise<Count> {
    return await this.todosRepository.updateAll(todos, where);
  }

  @get('/todos/{id}', {
    responses: {
      '200': {
        description: 'Todos model instance',
        content: {'application/json': {schema: {'x-ts-type': Todos}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Todos> {
    return await this.todosRepository.findById(id);
  }

  @patch('/todos/{id}', {
    responses: {
      '204': {
        description: 'Todos PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() todos: Todos,
  ): Promise<void> {
    await this.todosRepository.updateById(id, todos);
  }

  @put('/todos/{id}', {
    responses: {
      '204': {
        description: 'Todos PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() todos: Todos,
  ): Promise<void> {
    await this.todosRepository.replaceById(id, todos);
  }

  @del('/todos/{id}', {
    responses: {
      '204': {
        description: 'Todos DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.todosRepository.deleteById(id);
  }
}
