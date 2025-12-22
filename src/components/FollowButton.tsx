"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Loader2Icon, UserCheckIcon, UserPlusIcon } from "lucide-react";
import toast from "react-hot-toast";
import { toggleFollow } from "@/actions/user.action";
import { useRouter } from "next/navigation";

function FollowButton({ 
  userId, 
  initialFollowing = false 
}: { 
  userId: string;
  initialFollowing?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const router = useRouter();

  // Initialize state from prop
  useEffect(() => {
    setIsFollowing(initialFollowing);
  }, [initialFollowing]);

  const handleFollow = async () => {
    if (isLoading) return;
    
    setIsLoading(true);

    try {
      await toggleFollow(userId);
      
      // Toggle the follow state locally
      setIsFollowing(!isFollowing);
      
      // Show appropriate toast message
      if (isFollowing) {
        toast.success("Unfollowed user");
      } else {
        toast.success("Followed user");
      }
      
      // Refresh the page to update follower counts
      router.refresh();
      
    } catch (error) {
      toast.error("Error updating follow status");
      // Revert state on error
      setIsFollowing(isFollowing);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      onClick={handleFollow}
      disabled={isLoading}
      className={`min-w-[100px] transition-all duration-300 hover:translate-y-[-1px] ${
        isFollowing 
          ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700" 
          : "bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-white hover:opacity-90 border-0"
      }`}
    >
      {isLoading ? (
        <Loader2Icon className="size-4 animate-spin" />
      ) : isFollowing ? (
        <>
          <UserCheckIcon className="size-4 mr-2" />
          Following
        </>
      ) : (
        <>
          <UserPlusIcon className="size-4 mr-2" />
          Follow
        </>
      )}
    </Button>
  );
}
export default FollowButton;