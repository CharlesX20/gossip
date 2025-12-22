"use client";

import {
  BellIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useAuth, useUser, SignInButton, SignOutButton } from "@clerk/nextjs"; // Added useUser
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

// REMOVED 'async' and 'currentUser'
function MobileNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isSignedIn } = useAuth();
  const { user } = useUser(); // Use the client-side hook instead
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const handleLinkClick = () => {
    setShowMobileMenu(false);
  };

  return (
    <div className="flex md:hidden items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="mr-2 hover:translate-y-[-1px] transition-transform"
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:translate-y-[-1px] transition-transform">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[280px]">
          <SheetHeader>
            <SheetTitle></SheetTitle>
          </SheetHeader>
          
          <nav className="flex flex-col space-y-3 mt-8">
            <Button 
              variant="ghost" 
              className="flex items-center gap-3 justify-start"
              asChild
              onClick={handleLinkClick}
            >
              <Link href="/">
                <HomeIcon className="w-5 h-5" />
                <span className="font-medium">Home</span>
              </Link>
            </Button>

            {isSignedIn && user ? (
              <>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-3 justify-start"
                  asChild
                  onClick={handleLinkClick}
                >
                  <Link href="/notifications">
                    <BellIcon className="w-5 h-5" />
                    <span className="font-medium">Notifications</span>
                  </Link>
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-3 justify-start"
                  asChild
                  onClick={handleLinkClick}
                >
                  {/* Fixed: Dynamically generate the username link using client-side 'user' */}
                  <Link href={`/profile/${user.username ?? user.emailAddresses[0].emailAddress.split("@")[0]}`}>
                    <UserIcon className="w-5 h-5" />
                    <span className="font-medium">Profile</span>
                  </Link>
                </Button>
                
                <SignOutButton>
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-3 justify-start w-full"
                    onClick={handleLinkClick}
                  >
                    <LogOutIcon className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </Button>
                </SignOutButton>
              </>
            ) : (
              <div className="pt-4">
                <SignInButton mode="modal">
                  <Button 
                    variant="default" 
                    className="w-full bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-white"
                    onClick={handleLinkClick}
                  >
                    Sign In
                  </Button>
                </SignInButton>
              </div>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNavbar;
