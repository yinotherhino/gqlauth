export interface UserCreate {
    email: string;
    username: string;
    password: string;
}

export interface SignupUser{
    input:UserCreate
}
export interface LoginUser{
    input:{
        email: string;
        password: string;
    }
}