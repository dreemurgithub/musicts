import dotenv from 'dotenv'
dotenv.config()
import { createHmac} from 'crypto';
const key = `${process.env.PASSWORD_KEY}`
const hashPassword = (input : string)=>{
    return createHmac('sha256',key).update(input).digest('hex')
}

export {hashPassword}