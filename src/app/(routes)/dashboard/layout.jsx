"use client";
import React, { useEffect } from "react";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import { Budgets } from "../../../../utils/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { db } from "../../../../utils/dbConfig";
import { useRouter } from "next/navigation";

const layout = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();
  const checkUserBudgets = async () => {
    const result = await db
      .select()
      .from(Budgets)
      .where(eq(Budgets.CreatedBy, user?.primaryEmailAddress?.emailAddress));

    if (result?.length == 0) {
      router.replace("/dashboard/budgets");
    }
  };

  useEffect(() => {
    user && checkUserBudgets();
  }, [user]);
  return (
    <div>
      <div className="fixed md:w-64 hidden md:block">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
};

export default layout;
