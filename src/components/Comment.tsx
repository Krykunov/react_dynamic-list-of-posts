import React from 'react';
import type { Comment } from '../types/Comment';

type Props = {
  comment: Comment;
  deleteComment: (commentId: number) => void;
};

const CommentItem: React.FC<Props> = ({ comment, deleteComment }) => {
  const handleDelete = () => {
    deleteComment(comment.id);
  };

  return (
    <article className="message is-small" data-cy="Comment">
      <div className="message-header">
        <a href={comment.email} data-cy="CommentAuthor">
          {comment.name}
        </a>
        <button
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
          onClick={handleDelete}
        >
          delete button
        </button>
      </div>

      <div className="message-body" data-cy="CommentBody">
        {comment.body}
      </div>
    </article>
  );
};

export default CommentItem;
