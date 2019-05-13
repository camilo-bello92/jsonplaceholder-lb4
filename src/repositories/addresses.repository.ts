import {DefaultCrudRepository} from '@loopback/repository';
import {Addresses} from '../models';
import {JsonplaceholderDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AddressesRepository extends DefaultCrudRepository<
  Addresses,
  typeof Addresses.prototype.id
> {
  constructor(
    @inject('datasources.jsonplaceholderDs') dataSource: JsonplaceholderDsDataSource,
  ) {
    super(Addresses, dataSource);
  }
}
