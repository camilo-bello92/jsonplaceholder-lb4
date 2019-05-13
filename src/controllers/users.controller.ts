import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
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
  Response,
  RestBindings
} from '@loopback/rest';
import { Users, Addresses, Companies } from '../models';
import { UsersRepository, AddressesRepository, CompaniesRepository } from '../repositories';
import { inject } from '@loopback/context';

export class UsersController {
  constructor(
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
    @repository(AddressesRepository)
    public addressRepository: AddressesRepository,
    @repository(CompaniesRepository)
    public companiesRepository: CompaniesRepository,
    @inject(RestBindings.Http.RESPONSE) private res: Response
  ) { }

  @post('/users', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Users } } },
      },
    },
  })
  async create(@requestBody() users: Users): Promise<Users> {
    let user: Users = new Users({
      name: users.name,
      username: users.username,
      email: users.email,
      phone: users.phone,
      website: users.website
    });


    const res = await this.usersRepository.create(user);
    res.company = new Companies({
      userid: res.id,
      name: users.company.name,
      catchphrase: users.company.catchphrase,
      bs: users.company.bs
    });

    res.address = new Addresses({
      userid: res.id,
      street: users.address.street,
      suite: users.address.suite,
      city: users.address.city,
      zipcode: users.address.zipcode,
      lat: users.address.lat,
      lng: users.address.lng

    });

    await this.companiesRepository.create(res.company);
    await this.addressRepository.create(res.address);
    console.log(res);
    return res;
  }

  @get('/users/count', {
    responses: {
      '200': {
        description: 'Users model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Users)) where?: Where,
  ): Promise<Count> {
    return await this.usersRepository.count(where);
  }

  @get('/users', {
    responses: {
      '200': {
        description: 'Array of Users model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Users } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Users)) filter?: Filter,
  ): Promise<Users[]> {
    filter = { fields: { id: true, name: true, username: true, email: true, website: true } };
    const res = await this.usersRepository.find(filter);
    return res;
  }


  @get('/users/posts', {
    responses: {
      '200': {
        description: 'Array of Users model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Users } },
          },
        },
      },
    },
  })
  async getPostsUsers(): Promise<Users[]> {

    const res = await this.usersRepository.find({ fields: { id: true, name: true, username: true, email: true, website: true } });
    console.log();
    for (let i = 0; i < res.length; i++) {
      try {
        let postsUser = await this.usersRepository.posts(res[i].id).find();
        res[i].posts = postsUser;
      } catch (error) {
        res[i].posts = [];
      }
    }
    return res;
  }

  @get('/users/details', {
    responses: {
      '200': {
        description: 'Array of Users model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Users } }
          },
        },
      },
    },
  })
  async usersDetails(): Promise<Users[]> {
    const res = await this.usersRepository.find({
      fields: {
        id: true,
        name: true,
        username: true,
        email: true,
        phone: true,
        website: true
      }
    });

    for (let i = 0; i < res.length; i++) {
      try {
        const address = await this.usersRepository.address(res[i].id).get();
        res[i].address = new Addresses(address);

      } catch (error) {
        res[i].address = new Addresses();
      }

      try {
        const company = await this.usersRepository.company(res[i].id).get();
        res[i].company = new Companies(company);

      } catch (error) {
        res[i].company = new Companies({});
      }
    }
    return res;
  }

  @get('/users/{id}', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Users } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Users> {
    const res = await this.usersRepository.findById(id, { fields: { id: true, name: true, username: true, email: true, phone: true, website: true } });

    try {
      const dir = await this.usersRepository.address(id).get();
      res.address = new Addresses(dir);
    } catch (error) {
      res.address = new Addresses({});
    }

    try {
      const comp = await this.usersRepository.company(id).get({ fields: { name: true, catchphrase: true, bs: true } });
      res.company = new Companies(comp);
    } catch (error) {
      res.company = new Companies({});
    }

    return res;
  }

  @put('/users/{id}', {
    responses: {
      '204': {
        description: 'Users PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() users: Users,
  ): Promise<void> {
    await this.usersRepository.replaceById(id, users);
  }

  @del('/users/{id}', {
    responses: {
      '204': {
        description: 'Users DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.usersRepository.deleteById(id);
  }
}
