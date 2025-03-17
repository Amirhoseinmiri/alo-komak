import { FinalType, GetConfigResponse, OtpUser, UserType } from "../types";
import { axiosInstans } from "./settings";

export const postMobileEmail = async (data: UserType) => {
  try {
    const response = await axiosInstans.post(
      "api/experts/auth/register/give-mobile-email-password",
      data
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const postOtp = async (data: OtpUser) => {
  try {
    const response = await axiosInstans.post(
      "api/experts/auth/register/verify-mobile-email",
      data
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const getConfig = async () => {
  try {
    const response = await axiosInstans.get<GetConfigResponse>(
      "api/experts/auth/register/get-config"
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const postFinal = async (data: FinalType) => {
  try {
    const response = await axiosInstans.post(
      "api/experts/auth/register/complete-identity-information",
      data
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};
