import { Entity, model, belongsTo, property } from '@loopback/repository';
import { Posts } from '../models';

@model()
export class Comments extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id: number;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  body?: string;

  @property({
    type: 'number',
  })
  postid: number;


  constructor(data?: Partial<Comments>) {
    super(data);
  }
}
