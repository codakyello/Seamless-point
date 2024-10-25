import React from "react";
import Button, { ButtonVariant } from "./Button";
import clsx from "clsx";

export default function ButtonFormSubmit({ text, className }) {
  return (
    <Button
      text={text}
      className={clsx("py-10 h-12 font-normal w-full", className)}
      isRoundedLarge
      variant={ButtonVariant.fill}
    />
  );
}
