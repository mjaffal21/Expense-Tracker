import React from "react";
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const { isSignedIn } = useUser();
  return (
    <div className="p-5 flex justify-between items-center border shadow-sm">
      <Link href={"/"}>
        <div className="flex flex-row items-center">
          <Image src="/logo.svg" alt="logo" width={40} height={25} />
          <span className="text-blue-800 font-bold text-xl pl-2">
            Expense Tracker
          </span>
        </div>
      </Link>

      {isSignedIn ? (
        <div className="flex gap-3 items-center">
          <Link href={"/dashboard"}>
            <Button variant="outline" className="rounded-full">
              Dashboard
            </Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <div className="flex gap-3 items-center">
          <Link href={"/dashboard"}>
            <Button variant="outline" className="rounded-full">
              Dashboard
            </Button>
          </Link>
          <Link href={"/sign-in"}>
            <Button className="bg-blue-800 text-white rounded-full">
              Get Started
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
