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
}

export {IComment, IPost, IUser, IUserDTO, }