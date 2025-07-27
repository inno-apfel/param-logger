export class NotAuthenticatedError extends Error {
  statusCode: number = 401;
  constructor() {
    super('User not authenticated');
    this.name = 'NotAuthenticatedError';
    
  }
}
