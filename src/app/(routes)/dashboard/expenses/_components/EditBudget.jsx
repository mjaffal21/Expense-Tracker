import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Input } from "@/components/ui/input";
import { db } from "../../../../../../utils/dbConfig";
import { Budgets } from "../../../../../../utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

const EditBudget = ({ budgetInfo, refreshBudgets }) => {
  const [emojiIcon, setEmojiIcon] = useState();
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  useEffect(() => {
    setEmojiIcon(budgetInfo?.Icon);
    setName(budgetInfo?.Name);
    setAmount(budgetInfo?.Amount);
  }, [budgetInfo]);

  const onEditBudget = async () => {
    const result = await db
      .update(Budgets)
      .set({
        Icon: emojiIcon,
        Name: name,
        Amount: amount,
      })
      .where(eq(Budgets.Id, budgetInfo.Id))
      .returning();

    if (result) {
      refreshBudgets();
      toast("Budget updated!");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div>
            <Button>Edit Budget</Button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant="outline"
                  className="text-xl"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                <div className="mt-4 absolute z-20">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-semibold my-1">Budget Name</h2>
                  <Input
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Insert Budget Name..."
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-semibold my-1">
                    Budget Amount
                  </h2>
                  <Input
                    type="number"
                    defaultValue={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Insert Budget Amount..."
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                className="mt-5 w-full text-white bg-blue-700 hover:bg-blue-800"
                disabled={!name || !amount}
                onClick={onEditBudget}
              >
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditBudget;
