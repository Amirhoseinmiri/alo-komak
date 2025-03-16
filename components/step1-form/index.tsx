import Image from "next/image";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const Step1Form = () => {
  return (
    <div className="grid grid-cols-1 my-4 md:grid-cols-2 gap-5">
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
          <span className="text-[#186ADE]">ورود به حساب کاربری</span>
        </p>
        <p className="mt-auto text-[#186ADE]">ثبت‌نام به عنوان کاربر عادی</p>
      </div>
      <form action="" className="flex flex-col gap-8">
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-right">
            شماره موبایل
          </Label>
          <Input type="tel" id="phone" placeholder="مثال: 09123456789" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-right">
            ایمیل
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="مثال: admin@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-right">
            رمز عبور
          </Label>
          <Input type="password" id="password" placeholder="رمز عبور" />
        </div>
        <button
          type="submit"
          className="bg-[#186ADE] text-white w-full py-2 rounded-full"
        >
          ثبت‌نام
        </button>
        <p className="text-center">
          ‌ثبت‌نام شما به معنای پذیرش{" "}
          <span className="text-[#186ADE]">قوانین</span> الوکمک است.
        </p>
      </form>
    </div>
  );
};

export default Step1Form;
