import {DefaultCrudRepository} from '@loopback/repository';
import {Todos} from '../models';
import {JsonplaceholderDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TodosRepository extends DefaultCrudRepository<
  Todos,
  typeof Todos.prototype.id
> {
  constructor(
    @inject('datasources.jsonplaceholderDs') dataSource: JsonplaceholderDsDataSource,
  ) {
    super(Todos, dataSource);
  }
}
