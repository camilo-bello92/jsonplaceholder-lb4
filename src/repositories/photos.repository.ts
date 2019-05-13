import {DefaultCrudRepository} from '@loopback/repository';
import {Photos} from '../models';
import {JsonplaceholderDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PhotosRepository extends DefaultCrudRepository<
  Photos,
  typeof Photos.prototype.id
> {
  constructor(
    @inject('datasources.jsonplaceholderDs') dataSource: JsonplaceholderDsDataSource,
  ) {
    super(Photos, dataSource);
  }
}
