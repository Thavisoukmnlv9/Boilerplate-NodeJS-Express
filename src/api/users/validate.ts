import { body } from "express-validator";

export const valUserCreate = [
  body("fullName").not().isEmpty().withMessage("ກະລຸນາປ້ອນ ຊື່ ແລະ ນາມສະກຸນ"),
  body("tel")
    .not()
    .isEmpty()
    .withMessage("ກະລຸນາປ້ອນ ໝາຍເລກໂທລະສັບ")
    .isLength({ min: 8, max: 8 })
    .withMessage("ກະລຸນາປ້ອນ ໝາຍເລກໂທລະສັບ 8 ເທົ່ານັ້ນ"),
  body("password").not().isEmpty().withMessage("ກະລຸນາປ້ອນ ລະຫັດຜ່ານ"),
];

export const valUserUpdate = [
  body("fullName").not().isEmpty().withMessage("ກະລຸນາປ້ອນ ຊື່ ແລະ ນາມສະກຸນ"),
  body("tel")
    .not()
    .isEmpty()
    .withMessage("ກະລຸນາປ້ອນ ໝາຍເລກໂທລະສັບ")
    .isLength({ min: 8, max: 8 })
    .withMessage("ກະລຸນາປ້ອນ ໝາຍເລກໂທລະສັບ 8 ເທົ່ານັ້ນ"),
  body("password").not().isEmpty().withMessage("ກະລຸນາປ້ອນ ລະຫັດຜ່ານ"),
];

export const valLogin = [
  body("tel")
    .not()
    .isEmpty()
    .withMessage("ກະລຸນາປ້ອນ ໝາຍເລກໂທລະສັບ")
    .isLength({ min: 8, max: 8 })
    .withMessage("ກະລຸນາປ້ອນ ໝາຍເລກໂທລະສັບ 8 ເທົ່ານັ້ນ"),
  body("password").not().isEmpty().withMessage("ກະລຸນາປ້ອນ ລະຫັດຜ່ານ"),
];
