import { Todos } from '../models/todos.model';
import { Addresses } from '../models/addresses.model';
import { Posts } from '../models/posts.model';
import { Albums } from '../models/albums.model';
import { Companies } from '../models/companies.model';
import { Entity, model, hasOne, hasMany, property } from '@loopback/repository';

@model()
export class Users extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id: number;

  @property({
    type: 'string',
  })
  name: string;

  @property({
    type: 'string',
  })
  username: string;

  @property({
    type: 'string',
  })
  email: string;

  @property({
    type: 'string',
  })
  phone: string;

  @property({
    type: 'string',
  })
  website: string;

  @hasMany(() => Todos, { keyTo: 'userid' })
  todos?: Todos[];

  @property({
    type: Addresses
  })
  @hasOne(() => Addresses, { keyTo: 'userid' })
  address: Addresses;

  @property({
    type: Companies
  })
  @hasOne(() => Companies, { keyTo: 'userid' })
  company: Companies;

  @property({
    type: Posts,
    required: false,
    hidden: true
  })
  @hasMany(() => Posts, { keyTo: 'userid' })
  posts: Posts[];

  @hasMany(() => Albums, { keyTo: 'userid' })
  albums: Albums[]

  constructor(data?: Partial<Users>) {
    super(data);
  }
}
