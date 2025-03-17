"use client";
import Image from "next/image";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { userSchema } from "../../validation";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { postMobileEmail } from "../../api/service";
import { useStepper } from "../../hooks/use-stepper";
import { toast } from "react-toastify";

type UserType = z.infer<typeof userSchema>;

const Step1Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserType>({
    resolver: zodResolver(userSchema),
  });
  const { nextStep, setIdenData } = useStepper();

  const mutation = useMutation({
    mutationFn: postMobileEmail,
    onSuccess: () => {
      nextStep();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: UserType) => {
    mutation.mutate(data);
    setIdenData(data);
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
        <p>برای شروع فعالیت خود در الو کمک حساب خود را بسازید.</p>
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
          <Label htmlFor="mobile" className="text-right">
            شماره موبایل
          </Label>
          <Input {...register("mobile")} type="tel" id="mobile" />
          {errors.mobile && (
            <p className="text-red-500 text-sm">{errors.mobile.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-right">
            ایمیل
          </Label>
          <Input {...register("email")} type="email" id="email" />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-right">
            رمز عبور
          </Label>
          <Input {...register("password")} type="password" id="password" />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-[#186ADE] cursor-pointer flex items-center justify-center text-white w-full py-2 rounded-full disabled:opacity-50"
        >
          {mutation.isPending ? <Loader className="animate-spin" /> : "ثبت‌نام"}
        </button>

        <p className="text-center">
          ‌ثبت‌نام شما به معنای پذیرش{" "}
          <span className="text-[#186ADE] cursor-pointer">قوانین</span> الوکمک
          است.
        </p>
      </form>
    </div>
  );
};

export default Step1Form;
