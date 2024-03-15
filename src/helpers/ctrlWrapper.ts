import {NextFunction} from "express";

type AsyncController = (req: Request, res: Response, next: NextFunction) => Promise<void>

const ctrlWrapper = (ctrl: AsyncController) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await ctrl(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}

export default ctrlWrapper