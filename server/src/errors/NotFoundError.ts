type ResourceType = 'User' | 'Tank' | 'Parameter' | 'Observation'; // Add your resource types

export class NotFoundError extends Error {
  statusCode: number = 404;
  resource: ResourceType;

  constructor(resource: ResourceType, id: string) {
    super(`${resource} with id ${id} not found`);
    this.name = 'NotFoundError';
    this.resource = resource;
    
  }
}

