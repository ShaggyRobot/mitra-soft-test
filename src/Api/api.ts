import axios from 'axios';
import { IPost, IUserDTO } from './types';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

const getUser = async (userId: number): Promise<IUserDTO | null> => {
  try {
    const user = await axios.get(`users/${userId}`);
    return {
      user: user.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.code, error.message);

      return null;
    } else {
      console.error('Somethiong gone wrong.');

      return null;
    }
  }
};

const getPosts = async (): Promise<{ posts: IPost[]; totalCount: number }> => {
  try {
    const posts = await axios.get(`posts`);
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
    const comments = await axios.get(`comments/?postId=${postId}`);
    return {
      id: postId,
      comments: comments.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.code, error.message);

      return { id: postId, comments: [] };
    } else {
      console.error('Somethiong gone wrong.');

      return { id: postId, comments: [] };
    }
  }
};

export { getPosts, getComments, getUser };
