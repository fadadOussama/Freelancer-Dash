import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex justify-center items-center gap-y-6 p-10">
      <div>
        <h2 className={`font-secondFont sm:text-6xl text-4xl text-center mb-4`}>Page Not Found</h2>
        <p className="text-colorText/70 mb-4 sm:text-sm text-center text-xs max-w-xs mx-auto">
          it seems like you&apos;ve stumbled upon a mysterious void, The page you are looking for has vanished into the digital abyss.
        </p>

        <div className="relative flex items-center justify-center mb-2">
          <span className="absolute inset-x-0 h-px bg-colorText/10"></span>
          <span className="relative text-colorText/ px-4 text-xs bg-colorBg uppercase">OR</span>
        </div>

        <div className="flex flex-col gap-y-1">
          <Button
            asChild
            variant={"default"}
            className="sm:text-sm text-xs border border-colorText/10 hover:bg-colorBg hover:text-colorText transition-colors duration-500"
          >
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
