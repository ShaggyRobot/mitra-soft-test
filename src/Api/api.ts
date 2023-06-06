import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

interface IPost {
  id: number;
  userId: number;
  title: string;
  body: string;
  comments?: IComment[];
}

interface IComment {
  id: number;
  postId: number;
  email: string;
  name: string;
  body: string;
}

interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface IUserDTO {
  user: IUser;
  userPosts: {
    totalCount: number;
    posts: Array<IPost>;
  };
}

const getUser = async (userId: number): Promise<IUserDTO | null> => {
  try {
    const user = await axios.get(`users/${userId}`);
    const userPosts = await axios.get(`users/${userId}/posts`);
    const totalCount = userPosts.headers['x-total-count'];

    return {
      user: user.data,
      userPosts: { posts: userPosts.data, totalCount },
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
    const comments = await axios.get(`comments/?postId=${postId}`);
    return {
      id: postId,
      comments: comments.data,
    };
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

export { getPosts, getComments, getUser };
export { type IPost, type IComment, type IUserDTO, type IUser };
