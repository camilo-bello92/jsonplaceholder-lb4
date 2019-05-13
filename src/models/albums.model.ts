import { Entity, model, hasMany, property } from '@loopback/repository';
import { Photos } from '../models';

@model()
export class Albums extends Entity {
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
  })
  title?: string;

  @hasMany(() => Photos, { keyTo: 'albumid' })
  photos?: Photos[];

  constructor(data?: Partial<Albums>) {
    super(data);
  }
}
