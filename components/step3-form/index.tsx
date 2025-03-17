import Image from "next/image";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import { default as CustomSelect } from "react-select"; // Importing Select with a new name
import persian_fa from "react-date-object/locales/persian_fa";
import moment from "moment-jalaali";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Camera, Loader } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getConfig, postFinal } from "../../api/service";
import { FinalType } from "../../types";
import { useStepper } from "../../hooks/use-stepper";
const mokExpertType = [
  { value: 1, label: "حقوق مدنی" },
  { value: 2, label: "حقوق قضایی" },
  { value: 3, label: "حقوق خانواده" },
];
const Step3Form = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["config"],
    queryFn: getConfig,
  });
  const { dataToken } = useStepper();
  const [birthDate, setBirthDate] = useState<Date | string>(new Date());
  const [parentId, setParentId] = useState<number | string | undefined>(0);
  const [accept, setAccept] = useState(false);
  const [formDate, setFormData] = useState<Partial<FinalType>>({
    name: "",
    national_code: "",
    education_level: "",
    field_of_study: "",
    expert_category: "",
    expert_sub_categories: [],
    expert_type: "",
    languages: [],
    description: "",
  });
  const handleChange = (
    name: string,
    e: React.ChangeEvent<HTMLInputElement> | string | boolean
  ) => {
    if (typeof e === "string") {
      setFormData({ ...formDate, [name]: e });
    } else if (typeof e === "boolean") {
      setFormData({ ...formDate, [name]: e });
    } else {
      setFormData({ ...formDate, name: e.target.value });
    }
  };
  const mutation = useMutation({
    mutationFn: postFinal,
    onSuccess: () => {
      console.log("success");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate({
      description: formDate.description || "",
      education_level: formDate.education_level || "",
      expert_category: formDate.expert_category || "",
      expert_sub_categories: formDate.expert_sub_categories || [],
      expert_type: formDate.expert_type || "",
      field_of_study: formDate.field_of_study || "",
      languages: formDate.languages || [],
      name: formDate.name || "",
      national_code: formDate.national_code || "",
      birth_date: moment(birthDate).format("jYYYY/jMM/jDD"),
      data_token: dataToken,
    });
  };
  if (isPending) return <Loader className="animate-spin" />;
  if (isError) return <p>خطا در بارگذاری اطلاعات</p>;

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
          <span className="text-[#186ADE]">ورود به حساب کاربری</span>
        </p>
        <p className="mt-auto text-[#186ADE]">ثبت‌نام به عنوان کاربر عادی</p>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <div className="flex items-center flex-col gap-2 justify-center">
          <Avatar className="w-20 h-20">
            <AvatarImage src={""} />
            <AvatarFallback>
              <Camera size={30} />
            </AvatarFallback>
          </Avatar>
          <p>تصویر پروفایل</p>
          <p className="text-sm text-[#757575]">
            (در پروفایل شما استفاده خواهد شد)
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">نام و نام خانوادگی</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="نام و نام خانوادگی"
            onChange={(e) => handleChange("name", e)}
            value={formDate.name}
          />
        </div>
        <div className="flex justify-center items-center gap-6">
          <div className="flex flex-col mt-1 gap-2">
            <Label htmlFor="nationalCode">کد ملی</Label>
            <Input
              id="nationalCode"
              type="number"
              onChange={(e) => handleChange("national_code", e.target.value)}
              value={formDate.national_code}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>تاریخ تولد</label>
            <DatePicker
              calendar={persian}
              value={birthDate}
              onChange={(value) => setBirthDate(value?.toDate() || "")}
              inputClass="!h-9 border border-gray-300 rounded-md w-48 text-sm text-gray-600"
              locale={persian_fa}
              format="YYYY/MM/DD"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label>مدرک تحصیلی</Label>
          <Select
            dir="rtl"
            onValueChange={(value) => handleChange("education_level", value)}
          >
            {" "}
            <SelectTrigger className="w-full">
              <SelectValue placeholder="مدرک تحصیلی" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>مدرک تحصیلی</SelectLabel>

                {data?.data.educations_levels.map((item) => (
                  <SelectItem key={item.id} value={String(item.id)}>
                    {item.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="educationField">رشته تحصیلی</Label>
          <Input
            id="educationField"
            type="text"
            value={formDate.field_of_study}
            placeholder="رشته تحصیلی"
            onChange={(e) => handleChange("field_of_study", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="experience">حوزه مشاوره‌ای</Label>
          <Select
            dir="rtl"
            onValueChange={(value) => handleChange("expert_category", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="میزان سابقه" />
            </SelectTrigger>
            <SelectContent>
              {data?.data.expert_categories.map((item) => (
                <SelectGroup key={item.id}>
                  <SelectItem value={String(item.id)}>{item.title}</SelectItem>
                  {item.children?.map((child) => (
                    <SelectItem key={child.id} value={String(child.id)}>
                      {child.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="experience">سابقه کار</Label>
          <Select
            dir="rtl"
            onValueChange={(value) => handleChange("experience", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="میزان سابقه" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>سابقه کار</SelectLabel>

                <SelectItem value="1">1-3 سال</SelectItem>
                <SelectItem value="2">3-5 سال</SelectItem>
                <SelectItem value="3">5-10 سال</SelectItem>
                <SelectItem value="4">بیشتر از 10 سال</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="skills">تخصص مشاوره</Label>
          <CustomSelect
            isMulti
            options={mokExpertType}
            placeholder="تخصص مشاوره"
            onChange={(value) =>
              setFormData({
                ...formDate,
                expert_sub_categories: value.map((item) => item.value),
              })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="type">نوع مشاوره</Label>
          <Select
            dir="rtl"
            onValueChange={(value) => handleChange("expert_type", value)}
          >
            <SelectTrigger id="type" className="w-full">
              <SelectValue placeholder="نوع مشاوره" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>نوع مشاوره</SelectLabel>
                <SelectItem value="1">حضوری</SelectItem>
                <SelectItem value="2">آنلاین</SelectItem>
                <SelectItem value="3">تلفنی</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="lang">زبان مشاوره</Label>
          {/* <Select
            dir="rtl"
            onValueChange={(value) => handleChange("lang", value)}
          >
            <SelectTrigger id="lang" className="w-full">
              <SelectValue placeholder="زبان مشاوره" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>نوع مشاوره</SelectLabel>
                {data?.data.languages.map((item) => (
                  <SelectItem key={item.id} value={String(item.id)}>
                    {item.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select> */}
          <CustomSelect
            isMulti
            options={data?.data.languages.map((item) => ({
              value: item.id,
              label: item.title,
            }))}
            placeholder="زبان مشاوره"
            onChange={(value) =>
              setFormData({
                ...formDate,
                languages: value.map((item) => item.value),
              })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="province">استان‌ مشاوره حضوری</Label>
          <CustomSelect
            placeholder="استان"
            onChange={(value) => {
              setParentId(value?.value);
            }}
            options={data.data.provinces.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="city">شهر مشاوره حضوری</Label>
          <CustomSelect
            placeholder="شهر"
            options={
              data.data.provinces.find((item) => item.id === parentId)?.cities
            }
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={accept}
            onCheckedChange={(e) => setAccept(e as boolean)}
          />
          <Label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            امکان مشاوره حضوری و در محل را دارم.
          </Label>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="description">
            توضیح و معرفی درباره خود (در پروفایل نمایش داده خواهد شد)
          </Label>
          <Textarea
            id="description"
            value={formDate.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>
        <button
          className="bg-[#186ADE] text-white py-2 rounded-full w-full disabled:bg-gray-300 transition-all duration-300"
          type="submit"
          disabled={!accept}
        >
          ثبت‌ نام
        </button>
      </form>
    </div>
  );
};

export default Step3Form;
