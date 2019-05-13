import {DefaultCrudRepository} from '@loopback/repository';
import {Comments} from '../models';
import {JsonplaceholderDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CommentsRepository extends DefaultCrudRepository<
  Comments,
  typeof Comments.prototype.id
> {
  constructor(
    @inject('datasources.jsonplaceholderDs') dataSource: JsonplaceholderDsDataSource,
  ) {
    super(Comments, dataSource);
  }
}
