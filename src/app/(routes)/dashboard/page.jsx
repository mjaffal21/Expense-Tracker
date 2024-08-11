"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CardInfo from "./_components/CardInfo";
import { db } from "../../../../utils/dbConfig";
import { Budgets, Expenses } from "../../../../utils/schema";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./_components/ExpenseListTable";

const page = () => {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
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
    getExpenses();
  };

  const getExpenses = async () => {
    const result = await db
      .select({
        Id: Expenses.Id,
        Name: Expenses.Name,
        Amount: Expenses.Amount,
        CreatedAt: Expenses.CreatedAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.Id, Expenses.BudgetId))
      .where(eq(Budgets.CreatedBy, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(Expenses.CreatedAt));
    setExpensesList(result);
  };

  useEffect(() => {
    user && getBudgets();
  }, [user]);
  return (
    <div className="p-5">
      <h2 className="font-bold text-3xl">Hi, {user?.fullName}! ❤️</h2>
      <p className="text-gray-500">
        Here's what happening with your money, let's manage your expenses
      </p>
      <CardInfo budgetList={budgetList} />
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5">
        <div className="md:col-span-2">
          <BarChartDashboard budgetList={budgetList} />
          <ExpenseListTable
            expenses={expensesList}
            refreshExpenses={() => getBudgets()}
          />
        </div>
        <div className="grid gap-5 md:block">
          <h2 className="font-bold text-lg">Latest Budgets</h2>
          {budgetList.map((budget, index) => (
            <div className="my-5">
              <BudgetItem key={index} budget={budget} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
