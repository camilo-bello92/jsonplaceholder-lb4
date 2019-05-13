import { DefaultCrudRepository } from '@loopback/repository';
import { Companies } from '../models';
import { JsonplaceholderDsDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class CompaniesRepository extends DefaultCrudRepository<
  Companies,
  typeof Companies.prototype.id
  > {
  constructor(
    @inject('datasources.jsonplaceholderDs') dataSource: JsonplaceholderDsDataSource,
  ) {
    super(Companies, dataSource);
  }
}
