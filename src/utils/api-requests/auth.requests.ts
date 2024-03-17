import { ApiResponse, IUserVerifyViaEmail } from "~/types/api.interface";
import http from "~/utils/http";

const BASE_URL = "api/auth/user"

export const verifyEmail = (data: IUserVerifyViaEmail) =>
http.post<ApiResponse<{}>>(`${BASE_URL}/verify-email`,data);