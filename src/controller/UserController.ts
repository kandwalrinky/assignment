import { Request, Response } from "express";
import { errorRes, successRes, validationError } from "../helper/apiResponse";
import { validationResult } from "express-validator";
import { HttpStatusCode } from "../interfaces/httpstatus";
import { generateAccessToken } from "../helper/user";
import { userService } from "../services/UserService";

import bcrypt from "bcrypt";


class UserController {
  constructor() { }

  async create(req: Request, res: Response) {
    const errors = validationResult(req).formatWith(({ msg }) => msg);

    if (!errors.isEmpty()) {
      return validationError(res, errors.array().toString());
    }

    try {

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body?.password, saltRounds);

      const existUser: any = await userService.findRow({ email: req.body.email }, "email");

      if (existUser) {
        return errorRes(res, "User email already exist", HttpStatusCode.NOT_FOUND);
      }

      const saveData: any = {
        firstName: req.body?.firstName,
        lastName: req.body?.lastName,
        email: req?.body?.email,
        password: hashedPassword,
        mobile: req?.body?.mobile,
        address: req?.body?.address
      };

      const userSave: any = await userService.save(saveData);

      if (userSave) {
        return successRes(res, userSave, HttpStatusCode.OK);
      }

      return errorRes(res, "Something went wrong", HttpStatusCode.NOT_FOUND);

    }

    catch (err) {
      return errorRes(res, err.message, HttpStatusCode.BAD_REQUEST);
    }
  }

  async login(req: Request, res: Response) {
    try {
      let user = await userService.findRow({
        email: req.body.email
      });

      if (!user) {
        return errorRes(res, 'User not found', HttpStatusCode.NOT_FOUND);
      }

      const passwordMatch = await bcrypt.compare(req.body?.password, user.password);

      if (passwordMatch) {
        const data: any = {
          id: user._id,
          email: user.email
        };
        const accessToken = await generateAccessToken(data);
        let token: any = {
          access_token: accessToken,
          access_token_type: "Bearer",
          access_expires_in: process.env.JWT_TOKEN_EXPIRE,
        };
        return successRes(res, token);
      } else {
        return errorRes(res, 'Invalid username & password.', HttpStatusCode.UNAUTHORIZED);
      }
    } catch (err) {
      console.log(err)
    }
  }

  async list(req: Request, res: Response) {

    const errors = validationResult(req).formatWith(({ msg }) => msg);

    if (!errors.isEmpty()) {
      return validationError(res, errors.array().toString());
    }

    try {

      const result: any = await userService.findAll(req.query);

      if (!result) {
        return errorRes(res, "Record does not exists!", HttpStatusCode.NOT_FOUND);
      }

      return successRes(res, result, HttpStatusCode.OK);

    } catch (err) {

      return errorRes(res, err.message, HttpStatusCode.BAD_REQUEST);

    }
  }

  async update(req: Request, res: Response) {
    const errors = validationResult(req).formatWith(({ msg }) => msg);

    if (!errors.isEmpty()) {
      return validationError(res, errors.array().toString());
    }

    try {

      const existUser: any = await userService.findRow({ email: req.body.email });
      if (!existUser) {
        return errorRes(res, "No user found", HttpStatusCode.NOT_FOUND);
      }


      let updata: any = {
        firstName: req.body?.firstName,
        lastName: req.body?.lastName,
        mobile: req.body?.mobile,
        address: req.body?.address
      }
      let update: any = await userService.update(existUser._id, updata);
      if (update) {
        return successRes(res, update, HttpStatusCode.OK);
      }

      return errorRes(res, "Something went wrong", HttpStatusCode.NOT_FOUND);

    }

    catch (err) {
      console.log(err.message);
      return errorRes(res, err.message, HttpStatusCode.BAD_REQUEST);
    }
  }


  async search(req: Request, res: Response) {
    try {

      const records = await userService.find(req.query);

      if (records.count == 0)
        return errorRes(res, 'No record found', HttpStatusCode.NOT_FOUND);

      return successRes(res, records, HttpStatusCode.OK);

    } catch (err) {
      return errorRes(res, err.message, HttpStatusCode.BAD_REQUEST);
    }
  }



}
export const userController = new UserController();
