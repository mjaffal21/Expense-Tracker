"use client";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutGridIcon,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideNav = () => {
  const pathName = usePathname();
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGridIcon,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
  ];
  return (
    <div className="h-screen p-5 border shadow-sm">
      <Link href={"/"}>
        <div className="flex flex-row items-center">
          <Image src="/logo.svg" alt="logo" width={40} height={25} />
          <span className="text-blue-800 font-bold text-xl pl-2">
            Expense Tracker
          </span>
        </div>
      </Link>
      <div className="mt-5">
        {menuList.map((item, index) => (
          <Link href={item.path} key={index}>
            <h2
              className={`flex gap-2 items-center text-gray-500 font-medium p-5 cursor-pointer
                rounded-full hover:text-blue-800 hover:bg-blue-100 
                ${pathName == item.path && "text-purple-700 bg-blue-100"}
                mb-2
            `}
            >
              <item.icon /> {item.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-10 p-5 flex gap-2 items-center">
        <UserButton /> My Profile
      </div>
    </div>
  );
};

export default SideNav;
