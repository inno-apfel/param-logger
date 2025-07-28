class NotAuthenticatedError extends Error {
  statusCode: number = 401;
  messages: string[];
  constructor() {
    const message = 'User not authenticated'
    super(message);
    this.name = 'NotAuthenticatedError';
    this.messages = [message];
  }
}

export default NotAuthenticatedError;