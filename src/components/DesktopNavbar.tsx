import { BellIcon, HomeIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import ModeToggle from "./ModeToggle";
import { currentUser } from "@clerk/nextjs/server";

async function DesktopNavbar() {
  const user = await currentUser();

  return (
    <div className="hidden md:flex items-center space-x-4">
      <ModeToggle />
      
      {/* Simple separator */}
      <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>

      {/* Home Button */}
      <Button 
        variant="ghost" 
        className="flex items-center gap-2 hover:translate-y-[-1px] transition-transform"
        asChild
      >
        <Link href="/">
          <HomeIcon className="w-4 h-4" />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>

      {user ? (
        <>
          {/* Notifications Button */}
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 hover:translate-y-[-1px] transition-transform"
            asChild
          >
            <Link href="/notifications">
              <BellIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Notifications</span>
            </Link>
          </Button>
          
          {/* Profile Button */}
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 hover:translate-y-[-1px] transition-transform"
            asChild
          >
            <Link
              href={`/profile/${
                user.username ?? user.emailAddresses[0].emailAddress.split("@")[0]
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Profile</span>
            </Link>
          </Button>
          
          {/* User Button */}
          <div className="pl-2">
            <UserButton />
          </div>
        </>
      ) : (
        /* Sign In Button with theme gradient */
        <SignInButton mode="modal">
          <Button 
            variant="default"
            className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]
                       text-white font-medium hover:translate-y-[-1px] 
                       transition-transform duration-200 shadow-sm"
          >
            Sign In
          </Button>
        </SignInButton>
      )}
    </div>
  );
}

export default DesktopNavbar;