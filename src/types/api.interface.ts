export interface IUserSignUpViaEmail {
    name: string;
    email: string;
    password: string;
}

export interface IUserLoginViaEmail {
    email: string;
    password: string;
}

export interface IUserVerifyViaEmail {
    email: string;
    otp: string;
}