import { Entity, model, property } from '@loopback/repository';

@model()
export class Comments extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id: number;

  @property({
    type: 'number',
  })
  postid: number;

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

  constructor(data?: Partial<Comments>) {
    super(data);
  }
}
