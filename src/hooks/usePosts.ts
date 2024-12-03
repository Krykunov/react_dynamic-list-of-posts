import { useCallback, useEffect, useState } from 'react';
import { getPosts } from '../api/posts';
import { Post } from '../types/Post';

export const usePosts = (id: number | null) => {
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [isPostsError, setIsPostsError] = useState(false);

  const loadPosts = useCallback(async (userId: number) => {
    setIsPostsLoading(true);
    setIsPostsError(false);

    try {
      try {
        const postsFromServer = await getPosts(userId);

        setPosts(postsFromServer);
      } catch {
        setIsPostsError(true);
      }
    } finally {
      setIsPostsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!id) {
      setPosts([]);

      return;
    }

    loadPosts(id);
  }, [id]);

  return {
    posts,
    isPostsLoading,
    currentPost,
    setCurrentPost,
    isPostsError,
  };
};
