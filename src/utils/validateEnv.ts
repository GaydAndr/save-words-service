import {cleanEnv, str, port, url} from "envalid";

const validateEnv = () =>{
    cleanEnv(process.env, {
        PORT: port(),
        DB_HOST: url(),
        SECRET_KEY: str()
    })
}

export default validateEnv;