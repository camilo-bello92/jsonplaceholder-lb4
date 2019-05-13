import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Users } from './users.model';

@model({ settings: { strict: false } })
export class Companies extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id: number;

  @property({
    type: 'number'
  })
  userid: number;

  @property({
    type: 'string',
    required: true
  })
  name: string;

  @property({
    type: 'string',
    required: true
  })
  catchphrase: string;

  @property({
    type: 'string',
    required: true
  })
  bs: string;

  constructor(data: Partial<Companies>) {
    super(data);
  }
}
