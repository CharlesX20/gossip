"use client"

import { useUser } from "@clerk/nextjs"
import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ImageIcon, Loader2Icon, SendIcon } from "lucide-react";
import { createPost } from "@/actions/post.action";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";

const PLACEHOLDERS = [
    "What's the talk of the town?",
    "Got some local tea? Share it here...",
    "What's happening in the neighborhood?",
    "Spill the gossip...",
    "Seen something interesting nearby?",
    "Ask a question or share an update...",
];

function CreatePost() {
    const { user } = useUser();
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isPosting, setIsPosting] = useState(false);
    const [showImageUpload, setShowImageUpload] = useState(false);
    const [placeholder, setPlaceholder] = useState("Heard any good gossip?");

    const handleSubmit = async () => {
        if (!content.trim() && !imageUrl) return;
        setIsPosting(true);
        try {
            const result = await createPost(content, imageUrl);
            if (result?.success) {
                setContent("");
                setImageUrl("");
                setShowImageUpload(false);
            }
            toast.success("Post created!");
        } catch (error) {
            console.error("Error creating post:", error);
            toast.error("Failed to create post. Please try again.");
        } finally {
            setIsPosting(false);
        }
    };

    // Pick a random placeholder only on the client side to avoid hydration errors
    useEffect(() => {
        const randomValue = PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)];
        setPlaceholder(randomValue);
    }, []);

    return (
        <Card className="mb-6 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 translate-y-[-4px]">
            <CardContent className="pt-6">
                <div className="space-y-4">
                    {/* User info and textarea container */}
                    <div className="flex space-x-4">
                        <Avatar className="w-10 h-10 border-2 border-white dark:border-gray-800 shadow-md">
                            <AvatarImage 
                                src={user?.imageUrl || "/avatar.png"} 
                                className="object-cover"
                            />
                        </Avatar>
                        
                        {/* Enhanced textarea container */}
                        <div className="flex-1 relative">
                            <Textarea
                                placeholder={placeholder}
                                className="min-h-[120px] resize-none border-2 border-gray-300 dark:border-gray-700 
                                         focus:border-[#BF953F]/50 dark:focus:border-[#FCF6BA]/50 
                                         bg-white dark:bg-gray-900 rounded-xl p-4 text-base
                                         focus-visible:ring-2 focus-visible:ring-[#BF953F]/30 dark:focus-visible:ring-[#FCF6BA]/30
                                         transition-all duration-300 ease-in-out
                                         placeholder:text-gray-400 dark:placeholder:text-gray-500
                                         text-gray-900 dark:text-gray-100
                                         overflow-auto  /* Keep overflow for functionality */
                                         scrollbar-none /* Hide scrollbar but keep functionality */"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                disabled={isPosting}
                            />
                        </div>
                    </div>
                    
                    {/* Image upload section - Enhanced */}
                    {(showImageUpload || imageUrl) && (
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 
                                      rounded-xl p-4 bg-gray-50/50 dark:bg-gray-900/50 
                                      transition-all duration-300 animate-in slide-in-from-top-2">
                            <ImageUpload
                                endpoint="postImage"
                                value={imageUrl}
                                onChange={(url) => {
                                    setImageUrl(url);
                                    if (!url) setShowImageUpload(false);
                                }}
                            />
                        </div>
                    )}

                    {/* Action buttons - Enhanced with theme colors */}
                    <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4">
                        <div className="flex space-x-2">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-[#BF953F] dark:hover:text-[#FCF6BA]
                                         hover:bg-gradient-to-r hover:from-[#BF953F]/10 hover:to-[#B38728]/10
                                         rounded-lg px-3 py-2 transition-all duration-300
                                         hover:translate-y-[-2px] hover:shadow-md
                                         border border-transparent hover:border-[#BF953F]/20 dark:hover:border-[#FCF6BA]/20"
                                onClick={() => setShowImageUpload(!showImageUpload)}
                                disabled={isPosting}
                            >
                                <ImageIcon className="size-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                                Photo
                            </Button>
                        </div>
                        
                        {/* Post button with theme gradient - Text stays white */}
                        <Button
                            className="flex items-center bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]
                                     text-white font-medium rounded-lg px-6 py-2
                                     hover:from-[#B38728] hover:via-[#FCF6BA] hover:to-[#BF953F]
                                     hover:shadow-lg hover:translate-y-[-2px] 
                                     transition-all duration-300 ease-in-out
                                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
                                     border-0 shadow-md"
                            onClick={handleSubmit}
                            disabled={(!content.trim() && !imageUrl) || isPosting}
                        >
                            {isPosting ? (
                                <>
                                    <Loader2Icon className="size-4 mr-2 animate-spin" />
                                    Posting...
                                </>
                            ) : (
                                <>
                                    <SendIcon className="size-4 mr-2 transition-transform duration-300 group-hover:translate-x-1" />
                                    Post
                                </>
                            )}
                        </Button>
                    </div>
                    
                    {/* Helper text for less educated users */}
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center pt-2 border-t border-gray-100 dark:border-gray-800">
                        ✏️ Type your thoughts above or upload a photo to share with the community
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default CreatePost;