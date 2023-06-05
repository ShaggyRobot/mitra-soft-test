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
): Promise<IPost[]> => {
  try {
    const posts = await axios.get(
      `posts?_start=${start}&_limit=${limit || ''}`,
    );

    return posts.data;
  } catch (error: unknown) {
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
