import Router from 'express';

import {
  createUserController,
  getManyUserController,
  getOneUserController,
  updateUserEditAccountController,
  loginController,
} from '../api/users/controller';

import {
  createBookController,
  deleteBookController,
  editBookController,
  getManyBookController,
  getOneBookController,
} from '../api/book/controller';

import { validateUpdateUser, valLogin, valUserCreate, valUserUpdate } from '../api/users/validate';
import { bookValidation } from '../api/book/validate';

import { valResult } from '../utils/validateResult';
import { verify } from '../utils/jwt';

const router = Router();

router.get( '/users', getManyUserController);
router.get( '/users/:id', getOneUserController);
router.post('/users', valUserCreate, valResult, createUserController);
router.put('/users/:id', validateUpdateUser, valResult, updateUserEditAccountController);
router.post('/login', valLogin, valResult, loginController);



// endpoint book
router.get('/books', verify, getManyBookController);
router.get('/books/:id', verify, getOneBookController);
router.post('/books/create', verify, bookValidation, valResult, createBookController);
router.put('/books/update', verify, bookValidation, valResult, editBookController);
router.put('/books/delete', verify, valResult, deleteBookController);

// endpoint book
router.get('/books', getManyUserController);
export default router;
