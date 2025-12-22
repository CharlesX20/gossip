import { getAllUsers } from "@/actions/user.action";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import FollowButton from "@/components/FollowButton";
import Link from "next/link";
import { UsersIcon } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function ExplorePage() {
  const users = await getAllUsers();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <div className="mb-4">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm sm:text-base text-[#BF953F] dark:text-[#FCF6BA] hover:underline transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Explore People
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Discover and connect with people in your community
        </p>
      </div>

      {/* Stats Card - Responsive */}
      <Card className="mb-6 sm:mb-8 border border-gray-200 dark:border-gray-800 shadow-sm">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="p-2 sm:p-3 rounded-full bg-gradient-to-r from-[#BF953F]/10 to-[#B38728]/10 dark:from-[#FCF6BA]/10 dark:to-[#BF953F]/10">
              <UsersIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#BF953F] dark:text-[#FCF6BA]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold">{users.length} People</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Active in your community</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Grid - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {users.map((user) => (
          <Card 
            key={user.id} 
            className="border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300 hover:translate-y-[-2px]"
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col items-center text-center">
                {/* Avatar */}
                <Link href={`/profile/${user.username}`} className="group">
                  <Avatar className="w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-4 border-2 border-white dark:border-gray-800 shadow-sm group-hover:scale-105 transition-transform">
                    <AvatarImage 
                      src={user.image ?? "/avatar.png"} 
                      className="object-cover"
                    />
                  </Avatar>
                </Link>

                {/* User Info */}
                <div className="w-full mb-3 sm:mb-4">
                  <Link 
                    href={`/profile/${user.username}`}
                    className="font-semibold text-base sm:text-lg hover:text-[#BF953F] dark:hover:text-[#FCF6BA] transition-colors line-clamp-1"
                  >
                    {user.name}
                  </Link>
                  
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">@{user.username}</p>
                  
                  {/* Bio */}
                  {user.bio && (
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                      {user.bio}
                    </p>
                  )}
                </div>

                {/* Stats - Responsive */}
                <div className="flex justify-around w-full mb-3 sm:mb-4">
                  <div className="text-center pr-1">
                    <p className="font-semibold text-sm sm:text-base">{user._count.followers}</p>
                    <p className="text-xs text-muted-foreground">Followers</p>
                  </div>
                  <div className="text-center pr-1">
                    <p className="font-semibold text-sm sm:text-base">{user._count.posts}</p>
                    <p className="text-xs text-muted-foreground">Posts</p>
                  </div>
                  <div className="text-center pr-1">
                    <p className="font-semibold text-sm sm:text-base">{user._count.following}</p>
                    <p className="text-xs text-muted-foreground">Following</p>
                  </div>
                </div>

                {/* Follow Button */}
                <div className="w-full">
                  <FollowButton 
                    userId={user.id} 
                    initialFollowing={user.isFollowing} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State - Responsive */}
      {users.length === 0 && (
        <Card className="border border-gray-200 dark:border-gray-800 mt-6 sm:mt-8">
          <CardContent className="p-6 sm:p-8 text-center">
            <UsersIcon className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">No users found</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              There are no other users to follow at the moment.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}