import { getUserByClerkId } from '@/actions/user.action';
import { currentUser } from '@clerk/nextjs/server';
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { Button } from './ui/button';
import Link from 'next/link';
import { Avatar, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { LinkIcon, MapPinIcon } from 'lucide-react';

async function Sidebar() {
  const authUser = await currentUser();
  if (!authUser) return <UnAuthenticatedSidebar />;

  const user = await getUserByClerkId(authUser.id);
  if (!user) return null;
  return (
    <div className="sticky top-20">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <Link
              href={`/profile/${user.username}`}
              className="flex flex-col items-center justify-center"
            >
              <Avatar className="w-20 h-20 border-2 ">
                <AvatarImage src={user.image || "/avatar.png"} />
              </Avatar>

              <div className="mt-4 space-y-1">
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.username}</p>
              </div>
            </Link>

            {user.bio && <p className="mt-3 text-sm text-muted-foreground">{user.bio}</p>}

            <div className="w-full">
              <Separator className="my-4" />
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{user._count.following}</p>
                  <p className="text-xs text-muted-foreground">Following</p>
                </div>
                <Separator orientation="vertical" />
                <div>
                  <p className="font-medium">{user._count.followers}</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
              </div>
              <Separator className="my-4" />
            </div>

            <div className="w-full space-y-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <MapPinIcon className="w-4 h-4 mr-2" />
                {user.location || "No location"}
              </div>
              <div className="flex items-center text-muted-foreground">
                <LinkIcon className="w-4 h-4 mr-2 shrink-0" />
                {user.website ? (
                  <a href={`${user.website}`} className="hover:underline truncate" target="_blank">
                    {user.website}
                  </a>
                ) : (
                  "No website"
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
};

export default Sidebar;

const UnAuthenticatedSidebar = () => (
  <div className="sticky top-20">
    <Card className="border-gray-200 dark:border-gray-800 shadow-sm">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold text-gray-900 dark:text-gray-100">
          Welcome Back!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground mb-6 text-sm">
          Sign in to access your profile and connect with others.
        </p>

        <SignInButton mode="modal">
          <Button
            variant="outline"
            className="w-full border-gray-300 dark:border-gray-700 hover:border-[#BF953F] dark:hover:border-[#FCF6BA] hover:translate-y-[-1px] transition-all"
          >
            Sign In
          </Button>
        </SignInButton>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full bg-gray-200 dark:bg-gray-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-gray-950 px-2 text-muted-foreground">
              Or
            </span>
          </div>
        </div>

        <SignUpButton mode="modal">
          <Button
            className="w-full bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-white hover:translate-y-[-1px] transition-transform shadow-sm"
          >
            Create Account
          </Button>
        </SignUpButton>
      </CardContent>
    </Card>
  </div>
);