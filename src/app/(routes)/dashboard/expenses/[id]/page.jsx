"use client";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { Budgets, Expenses } from "../../../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import { db } from "../../../../../../utils/dbConfig";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpenses from "../_components/AddExpenses";
import ExpensesList from "../_components/ExpensesList";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import EditBudget from "../_components/EditBudget";

const ExpensesComponent = ({ params }) => {
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState({});
  const [expenses, setExpenses] = useState([]);
  const router = useRouter();
  useEffect(() => {
    user && getBudgets();
    getExpenses();
  }, [user]);

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
      .where(eq(Budgets.Id, params.id))
      .groupBy(Budgets.Id);
    setBudgetInfo(result[0]);
  };

  const getExpenses = async () => {
    const result = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.BudgetId, params.id))
      .orderBy(desc(Expenses.CreatedAt));
    setExpenses(result);
  };

  const deleteBudget = async (budget) => {
    const deleteExpense = await db
      .delete(Expenses)
      .where(eq(Expenses.BudgetId, params.id))
      .returning();

    if (deleteExpense) {
      const result = await db
        .delete(Budgets)
        .where(eq(Budgets.Id, budget.Id))
        .returning();

      if (result) {
        toast("Budget deleted successfully!");
        router.push("/dashboard/budgets");
      }
    }
  };

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl flex justify-between items-center">
        My Expenses
        <span>
          <div className="flex gap-2 items-center">
            <EditBudget budgetInfo={budgetInfo} refreshBudgets={getBudgets} />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-red-700 hover:bg-red-800">
                  Delete Budget
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permenantly delete
                    you current budget along with expenses.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteBudget(budgetInfo)}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        <BudgetItem budget={budgetInfo} />
        <AddExpenses
          params={params}
          refreshBudgets={getBudgets}
          refreshExpenses={getExpenses}
        />
      </div>
      <div className="mt-4">
        <h2 className="font-bold text-lg">Latest Expenses</h2>
        <ExpensesList expenses={expenses} refreshExpenses={getExpenses} />
      </div>
    </div>
  );
};

export default ExpensesComponent;
