import { Comments } from '../models/comments.model';
import { Entity, model, hasMany, property } from '@loopback/repository';

@model()
export class Posts extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id: number;

  @property({
    type: 'number',
    required: true
  })
  userid: number;

  @property({
    type: 'string',
    required: true,
    min: 8,
    max: 20
  })
  title: string;

  @property({
    type: 'string',
    required: true
  })
  body: string;

  @hasMany(() => Comments, { keyTo: 'postid' })
  comments: Comments[];

  constructor(data?: Partial<Posts>) {
    super(data);
  }
}
