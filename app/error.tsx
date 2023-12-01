"use client";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const themeAttribute = document.documentElement.getAttribute("data-theme");

  return (
    <div className="h-screen flex md:flex-row flex-col justify-center items-center gap-y-6 p-10">
      <div>
        <h2 className={`font-secondFont sm:text-4xl text-3xl text-center mb-1`}>Whoops! We Have a Problem.</h2>
        <p className="text-colorText/70 mb-4 sm:text-sm text-center text-xs">
          Looks like our dashboard took a wrong turn, We&apos;re hustling to get things back on track.
        </p>

        <div className="relative flex items-center justify-center mb-2">
          <span className="absolute inset-x-0 h-px bg-colorText/10"></span>
          <span className="relative text-colorText/ px-4 text-xs bg-colorBg uppercase">OR</span>
        </div>

        <div className="flex flex-col gap-y-1">
          <Button
            variant={"default"}
            className="sm:text-sm text-xs border border-colorText/10 hover:bg-colorBg hover:text-colorText transition-colors duration-500"
            onClick={() => reset()}
          >
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
