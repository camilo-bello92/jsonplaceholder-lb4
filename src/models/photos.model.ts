import { Entity, model, property } from '@loopback/repository';

@model()
export class Photos extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id: number;

  @property({
    type: 'number'
  })
  albumid: number;

  @property({
    type: 'string',
  })
  title?: string;

  @property({
    type: 'string',
  })
  url?: string;

  @property({
    type: 'string',
  })
  thumbnailurl?: string;

  constructor(data?: Partial<Photos>) {
    super(data);
  }
}
