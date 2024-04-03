export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  verificationOtp?: string;
  verificationOtpExpiry?: string;
}

export interface IUserCategory_Selection_Status {
  category_id: string;
  category_name: string;
  selection_status: string;
}
