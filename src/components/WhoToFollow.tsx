import { getRandomUsers } from "@/actions/user.action";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import FollowButton from "./FollowButton";

async function WhoToFollow() {
  const users = await getRandomUsers();

  if (users.length === 0) return null;

  return (
    <Card className="border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Who to Follow
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div 
              key={user.id} 
              className="flex gap-3 items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900/50 p-2 rounded-lg transition-colors group"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Link 
                  href={`/profile/${user.username}`}
                  className="flex-shrink-0"
                >
                  <Avatar className="w-10 h-10 group-hover:scale-105 transition-transform">
                    <AvatarImage 
                      src={user.image ?? "/avatar.png"} 
                      className="object-cover"
                    />
                  </Avatar>
                </Link>
                
                <div className="min-w-0 flex-1">
                  <Link 
                    href={`/profile/${user.username}`}
                    className="font-medium text-sm hover:text-[#BF953F] dark:hover:text-[#FCF6BA] transition-colors truncate block"
                  >
                    {user.name}
                  </Link>
                  <p className="text-xs text-muted-foreground truncate">@{user.username}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {user._count.followers} follower{user._count.followers !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <FollowButton 
                  userId={user.id} 
                  initialFollowing={user.isFollowing} 
                />
              </div>
            </div>
          ))}
          
          {/* View More Link */}
          <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
            <Link 
              href="/explore" 
              className="text-sm text-[#BF953F] dark:text-[#FCF6BA] hover:underline font-medium flex justify-center items-center gap-1 transition-colors group"
            >
              View more people
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default WhoToFollow;