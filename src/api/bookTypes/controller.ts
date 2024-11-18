import { Request, Response } from 'express';
import { addBookTypeService, deleteBookTypeService, editBookTypeService, getManyBookTypeService } from './service';
import { StatusCodes } from 'http-status-codes';
import logger from '@middleware/logger/config';


export const getManyBookTypeController = async (req: Request, res: Response) => {
  const books = await getManyBookTypeService();
  res.json({
    status: 'ok',
    message: 'You have been authenticated',
    books,
  });
};

export const createBookTypeController = async (req: Request, res: Response) => {
  try {
    const bookTypeData = { ...req.body, createdAt: new Date(), updatedAt: new Date() };
    const newBookType = await addBookTypeService(bookTypeData);
    if (newBookType) {
      return res.status(StatusCodes.CREATED).json({
        status: 'success',
        message: 'Book type created successfully!',
        data: newBookType,
      });
    } else {
      throw new Error('Book type creation failed');
    }
  } catch (error) {
    logger.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Failed to create book type. Please try again later.',
    });
  }
};


export const editBookTypeController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const bookTypeData = { ...req.body };
  try {
    const updatedBookType = await editBookTypeService({ id: Number(id), data: bookTypeData });
    if (updatedBookType) {
      return res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'Book type updated successfully!',
        data: updatedBookType,
      });
    } else {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        message: 'No book type found. Update failed.',
      });
    }
  } catch (error) {
    logger.error(`Error updating book type ${error}`);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Failed to update book type. Please try again later.',
    });
  }
};

export const deleteBookTypeController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedAt = new Date();
  try {
    const deleteBookType = await deleteBookTypeService({ id: Number(id), data: { deletedAt } });
    if (deleteBookType) {
      return res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'Book type deleted successfully!',
      });
    } else {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        message: 'No book type found. Delete failed.',
      });
    }
  } catch (error) {
    logger.error(`Error deleting book type ${error}`);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Failed to deleted book type. Please try again later.',
    });
  }
};
