import { DefaultCrudRepository, HasManyRepositoryFactory, repository } from '@loopback/repository';
import { Posts, Comments } from '../models';
import { CommentsRepository } from './';
import { JsonplaceholderDsDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';

export class PostsRepository extends DefaultCrudRepository<Posts, typeof Posts.prototype.id> {
  public readonly comments: HasManyRepositoryFactory<Comments, typeof Posts.prototype.id>;
  constructor(
    @inject('datasources.jsonplaceholderDs') dataSource: JsonplaceholderDsDataSource,
    @repository.getter('CommentsRepository')
    getCommentsRepository: Getter<CommentsRepository>
  ) {
    super(Posts, dataSource);
    this.comments = this.createHasManyRepositoryFactoryFor(
      'comments',
      getCommentsRepository,
    );
  }
}
