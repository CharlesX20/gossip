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
    "What’s happening in the neighborhood?",
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
        <Card className="mb-6">
            <CardContent className="pt-6">
                <div className="space-y-4">
                    <div className="flex space-x-4">
                        <Avatar className="w-10 h-10">
                            <AvatarImage src={user?.imageUrl || "/avatar.png"} />
                        </Avatar>
                        <Textarea
                            placeholder={placeholder}
                            className="min-h-[100px] resize-none border-none focus-visible:ring-0 p-0 text-base"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            disabled={isPosting}
                        />
                    </div>
                    {/* Image upload section */}
                    {(showImageUpload || imageUrl) && (
                        <div className="border rounded-lg p-4">
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

                    <div className="flex items-center justify-between border-t pt-4">
                        <div className="flex space-x-2">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-primary"
                                onClick={() => setShowImageUpload(!showImageUpload)}
                                disabled={isPosting}
                            >
                                <ImageIcon className="size-4 mr-2" />
                                Photo
                            </Button>
                        </div>
                        <Button
                            className="flex items-center"
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
                                    <SendIcon className="size-4 mr-2" />
                                    Post
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default CreatePost
