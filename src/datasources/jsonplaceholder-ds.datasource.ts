import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './jsonplaceholder-ds.datasource.json';

export class JsonplaceholderDsDataSource extends juggler.DataSource {
  static dataSourceName = 'jsonplaceholderDs';

  constructor(
    @inject('datasources.config.jsonplaceholderDs', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
