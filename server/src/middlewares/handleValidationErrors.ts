import { validationResult } from 'express-validator';
import { 
    Request, 
    Response, 
    NextFunction 
} from 'express';
import ValidationError from '../errors/ValidationError'

function handleValidationErrors(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map(x => x.msg)
    throw new ValidationError(messages);
  }
  else{
    return next();
  }
};

export default handleValidationErrors