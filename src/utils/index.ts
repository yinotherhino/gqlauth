import jwt,{JwtPayload} from 'jsonwebtoken'
import {accessSecret} from "../config"


export const generateSignature = async(payload:JwtPayload)=>{return jwt.sign(payload, accessSecret,{expiresIn:"5d"})}