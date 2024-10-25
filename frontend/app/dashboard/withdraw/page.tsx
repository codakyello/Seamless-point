import React from "react";
import BalanceDisplay from "../components/BalanceDisplay";
import { Input } from "@/components/ui/input";
import SelectDebitCard from "../components/SelectDebitCard";
import PrivacyPolicyBlock from "../components/PrivacyPolicyBlock";
import Button, { ButtonVariant } from "@/components/Button";
import ButtonFormSubmit from "@/components/ButtonFormSubmit";

export default function page() {
  return (
    <div className="max-w-3xl">
      <div className="flex flex-col gap-10">
        <h1 className="headline text-center">Withdrawal of Funds</h1>
        <BalanceDisplay />
        <div className="flex flex-col gap-3">
          <label htmlFor="withdrawAmount">
            Enter the amount that you wish to withdraw
          </label>
          <Input id="withdrawAmount" type="text" placeholder="20, 000" />
          <p className="text-sm text-muted">
            The amount will be withdrawn to the bank {"that's"} registered with
            this account
          </p>
        </div>
        <SelectDebitCard />
        <PrivacyPolicyBlock />
        <ButtonFormSubmit text="I UNDERSTAND" />
      </div>
    </div>
  );
}
