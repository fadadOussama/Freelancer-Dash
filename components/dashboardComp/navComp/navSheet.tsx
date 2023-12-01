"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { useState } from "react";

export default function NavSheet() {
  const [status, setStatus] = useState(false);

  return (
    <Sheet open={status} onOpenChange={setStatus}>
      <SheetTrigger className="block md:hidden group">
        <div className="space-y-2">
          <span className="block w-5 group-hover:w-8 h-0.5 bg-colorText transition-all duration-300"></span>
          <span className="block w-8 h-0.5 bg-colorText transition-colors duration-300"></span>
        </div>
      </SheetTrigger>

      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle className="text-xl mb-2">Navigation</SheetTitle>
          <div className="border-t border-colorText/10 my-3"></div>
          <SheetDescription>
            <Link href="/kanban" className="navSheetLink" onClick={() => setStatus(false)}>
              Kanban
            </Link>
            <Link href="/calendar" className="navSheetLink" onClick={() => setStatus(false)}>
              Calendar
            </Link>
            <Link href="/clients" className="navSheetLink" onClick={() => setStatus(false)}>
              Clients
            </Link>
            <Link href="/projects" className="navSheetLink" onClick={() => setStatus(false)}>
              Projects
            </Link>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
