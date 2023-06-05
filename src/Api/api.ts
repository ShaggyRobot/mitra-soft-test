import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

interface IPost {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const getPosts = async (
  start: number = 0,
  limit?: number,
): Promise<{ posts: IPost[]; totalCount: number }> => {
  try {
    const posts = await axios.get(
      `posts?_start=${start}&_limit=${limit || ''}`,
    );

    const totalCount = posts.headers['x-total-count'];

    return {
      totalCount,
      posts: posts.data,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.code, error.message);

      return { totalCount: 0, posts: [] };
    } else {
      console.error('Somethiong gone wrong.');

      return { totalCount: 0, posts: [] };
    }
  }
};

const getComments = async (postId: number) => {
  try {
    const comments = await axios.get(`comments?_postid=${postId}`);
    return comments.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.code, error.message);

      return [];
    } else {
      console.error('Somethiong gone wrong.');

      return [];
    }
  }
};

export { getPosts, type IPost };
