export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    isVerified: boolean;
    verificationOtp?: string;
    verificationOtpExpiry?: string;
}