/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import { LiaUserEditSolid, LiaUserMinusSolid, LiaUserTimesSolid } from "react-icons/lia";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { useClerk } from "@clerk/nextjs";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import deleteUserInDb from "@/serverActions/deleteUserInDb";

import { FaUserCircle } from "react-icons/fa";
import GuestAlert from "../authComp/GuestAlert";

export default function UserProfile() {
  const { user, signOut } = useClerk();

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const inputRefFirst = useRef<HTMLInputElement | null>(null);
  const inputRefSecond = useRef<HTMLInputElement | null>(null);

  const deleteUser = async () => {
    if (user?.primaryEmailAddress?.emailAddress === "pirokog526@bixolabs.com") {
      toast.error("Can't delete a guest account !");
      return;
    }

    setIsLoadingDelete(true);

    const userId = user?.id as string;

    await signOut();
    await deleteUserInDb(userId);

    toast.success("Account deleted successfully");
    setIsLoadingDelete(false);
  };

  const updateUser = async () => {
    if ((inputRefFirst.current?.value as string) === "" || (inputRefSecond.current?.value as string) === "") {
      toast.error("Please fill out the inputs !");
      return;
    }

    if (user?.firstName === (inputRefFirst.current?.value as string) && user?.lastName === (inputRefSecond.current?.value as string)) {
      toast.error("FullName didn't change !");
      return;
    }

    setIsLoading(true);

    await user?.update({
      firstName: inputRefFirst.current?.value as string,
      lastName: inputRefSecond.current?.value as string,
    });

    setIsLoading(false);
    setIsEditOpen(false);
  };

  async function handleSignOut() {
    await signOut();
    toast.success("Signed out successfully");
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "s" || e.key === "S") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsAlertOpen(true);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "e" || e.key === "E") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsEditOpen(true);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "d" || e.key === "D") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsDeleteOpen(true);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!user) {
    return null;
  }

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          {user?.hasImage ? (
            <div className="relative w-8 h-8 rounded-full overflow-hidden cursor-pointer">
              <Image src={user.imageUrl} alt="userLogo" fill sizes="50vw" />
            </div>
          ) : (
            <div className="relative overflow-hidden cursor-pointer">
              <FaUserCircle className="h-7 w-7" />
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end" sideOffset={14} className="w-56">
          <DropdownMenuLabel>
            <div className="text-sm font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.fullName}</p>
                <p className="text-xs leading-none text-colorText/70">{user?.primaryEmailAddress?.emailAddress}</p>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="flex items-center text-sm" onSelect={() => setIsEditOpen(true)}>
            <span className="mr-2 text-lg">
              <LiaUserEditSolid />
            </span>
            Edit FullName
            <span className="ml-auto text-[10px] leading-none tracking-widest opacity-60 bg-colorText/5 p-1 rounded-sm border border-colorText/5">
              ⌘E
            </span>
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center text-sm" onSelect={() => setIsAlertOpen(true)}>
            <span className="mr-2 text-lg">
              <LiaUserMinusSolid />
            </span>
            Sign Out
            <span className="ml-auto text-[10px] leading-none tracking-widest opacity-60 bg-colorText/5 p-1 rounded-sm border border-colorText/5">
              ⌘S
            </span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="flex items-center text-sm" onSelect={() => setIsDeleteOpen(true)}>
            <span className="mr-2 text-lg">
              <LiaUserTimesSolid />
            </span>
            Delete
            <span className="ml-auto text-[10px] leading-none tracking-widest opacity-60 bg-colorText/5 p-1 rounded-sm border border-colorText/5">
              ⌘D
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Do you wanna sign out ?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
            <AlertDialogAction className="w-full" onClick={handleSignOut}>
              Sign Out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader className="mb-4">
            <DialogTitle>Edit FullName</DialogTitle>
            <DialogDescription className="text-colorText/70">Edit your fullName here. Click save when you&apos;re done.</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="firstname" className="text-center text-sm font-medium">
              Firstname
            </label>
            <input
              defaultValue={user?.firstName as string}
              ref={inputRefFirst}
              id="firstname"
              className="max-h-[200px] min-h-[40px] placeholder:text-colorText/50 col-span-3 text-sm py-2 px-3 bg-colorBg border-[2px] border-colorText/10 rounded-md outline-none"
              placeholder="Enter Firstname Here"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="lastname" className="text-center text-sm font-medium">
              Lastname
            </label>
            <input
              defaultValue={user?.lastName as string}
              ref={inputRefSecond}
              id="lastname"
              className="max-h-[200px] min-h-[40px] placeholder:text-colorText/50 col-span-3 text-sm py-2 px-3 bg-colorBg border-[2px] border-colorText/10 rounded-md outline-none"
              placeholder="Enter Lastname Here"
            />
          </div>

          <Button disabled={isLoading} onClick={updateUser}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
            <AlertDialogAction className="w-full" asChild>
              <button onClick={deleteUser} disabled={isLoadingDelete}>
                {isLoadingDelete ? "Deleting..." : "Delete"}
              </button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <GuestAlert />
    </>
  );
}
