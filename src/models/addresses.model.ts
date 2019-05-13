import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Users } from './';

@model({ settings: { strict: false } })
export class Addresses extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'number'
  })
  userid: number;

  /*@belongsTo(() => Users)
  usersId: number;*/

  @property({
    type: 'string',
  })
  street?: string;

  @property({
    type: 'string',
  })
  suite?: string;

  @property({
    type: 'string',
  })
  city?: string;

  @property({
    type: 'string',
  })
  zipcode?: string;

  @property({
    type: 'number'
  })
  lat: number;

  @property({
    type: 'number'
  })
  lng: number;

  constructor(data?: Partial<Addresses>) {
    super(data);
  }
}
