import Router from "express";

import {
  createUserController,
  getManyUserController,
  loginController,
} from "../api/users/controller";

import {
  createBookTypeController,
  deleteBookTypeController,
  editBookTypeController,
  getManyBookTypeController,
} from "../api/bookTypes/controller";

import {
  createBookController,
  deleteBookController,
  editBookController,
  getManyBookController,
  getOneBookController,
} from "../api/book/controller";

import { valLogin, valUserCreate, valUserUpdate } from "../api/users/validate";
import { valBookType } from "../api/bookTypes/validate";
import { bookValidation } from "../api/book/validate";

import { valResult } from "../utils/validateResult";
import { verify } from "../utils/jwt";

const router = Router();

router.get( "/users", getManyUserController );
router.post("/users", valUserCreate, valResult, createUserController);
router.put("/users", valUserUpdate, valResult, createUserController);
router.post("/login", valLogin, valResult, loginController);

// endpoint book types
router.get("/books-types", verify, getManyBookTypeController);
router.post("/book-types/create", verify, valBookType, valResult, createBookTypeController);
router.put("/book-types/update/:id", verify, valBookType, valResult, editBookTypeController );
router.put("/book-types/delete/:id", verify, valResult, deleteBookTypeController);

// endpoint book
router.get("/books", verify, getManyBookController);
router.get("/books/:id", verify, getOneBookController);
router.post("/books/create", verify, bookValidation, valResult, createBookController);
router.put("/books/update", verify, bookValidation, valResult, editBookController);
router.put("/books/delete", verify, valResult, deleteBookController);

// endpoint book
router.get("/books", getManyUserController);
export default router;
