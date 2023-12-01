import Link from "next/link";
import NavSheet from "./navComp/navSheet";
import NavTheme from "./navComp/navIcon";
import UserProfile from "./userProfile";
import NavSearch from "./navComp/navSearch";

export default function Nav() {
  return (
    <nav className="bg-colorBg sticky top-0 glassEffect border-b border-colorText/10 z-50">
      <div className="flex h-16 items-center gap-4 case">
        <div className="flex items-center gap-4">
          <Link href="/" className="relative block h-8 w-8 rounded-full overflow-hidden outline-none">
            <div
              className="
              w-full
              h-full
              bg-gradient-to-r
              from-pink-500
              via-red-500
              to-yellow-500
              background-animate
            "
            ></div>
          </Link>
          <div className="md:hidden block">
            <NavTheme />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <NavSearch />

          <div className="flex items-center gap-4">
            <div className="md:block hidden">
              <NavTheme />
            </div>

            <UserProfile />

            <NavSheet />
          </div>
        </div>
      </div>
    </nav>
  );
}
