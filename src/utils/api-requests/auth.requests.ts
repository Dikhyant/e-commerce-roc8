import { ApiResponse, IUserSignUpViaEmail, IUserVerifyViaEmail } from "~/types/api.interface";
import http from "~/utils/http";

const BASE_URL = "api/auth/user"

export const verifyEmail = async (data: IUserVerifyViaEmail) =>
http.post<ApiResponse<{}>>(`${BASE_URL}/verify-email`,data);

export const signupViaEmail = async (data: IUserSignUpViaEmail) =>
http.post<ApiResponse<{}>>(`${BASE_URL}/signup-email`, data);