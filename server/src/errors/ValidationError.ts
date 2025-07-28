class ValidationError extends Error {
  statusCode: number = 400;
  messages: string[];
  constructor(messages: string[]) {
    super('Input validations failed');
    this.name = 'ValidationError';
    this.messages = messages;
  }
}

export default ValidationError;