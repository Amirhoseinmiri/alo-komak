import { z } from "zod";
import { userSchema, verificationSchema } from "../validation";

export type UserType = z.infer<typeof userSchema>;
export type OtpUser = UserType & {
  mobile_otp: number | string;
  email_otp: number | string;
};
export interface ErrorResponse {
  message: string;
  errors: {
    mobile?: string[];
    email?: string[];
    password?: string[];
  };
}
export type VerificationType = z.infer<typeof verificationSchema>;
export interface SuccessResponse {
  success: boolean;

  data_token: string;
}

interface ExpertCategory {
  id: number;
  title: string;
  children: ExpertCategory[]; // Recursive structure for child categories
}

interface EducationLevel {
  id: number;
  title: string;
}

interface Language {
  id: number;
  title: string;
}

interface ExpertType {
  id: number;
  title: string;
}
interface Province {
  id: number;
  name: string;
  cities: City[];
}
interface City {
  id?: number;
  name?: string;
}

export interface GetConfigResponse {
  success: boolean;
  data: {
    expert_categories: ExpertCategory[];
    educations_levels: EducationLevel[];
    languages: Language[];
    expert_types: ExpertType[];
    provinces: Province[];
  };
}
export type FinalType = {
  data_token: string;
  name: string;
  national_code: string;
  birth_date: string;
  education_level: string;
  field_of_study: string;
  expert_category: string;
  expert_sub_categories: string[] | number[];
  expert_type: string;
  languages: string[] | number[];
  description: string;
};
