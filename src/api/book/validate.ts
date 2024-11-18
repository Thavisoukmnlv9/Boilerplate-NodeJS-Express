import { body } from 'express-validator';

export const bookValidation = [
  body('title').not().isEmpty().withMessage('Please provide the book title').isString().withMessage('The book title must be a string'),
  body('content').not().isEmpty().withMessage('Please provide the book content').isString().withMessage('The book content must be a string'),
  body('bookTypeId').isInt().withMessage('The book type ID must be an integer').not().isEmpty().withMessage('Please provide the book type ID'),
  body('approvedDate').optional().isISO8601().withMessage('The approved date must be a valid ISO8601 date'),
  body('status').optional().isBoolean().withMessage('The status must be a boolean value'),
  body('bookIndex').optional().isInt().withMessage('The book index must be an integer'),
];
