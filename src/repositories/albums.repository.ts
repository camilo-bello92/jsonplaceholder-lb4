import {DefaultCrudRepository} from '@loopback/repository';
import {Albums} from '../models';
import {JsonplaceholderDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AlbumsRepository extends DefaultCrudRepository<
  Albums,
  typeof Albums.prototype.id
> {
  constructor(
    @inject('datasources.jsonplaceholderDs') dataSource: JsonplaceholderDsDataSource,
  ) {
    super(Albums, dataSource);
  }
}
