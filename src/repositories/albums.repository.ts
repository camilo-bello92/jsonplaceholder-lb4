import { DefaultCrudRepository, HasManyRepositoryFactory, repository } from '@loopback/repository';
import { Albums, Photos } from '../models';
import { JsonplaceholderDsDataSource } from '../datasources';
import { PhotosRepository } from './';
import { inject, Getter } from '@loopback/core';

export class AlbumsRepository extends DefaultCrudRepository<Albums, typeof Albums.prototype.id> {
  public readonly photos: HasManyRepositoryFactory<Photos, typeof Albums.prototype.id>;
  constructor(
    @inject('datasources.jsonplaceholderDs') dataSource: JsonplaceholderDsDataSource,
    @repository.getter('PhotosRepository')
    getPhotosRepository: Getter<PhotosRepository>) {
    super(Albums, dataSource);

    this.photos = this.createHasManyRepositoryFactoryFor(
      'photos',
      getPhotosRepository,
    );
  }
}
