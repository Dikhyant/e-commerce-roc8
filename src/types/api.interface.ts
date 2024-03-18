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

export interface ICategory {
    id: string;
    name: string;
}

export interface ICategorySelectionCheck extends ICategory {
    selected: boolean;
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
}

export interface IPagination {
    page: number;
    limit: number;
}