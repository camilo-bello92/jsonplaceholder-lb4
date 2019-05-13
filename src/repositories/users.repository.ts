import {
  DefaultCrudRepository,
  HasOneRepositoryFactory,
  HasManyRepositoryFactory,
  repository
} from '@loopback/repository';
import { Users, Companies, Addresses, Posts, Albums, Todos } from '../models';
import { CompaniesRepository, AddressesRepository, PostsRepository, AlbumsRepository, TodosRepository } from './';
import { JsonplaceholderDsDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';

export class UsersRepository extends DefaultCrudRepository<Users, typeof Users.prototype.id>
{
  public readonly company: HasOneRepositoryFactory<Companies, typeof Users.prototype.id>;
  public readonly address: HasOneRepositoryFactory<Addresses, typeof Users.prototype.id>;
  public readonly posts: HasManyRepositoryFactory<Posts, typeof Users.prototype.id>;
  public readonly albums: HasManyRepositoryFactory<Albums, typeof Users.prototype.id>;
  public readonly todos: HasManyRepositoryFactory<Todos, typeof Users.prototype.id>;

  constructor(
    @inject('datasources.jsonplaceholderDs') dataSource: JsonplaceholderDsDataSource,
    @repository.getter('CompaniesRepository')
    getCompanyRepository: Getter<CompaniesRepository>,
    @repository.getter('AddressesRepository')
    getAddressesRepository: Getter<AddressesRepository>,
    @repository.getter('PostsRepository')
    getPostsRepository: Getter<PostsRepository>,
    @repository.getter('AlbumsRepository')
    getAlbumsRepository: Getter<AlbumsRepository>,
    @repository.getter('TodosRepository')
    getTodosRepository: Getter<TodosRepository>
  ) {
    super(Users, dataSource);
    this.company = this.createHasOneRepositoryFactoryFor(
      'company',
      getCompanyRepository,
    );

    this.address = this.createHasOneRepositoryFactoryFor(
      'address',
      getAddressesRepository,
    );

    this.posts = this.createHasManyRepositoryFactoryFor(
      'posts',
      getPostsRepository,
    );

    this.albums = this.createHasManyRepositoryFactoryFor(
      'albums',
      getAlbumsRepository,
    );

    this.todos = this.createHasManyRepositoryFactoryFor(
      'todos',
      getTodosRepository,
    );
  }
}
