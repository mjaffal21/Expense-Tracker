import { Trash2 } from "lucide-react";
import React from "react";
import { db } from "../../../../../../utils/dbConfig";
import { Expenses } from "../../../../../../utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

const ExpensesList = ({ expenses, refreshExpenses }) => {
  const deleteExpense = async (expense) => {
    const result = await db
      .delete(Expenses)
      .where(eq(Expenses.Id, expense.Id))
      .returning();
    if (result) {
      refreshExpenses();
      toast("Expense deleted successfully!");
    }
  };
  return (
    <div className="mt-3">
      <div className="grid grid-cols-4 bg-blue-700 text-white p-2 border text-center">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Actions</h2>
      </div>
      {expenses?.map((expense, index) => (
        <div
          key={index}
          className="grid grid-cols-4 bg-slate-100 p-2 border text-center"
        >
          <h2>{expense?.Name}</h2>
          <h2>${expense?.Amount}</h2>
          <h2>{expense?.CreatedAt}</h2>
          <h2 className="flex justify-center">
            <Trash2
              fill="#a92323"
              strokeWidth="1px"
              onClick={() => deleteExpense(expense)}
              className="cursor-pointer"
            />
          </h2>
        </div>
      ))}
    </div>
  );
};

export default ExpensesList;
