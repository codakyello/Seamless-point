"use client";

import Badge, { BadgeVariant } from "@/components/Badge";
import Button, { ButtonVariant } from "@/components/Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";

import { deliverySourceSchema, signUpSchema } from "@/lib/validation";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import React from "react";

export default function Settings() {
  const form = useForm<z.infer<typeof deliverySourceSchema>>({
    resolver: zodResolver(deliverySourceSchema),
    // defaultValues: {
    //   firstName: "",
    //   lastName: "",
    //   email: "",
    //   phone: "",
    //   password: "",
    //   confirmPassword: "",
    // },
  });

  async function onSubmit(data: z.infer<typeof deliverySourceSchema>) {
    // console.log(data);
    try {
      //   createUser(data);
    } catch (error) {}
  }

  return (
    <>
      <div className="flex justify-between items-center py-3 border-b border-neutral-300">
        <h1 className="headline">Settings</h1>
        <button>
          <Badge variant={BadgeVariant.red}>Delete account</Badge>
        </button>
      </div>
      <Image
        src="/assets/images/profile-image.png"
        alt="profile image"
        width={200}
        height={200}
        className="w-36 aspect-square rounded-full"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="lg:grid space-y-5 lg:grid-cols-2 gap-5 lg:space-y-0">
            <CustomFormField
              label="First name"
              name="firstName"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="John"
            />
            <CustomFormField
              label="Last name"
              name="lastName"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="Deo"
            />
            <CustomFormField
              label="Date of birth"
              name="dateOfBirth"
              control={form.control}
              fieldType={FormFieldType.DATE_PICKER}
              placeholder="Lagos"
            />
            <CustomFormField
              label="Gender"
              name="gender"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="Male, Female"
            />
            <CustomFormField
              className="col-span-2"
              label="Email"
              name="email"
              control={form.control}
              fieldType={FormFieldType.INPUT}
              placeholder="you@company.com]"
            />
          </div>
          <Button
            variant={ButtonVariant.fill}
            text="Save"
            className="bg-customGreen text-white"
            isRoundedLarge
          />
        </form>
      </Form>
      <h2 className="border-b border-neutral-300 py-3 text-2xl font-bold">
        Change password
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="lg:grid space-y-5 lg:grid-cols-2 gap-5 lg:space-y-0">
            <CustomFormField
              className="col-span-2"
              label="Current password"
              name="currentPassword"
              control={form.control}
              fieldType={FormFieldType.PASSWORD}
            />
            <CustomFormField
              label="New password"
              name="newPassword"
              control={form.control}
              fieldType={FormFieldType.PASSWORD}
            />
            <CustomFormField
              label="Confirm new password"
              name="confirmNewPassword"
              control={form.control}
              fieldType={FormFieldType.PASSWORD}
            />
          </div>
          <Button
            variant={ButtonVariant.fill}
            text="Save"
            className="bg-customGreen text-white"
            isRoundedLarge
          />
        </form>
      </Form>
    </>
  );
}
