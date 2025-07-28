type ResourceType = 'User' | 'Tank' | 'Parameter' | 'Observation'; // Add your resource types

class NotFoundError extends Error {
  statusCode: number = 404;
  resource: ResourceType;
  messages: string[];

  constructor(resource: ResourceType, id: string) {
    const message = `${resource} with id "${id}" not found`
    super(message);
    this.name = 'NotFoundError';
    this.resource = resource;
    this.messages = [message];
  }
}

export default NotFoundError;