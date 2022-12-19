import usersModel, { UserInstance } from "../models/UsersSchema";
import bcrypt, { genSalt } from 'bcrypt';
import { SignupUser, LoginUser } from "./typings";
import { generateSignature } from "../utils";

const UserResolver = {
    userReturn: {
        __resolveType: (obj:any) => {
            if(obj.user){
                return "userSuccess"
            }
            if(obj.Error){
                return "failure"
            }
            return null
        }
    },
    Query:{

    },
    Mutation:{

        Signup: async( _:unknown, args:SignupUser )=>{
            try {
                const salt = await genSalt();
                const {password, email, username} = args.input
                const hashedPassword = await bcrypt.hash( password, salt)
                const user = await usersModel.findOne({$or:[{email},{username}]});
                if(user){
                    return {statusCode:400, Error:"Username or email already exists."}
                }
                const newData = {
                    username:args.input.username,
                    password:hashedPassword,
                    email:args.input.email,
                    role:"user",
                    salt,
                }
                
                const newUser = await usersModel.create(newData);
                if(newUser){
                    return {user:newUser, statusCode:201, message:"User Created Successfully"};
                }
            }
            catch (err) {
                console.log(err)
                return {statusCode:500, Error:"Something went wrong."}
            }
        },

        Login: async( _:unknown, args:LoginUser )=>{
            try {
                const {email, password} = args.input;
                

                const user = await usersModel.findOne({email});
                if(user){
                    const isCorrectPass = await bcrypt.compare(password, user.password);
                    if (isCorrectPass){
                        const token = await generateSignature({username:user.username, role:user.role, email:user.email, id:user._id})
                        return {statusCode:200, message:"Login successful", user, token};
                    }
                }
                return {statusCode:401, Error:"Invalid credentials."};
            } 
            catch (err) {
                return {statusCode:500, Error:"Something went wrong."}
            }
        },

    }
}

export default UserResolver;