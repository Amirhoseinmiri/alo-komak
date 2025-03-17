import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email({ message: "ایمیل نامعتبر است" }),
  mobile: z.string().regex(/^09\d{9}$/, {
    message: "شماره موبایل باید با 09 شروع شود و 11 رقم باشد",
  }),
  password: z
    .string()
    .min(6, { message: "رمز عبور باید حداقل 6 کاراکتر باشد" })
    .max(20, { message: "رمز عبور نباید بیشتر از 20 کاراکتر باشد" }),
});
export const verificationSchema = z.object({
  mobileOtp: z
    .string()
    .regex(/^\d{6}$/, { message: "کد تایید موبایل باید 6 رقم باشد" }),
  emailOtp: z
    .string()
    .regex(/^\d{6}$/, { message: "کد تایید ایمیل باید 6 رقم باشد" }),
});
export const finalSchema = z.object({
  name: z.string().min(1, "نام و نام خانوادگی الزامی است"),
  national_code: z.string().min(1, "کد ملی الزامی است"),
  field_of_study: z.string().min(1, "رشته تحصیلی الزامی است"),
  education_level: z.string().min(1, "مقطع تحصیلی الزامی است"),
  birth_date: z.string().min(1, "تاریخ تولد الزامی است"),
  expert_sub_categories: z
    .array(z.string())
    .min(1, "تخصص دسته مشاوره الزامی است"),
  expert_category: z.string().min(1, "حوزه مشاوره الزامی است"),
  expert_type: z.string().min(1, "نوع مشاوره الزامی است"),
  languages: z.array(z.string()).min(1, "زبان مورد نظر الزامی است"),
  description: z
    .string()
    .min(1, "توضیحات الزامی است")
    .max(1700, "توضیحات نباید بیشتر از 1700  کاراکتر باشد")
    .optional(),
});
