import { Schema, model } from 'mongoose';
import  Joi from "joi";
import {handleMongooseSchemaError} from "../helpers";

interface UserSchema {
    password: string,
    email: string,
    token?: string
}

interface UserDocument extends UserSchema {
    _id: string
}

// Схема користувача
const userSchema = new Schema<UserDocument>(
    {
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        token: {
            type: String,
            default: null,
        },
    },
    { versionKey: false }
)

userSchema.post('save',handleMongooseSchemaError as any)
// handleMongooseSchemaError

// Схеми для валідації
const registerSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
});

const emailSchema = Joi.object({
    email: Joi.string().required(),
});

const schemas = {
    registerSchema,
    loginSchema,
    emailSchema
};

// Модель користувача
const User = model<UserDocument>('user', userSchema);

export { schemas, User };