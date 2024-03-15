import jwt from 'jsonwebtoken'
import {User} from "../models/user";
import {RequestError} from '../helpers'

const {SECRET_KEY} = process.env

type CustomHeaders  = {
    authorization?: string
} & Headers
interface CustomRequest  extends Request{
    headers:CustomHeaders
    user?:{_id: string} | null
}

const authenticate = async (req: CustomRequest, next: NewableFunction) => {
    try {
        // Отримання заголовка авторизації та розбиття на тип та токен
        const {authorization = ''} = req.headers
        const [bearer, token] = authorization.split(' ')

        // Перевірка дійсного типу авторизації (Bearer)
        if(bearer !== 'Bearer'){
             new RequestError(401,'Не авторизовано')
        }

        try {
            // Перевірка JWT-токена за допомогою SECRET_KEY
            const {id} = jwt.verify(token,SECRET_KEY!) as jwt.JwtPayload

            // Пошук користувача в базі даних за ID
            const user = await User.findById(id)

            // Перевірка, чи існує користувач і чи має він дійсний токен
            if(!user || !user.token){
                 new RequestError(401, "Не авторизовано")
            }

            // Додавання аутентифікованого користувача до об'єкта запиту
            req.user = user
            next()
        }catch (error){
            // Обробка помилок перевірки JWT або пошуку користувача
             new RequestError(401, 'Не авторизовано');
        }
    }catch (error){
        // Обробка інших помилок під час аутентифікації
        next(error);
    }
}

export default authenticate