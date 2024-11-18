import { body } from 'express-validator';

export const valBookType = [
  body('title').not().isEmpty().withMessage('ກະລຸນາປ້ອນ ຊື່ປຶ້ມ'),
  body('subtitle').optional().isString().withMessage('ກະລຸນາປ້ອນ ຄໍາອະທິບາຍປຶ້ມ'),
  body('iconPath').not().isEmpty().withMessage('ກະລຸນາປ້ອນພາບປຶ້ມ'),
];
