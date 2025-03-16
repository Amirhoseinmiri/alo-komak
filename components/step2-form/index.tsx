import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Image from "next/image";

const Step2Form = () => {
  return (
    <div className="grid grid-cols-1 my-16 md:grid-cols-2 gap-5">
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
            کد تایید موبایل
          </Label>
          <Input type="number" id="phone" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-right">
            کد تایید ایمیل
          </Label>
          <Input type="number" id="email" />
        </div>

        <button
          type="submit"
          className="bg-[#186ADE] text-white w-full py-2 rounded-full"
        >
          تایید و ادامه
        </button>
      </form>
    </div>
  );
};

export default Step2Form;
