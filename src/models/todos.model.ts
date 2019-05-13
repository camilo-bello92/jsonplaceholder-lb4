import { Entity, model, property } from '@loopback/repository';

@model()
export class Todos extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  title?: string;

  @property({
    type: 'boolean',
  })
  completed?: boolean;

  @property({
    type: 'number',
  })
  userid?: number;

  constructor(data?: Partial<Todos>) {
    super(data);
  }
}
