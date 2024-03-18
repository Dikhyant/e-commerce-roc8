import { ApiResponse, ICategorySelectionCheck, IPagination } from "~/types/api.interface";
import http from "../http";

const BASE_URL = "api/categories"

export const getCategoriesWithSelectionStatus = async (data: IPagination = {page: 1, limit: 10}) => 
http.get<ApiResponse<ICategorySelectionCheck>>(`${BASE_URL}/selected-unselected?page=${data.page}&limit=${data.limit}`);