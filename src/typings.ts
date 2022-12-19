export interface UserObj {
    fullname?:string;
    email:string;
    username:string;
    password:string;
    id:number;
    role?: string;
};

export interface LoginObj {
    email:string;
    password:string;
};