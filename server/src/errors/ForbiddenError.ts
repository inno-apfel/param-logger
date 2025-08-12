class ForbiddenError extends Error {
  statusCode: number = 403;
  messages: string[];
  constructor() {
    const message = 'You do not have permission to access this resource.'
    super(message);
    this.name = 'ForbiddenError';
    this.messages = [message];
  }
}

export default ForbiddenError;