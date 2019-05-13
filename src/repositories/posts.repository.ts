import {DefaultCrudRepository} from '@loopback/repository';
import {Posts} from '../models';
import {JsonplaceholderDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PostsRepository extends DefaultCrudRepository<
  Posts,
  typeof Posts.prototype.id
> {
  constructor(
    @inject('datasources.jsonplaceholderDs') dataSource: JsonplaceholderDsDataSource,
  ) {
    super(Posts, dataSource);
  }
}
