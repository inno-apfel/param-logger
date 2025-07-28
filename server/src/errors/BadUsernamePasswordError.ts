class BadUsernamePasswordError extends Error {
  statusCode: number = 401;
  messages: string[];
  constructor() {
    const message = 'Incorrect Username Password Combination'
    super(message);
    this.name = 'BadUsernamePasswordError';
    this.messages = [message];
  }
}

export default BadUsernamePasswordError;