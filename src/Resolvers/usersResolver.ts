import usersModel, { UserInstance } from "../models/UsersSchema";
import bcrypt, { genSalt } from 'bcrypt';
import { SignupUser } from "./typings";

const UserResolver = {
    signupReturn: {
        __resolveType: (obj:any) => {
            if(obj.user){
                return "signupSuccess"
            }
            if(obj.Error){
                return "signupFailure"
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

        // Login: async( _:unknown, args:{email:string, password:string} )=>{
        //     try {
        //         const {email, password} = args
                

        //         const user = await usersModel.findOne({email});
        //         if(!user){
        //         return {statusCode:401, Error:"Invalid credentials."};
        //         }
        //         else{
        //             const isCorrectPass = await bcrypt.compare(password, user.password);
        //             if (isCorrectPass){
        //                 return {statusCode:200, message:"Login successful", user};
        //             }
        //         }
        //     } 
        //     catch (err) {
        //         return {statusCode:500, Error:"Something went wrong."}
        //     }
        // },

    }
}

export default UserResolver;