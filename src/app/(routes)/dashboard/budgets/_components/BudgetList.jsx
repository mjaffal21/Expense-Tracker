"use client";
import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "../../../../../../utils/schema";
import { db } from "../../../../../../utils/dbConfig";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "./BudgetItem";
import { Skeleton } from "@/components/ui/skeleton";

const BudgetList = () => {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const getBudgets = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpent: sql`sum(${Expenses.Amount})`.mapWith(Number),
        totalItems: sql`count(${Expenses.Id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.Id, Expenses.BudgetId))
      .where(eq(Budgets.CreatedBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.Id)
      .orderBy(desc(Budgets.Id));

    setBudgetList(result);
  };

  useEffect(() => {
    user && getBudgets();
  }, [user]);
  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateBudget refreshData={() => getBudgets()} />
        {budgetList?.length > 0
          ? budgetList.map((item, index) => (
              <BudgetItem budget={item} key={index} />
            ))
          : [1, 2, 3, 4].map((item, index) => (
              <div className="flex flex-col space-y-3" key={index}>
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default BudgetList;
