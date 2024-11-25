import { body } from 'express-validator';

export const valUserCreate = [
  body('fullName').not().isEmpty().withMessage('ກະລຸນາປ້ອນ ຊື່ ແລະ ນາມສະກຸນ'),
  body('tel')
    .not()
    .isEmpty()
    .withMessage('ກະລຸນາປ້ອນ ໝາຍເລກໂທລະສັບ')
    .isLength({ min: 8, max: 8 })
    .withMessage('ກະລຸນາປ້ອນ ໝາຍເລກໂທລະສັບ 8 ເທົ່ານັ້ນ'),
  body('password').not().isEmpty().withMessage('ກະລຸນາປ້ອນ ລະຫັດຜ່ານ'),
];

export const valUserUpdate = [
  body('fullName').not().isEmpty().withMessage('ກະລຸນາປ້ອນ ຊື່ ແລະ ນາມສະກຸນ'),
  body('tel')
    .not()
    .isEmpty()
    .withMessage('ກະລຸນາປ້ອນ ໝາຍເລກໂທລະສັບ')
    .isLength({ min: 8, max: 8 })
    .withMessage('ກະລຸນາປ້ອນ ໝາຍເລກໂທລະສັບ 8 ເທົ່ານັ້ນ'),
  body('password').not().isEmpty().withMessage('ກະລຸນາປ້ອນ ລະຫັດຜ່ານ'),
];

export const validateUpdateUser = [
  body('tel')
    .not()
    .isEmpty()
    .withMessage('ກະລຸນາປ້ອນ ເບີໂທລະສັບ')
    .isLength({ min: 8, max: 11 })
    .withMessage('ເບີໂທລະສັບຈະຕ້ອງມີຄວາມຍາວ 11 ໂຕອັກສອນ')
    .custom((value) => {
      if (!/^\d+$/.test(value)) {
        throw new Error('ເບີໂທລະສັບຕ້ອງເປັນໂຕເລກເທົ່ານັ້ນ');
      }
      return true;
    }),
  body('fullName').not().isEmpty().withMessage('fullName is required'),
  body('email')
    .optional()
    .custom((value) => {
      if (value) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(value)) {
          throw new Error('ຮູບແບບອີເມວບໍ່ຖືກຕ້ອງ');
        }
      }
      return true;
    }),
  body('password')
    .optional()
    .custom((value) => {
      if (value) {
        if (value.length < 6) {
          throw new Error('ລະຫັດຜ່ານຕ້ອງມີຢ່າງໜ້ອຍ 6 ຕົວອັກສອນ');
        }
      }
      return true;
    }),
];
export const valLogin = [
  body('tel')
    .not()
    .isEmpty()
    .withMessage('ກະລຸນາປ້ອນ ໝາຍເລກໂທລະສັບ')
    .isLength({ min: 8, max: 8 })
    .withMessage('ກະລຸນາປ້ອນ ໝາຍເລກໂທລະສັບ 8 ເທົ່ານັ້ນ'),
  body('password').not().isEmpty().withMessage('ກະລຸນາປ້ອນ ລະຫັດຜ່ານ'),
];
