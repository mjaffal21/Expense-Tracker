"use client";
import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Budgets } from "../../../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { db } from "../../../../../../utils/dbConfig";

const CreateBudget = ({ refreshData }) => {
  const [emojiIcon, setEmojiIcon] = useState("😄");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { user } = useUser();

  const onCreateBudget = async () => {
    const result = await db
      .insert(Budgets)
      .values({
        Name: name,
        Amount: amount,
        CreatedBy: user?.primaryEmailAddress.emailAddress,
        Icon: emojiIcon,
      })
      .returning({ insertedId: Budgets.Id });

    if (result) {
      refreshData();
      toast("Budget has been created.");
      setName("");
      setAmount("");
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md ">
            <h2 className="text-3xl">+</h2>
            <h2 className="font-bold">Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
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
                    value={name}
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
                    value={amount}
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
                onClick={onCreateBudget}
              >
                Create Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBudget;
