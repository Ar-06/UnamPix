import { CommentsList } from "@/components/comments/CommentsList";
import { Input } from "@/components/ui/input";
import type { Comments } from "@/types/comments";
import type { idPublicacion } from "@/types/public";
import { SendHorizonal } from "lucide-react";
import { useState } from "react";

export const CommentsPage = ({ idPublicacion }: idPublicacion) => {
  const [comments, setComments] = useState<Comments[]>([]);

  return (
    <div className="space-y-4">
      <CommentsList comments={comments} />
      <div className="">
        <form className="relative">
          <Input
            placeholder="Agrega un comentario para iniciar la conversación"
            required
            className="pr-12 h-10"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg hover:cursor-pointer"
          >
            <SendHorizonal className="h-4 w-4"/>
          </button>
        </form>
      </div>
    </div>
  );
};
