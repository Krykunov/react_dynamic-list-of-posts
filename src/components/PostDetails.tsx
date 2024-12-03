import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { useComments } from '../hooks/useComments';
import CommentItem from './Comment';

type Props = {
  currentPost: Post;
  isShowForm: boolean;
  setIsShowForm: (value: boolean) => void;
};

export const PostDetails: React.FC<Props> = ({
  currentPost,
  isShowForm,
  setIsShowForm,
}) => {
  const {
    comments,
    addComment,
    isCommentsLoading,
    isCommentsError,
    deleteComment,
    isCommentCreating,
  } = useComments(currentPost.id);

  const isShowCommentsBlock = !isCommentsError && !isCommentsLoading;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${currentPost.id} ${currentPost.title}`}</h2>

          <p data-cy="PostBody">{currentPost.body}</p>
        </div>

        <div className="block">
          {isCommentsLoading && <Loader />}

          {isCommentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {isShowCommentsBlock && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {isShowCommentsBlock && comments.length !== 0 && (
            <>
              <p className="title is-4">Comments:{comments.length}</p>
              {comments.map(comment => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  deleteComment={deleteComment}
                />
              ))}
            </>
          )}

          {isShowCommentsBlock && !isShowForm && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsShowForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isShowForm && (
          <NewCommentForm
            currentPostId={currentPost.id}
            addComment={addComment}
            isCommentCreating={isCommentCreating}
          />
        )}
      </div>
    </div>
  );
};
