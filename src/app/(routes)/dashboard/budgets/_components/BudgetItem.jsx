import Link from "next/link";
import React from "react";

const BudgetItem = ({ budget }) => {
  const calcProgressBar = () => {
    const percentage = (budget?.totalSpent / budget?.Amount) * 100;
    return percentage.toFixed(2);
  };
  return (
    <Link href={`/dashboard/expenses/${budget?.Id}`}>
      <div className="p-5 border rounded-lg hover:shadow-md cursor-pointer h-[145px]">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <h2 className="text-2xl py-3 px-4 bg-slate-100 rounded-full">
              {budget?.Icon}
            </h2>
            <div className="font-bold">
              <h2>{budget?.Name}</h2>
              <h2 className="text-sm text-gray-500">
                {budget?.totalItems} Items
              </h2>
            </div>
          </div>
          <h2 className="font-bold text-lg text-blue-800">${budget?.Amount}</h2>
        </div>
        <div className="mt-5">
          <div className="flex justify-between">
            <h2 className="text-xs text-slate-400">
              ${budget?.totalSpent ? budget?.totalSpent : 0} Spent
            </h2>
            <h2 className="text-xs text-slate-400">
              ${budget?.Amount - budget?.totalSpent} Remaining
            </h2>
          </div>
          <div className="w-full bg-slate-300 h-2 rounded-full">
            <div
              style={{ width: `${calcProgressBar()}%` }}
              className="bg-blue-700 h-2 rounded-full"
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BudgetItem;
