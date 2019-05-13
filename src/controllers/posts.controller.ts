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
  RestBindings,
  Response
} from '@loopback/rest';
import { Posts } from '../models';
import { PostsRepository, UsersRepository } from '../repositories';
import { inject } from '@loopback/context';

export class PostsController {
  constructor(
    @repository(PostsRepository)
    public postsRepository: PostsRepository,
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
    @inject(RestBindings.Http.RESPONSE) private res: Response
  ) { }

  @post('/posts', {
    responses: {
      '201': {
        description: 'Posts model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Posts } } },
      },
    },
  })
  async create(@requestBody() posts: Posts): Promise<Posts> {
    const user = await this.usersRepository.findById(posts.userid, {
      fields: {
        id: true,
        name: true,
        username: true
      }
    });
    if (!user) {
      throw new HttpErrors[404]("");
    } else {
      return await this.postsRepository.create(posts);
    }
  }

  @get('/posts/count', {
    responses: {
      '200': {
        description: 'Posts model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Posts)) where?: Where,
  ): Promise<Count> {
    return await this.postsRepository.count(where);
  }

  @get('/posts', {
    responses: {
      '200': {
        description: 'Array of Posts model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Posts } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Posts)) filter?: Filter,
  ): Promise<Posts[]> {
    return await this.postsRepository.find(filter);
  }

  @patch('/posts', {
    responses: {
      '200': {
        description: 'Posts PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() posts: Posts,
    @param.query.object('where', getWhereSchemaFor(Posts)) where?: Where,
  ): Promise<Count> {
    return await this.postsRepository.updateAll(posts, where);
  }

  @get('/posts/{id}', {
    responses: {
      '200': {
        description: 'Posts model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Posts } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Posts> {
    return await this.postsRepository.findById(id);
  }

  @patch('/posts/{id}', {
    responses: {
      '204': {
        description: 'Posts PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() posts: Posts,
  ): Promise<void> {
    await this.postsRepository.updateById(id, posts);
  }

  @put('/posts/{id}', {
    responses: {
      '204': {
        description: 'Posts PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() posts: Posts,
  ): Promise<void> {
    await this.postsRepository.replaceById(id, posts);
  }

  @del('/posts/{id}', {
    responses: {
      '204': {
        description: 'Posts DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.postsRepository.deleteById(id);
  }
}
