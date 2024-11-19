import { Request, Response } from 'express';
import { addBookService, deleteBookService, editBookService, getListBooksServices, getOneBookService } from './service';
import { StatusCodes } from 'http-status-codes';
import logger from '@middleware/logger/config';
import { books } from '@prisma/client';
import { generateModelFields } from '@utils/createRequestToModel';

export const getManyBookController = async (req: Request, res: Response) => {
  const { page, limit } = req.query;
  const books = await getListBooksServices({
    page: parseInt(page as string, 10) || 1,
    limit: parseInt(limit as string, 10) || 10,
  });
  res.json({
    status: 'ok',
    message: 'success',
    ...books,
  });
};

export const getOneBookController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const bookId = Number(id);
  const books = await getOneBookService(bookId);
  res.json({
    status: 'ok',
    message: 'success',
    books,
  });
};

export const createBookController = async (req: Request, res: Response) => {
  const body = req.body;
  const bookData = generateModelFields<books>({ body, model:'books' });
  try {
    const completeBookData = { ...bookData, approvedDate: new Date() };
    const newBook = await addBookService(completeBookData);
    if (newBook) {
      return res.status(StatusCodes.CREATED).json({
        status: 'success',
        message: 'Book newBook created successfully!',
        data: newBook,
      });
    }
  } catch (error) {
    logger.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Failed to create book newBook. Please try again later.',
    });
  }
};



export const editBookController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const bookData = { ...req.body };
  try {
    const updatedBook = await editBookService({ id: Number(id), data: bookData });
    if (updatedBook) {
      return res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'Book  updated successfully!',
        data: updatedBook,
      });
    } else {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        message: 'No book  found. Update failed.',
      });
    }
  } catch (error) {
    logger.error(`Error updating book  ${error}`);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Failed to update book . Please try again later.',
    });
  }
};

export const deleteBookController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedAt = new Date();
  try {
    const deleteBook = await deleteBookService({ id: Number(id), data: { deletedAt } });
    if (deleteBook) {
      return res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'Book  deleted successfully!',
      });
    } else {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        message: 'No book  found. Delete failed.',
      });
    }
  } catch (error) {
    logger.error(`Error deleting book  ${error}`);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Failed to deleted book . Please try again later.',
    });
  }
};

