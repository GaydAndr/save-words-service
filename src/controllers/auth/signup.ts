import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import {User} from "@models/user";
import {RequestError} from "../../helpers";

interface IRequest {
    body: {
        email: string;
        password: string;
    };
}

interface IResponse {
    status: (status: number) => IResponse;
    json: (json: Object) => void;
}

const signup = async (req: IRequest, res: IResponse) => {
    const {email, password} = req.body
    const existingUser = await User.findOne({email})

    if (existingUser) {
        throw new RequestError(409, 'Email in use')
    }
    if (!email || !password) {
        throw new RequestError(400, 'Missing required fields');
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const verificationToken = uuidv4()

    const user = await User.create({
        email,
        password: hashPassword,
        verificationToken
    })

    res.status(201).json({
        email: user.email,
    });
}

export default signup