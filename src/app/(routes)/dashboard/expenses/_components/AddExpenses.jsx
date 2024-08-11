import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { db } from "../../../../../../utils/dbConfig";
import { Expenses } from "../../../../../../utils/schema";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const AddExpenses = ({ params, refreshBudgets, refreshExpenses }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const onCreateExpense = async () => {
    setLoading(true);
    const result = await db
      .insert(Expenses)
      .values({
        Name: name,
        Amount: amount,
        BudgetId: params.id,
        CreatedAt: new Date().toLocaleString(),
      })
      .returning({ insertedId: Expenses.Id });

    if (result) {
      refreshBudgets();
      refreshExpenses();
      toast("Expense created successfully!");
      setName(""); // Reset name
      setAmount(""); // Reset amount
    }

    setLoading(false);
  };
  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div>
        <div className="mt-2">
          <h2 className="text-black font-semibold my-1">Expense Name</h2>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Insert Expense Name..."
          />
        </div>
        <div className="mt-2">
          <h2 className="text-black font-semibold my-1">Expense Amount</h2>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Insert Expense Amount..."
          />
        </div>
        <Button
          className="mt-3 w-full text-white bg-blue-700 hover:bg-blue-800"
          disabled={!name || !amount}
          onClick={() => onCreateExpense()}
        >
          {loading ? <Loader className="animate-spin" /> : "Create Expense"}
        </Button>
      </div>
    </div>
  );
};

export default AddExpenses;
