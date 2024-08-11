"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { PiggyBank, ReceiptText, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";

const CardInfo = ({ budgetList }) => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  useEffect(() => {
    budgetList && calCardInfo();
  }, [budgetList]);

  const calCardInfo = () => {
    let totalBudget_ = 0;
    let totalSpend_ = 0;
    budgetList.forEach((element) => {
      totalBudget_ = totalBudget_ + Number(element.Amount);
      totalSpend_ = totalSpend_ + element.totalSpent;
    });

    setTotalBudget(totalBudget_);
    setTotalSpent(totalSpend_);
  };
  return (
    <div className="mt-7">
      {budgetList?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-7 border rounded-lg flex justify-between items-center">
            <div className="">
              <h2 className="text-sm">Total Budget</h2>
              <h2 className="font-bold text-2xl">${totalBudget}</h2>
            </div>
            <PiggyBank className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-lg flex justify-between items-center">
            <div className="">
              <h2 className="text-sm">Total Expenses</h2>
              <h2 className="font-bold text-2xl">${totalSpent}</h2>
            </div>
            <ReceiptText className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-lg flex justify-between items-center">
            <div className="">
              <h2 className="text-sm">No. of Budgets</h2>
              <h2 className="font-bold text-2xl">{budgetList?.length}</h2>
            </div>
            <Wallet className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((item, index) => (
            <div className="flex flex-col space-y-3" key={index}>
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardInfo;
