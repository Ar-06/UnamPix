import type { ListOfComments } from "@/types/comments";
import { Comment } from "./Comment";

interface Props {
  comments: ListOfComments;
}

export const CommentsList = ({ comments }: Props) => {
  return (
    <div>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.idComentario}>
              <Comment
                key={comment.idComentario}
                nombres={comment.nombres}
                texto={comment.texto}
                fecha={comment.fecha}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="bg-gray-50 rounded-md p-2">
          <p className="font-medium">Todavía no hay comentarios</p>
        </div>
      )}
    </div>
  );
};
