import express from "express";
import {validateBody} from "../../middlewares";
import {schemas} from "@models/user";
import {ctrlWrapper} from "../../helpers";
import {signup} from "@controllers/auth";

const router = express.Router()

router.post(
    '/users/signup',
    validateBody(schemas.registerSchema),
    ctrlWrapper(signup)
)


export default router;