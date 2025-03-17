import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Image from "next/image";
import { ErrorResponse, SuccessResponse, VerificationType } from "../../types";
import { postOtp } from "../../api/service";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verificationSchema } from "../../validation";
import { useStepper } from "../../hooks/use-stepper";
import { toast } from "react-toastify";
const Step2Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerificationType>({
    resolver: zodResolver(verificationSchema),
  });
  const { idenData, setDataToken, nextStep } = useStepper();

  // TanStack Query Mutation
  const mutation = useMutation({
    mutationFn: postOtp,
    onSuccess: (data: SuccessResponse) => {
      setDataToken(data.data_token);
      nextStep();
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: VerificationType) => {
    mutation.mutate({
      email: idenData.email,
      mobile: idenData.mobile,
      password: idenData.password,
      email_otp: data.emailOtp,
      mobile_otp: data.mobileOtp,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex flex-col items-start justify-start gap-5">
        <Image
          src={"/assets/Group.svg"}
          alt="alo komak"
          width={130}
          height={33}
        />
        <h2>ثبت‌نام مشاور</h2>
        <p>برای شروع فعالیت خود در الو کمک حساب خود را بسازید. </p>
        <p>
          حساب کاربری دارید؟{" "}
          <span className="text-[#186ADE] cursor-pointer">
            ورود به حساب کاربری
          </span>
        </p>
        <p className="mt-auto text-[#186ADE] cursor-pointer">
          ثبت‌نام به عنوان کاربر عادی
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div className="space-y-2">
          <Label htmlFor="mobileOtp" className="text-right">
            کد تایید موبایل
          </Label>
          <Input
            {...register("mobileOtp")}
            type="number"
            id="mobileOtp"
            placeholder="کد تایید موبایل"
          />
          {errors.mobileOtp && (
            <p className="text-red-500 text-sm">{errors.mobileOtp.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="emailOtp" className="text-right">
            کد تایید ایمیل
          </Label>
          <Input
            {...register("emailOtp")}
            type="number"
            id="emailOtp"
            placeholder="کد تایید ایمیل"
          />
          {errors.emailOtp && (
            <p className="text-red-500 text-sm">{errors.emailOtp.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-[#186ADE] text-white w-full py-2 rounded-full disabled:opacity-50"
        >
          {mutation.isPending ? "در حال تایید..." : "تایید و ادامه"}
        </button>

        {mutation.error && (
          <p className="text-red-500 text-center mt-2">
            خطایی رخ داده است. لطفاً دوباره تلاش کنید.
          </p>
        )}
      </form>
    </div>
  );
};

export default Step2Form;
