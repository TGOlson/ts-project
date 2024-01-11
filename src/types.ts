// -- structure --
// users
//   comments
//     user
//     post
//   posts
//     posthistory
//       post
//     comments
//       user
//       post

export type UnhydratedUser = {
  id: string;
  name: string;
  email: string;
  comments: {id: string}[];
  posts: {id: string}[];
  createdAt: Date;
  updatedAt: Date;
};

export type User = Omit<UnhydratedUser, 'comments' | 'posts'> & {
  comments: PostComment[];
  posts: Post[];
};


export type UnhydratedPostComment = {
  id: string,
  text: string,
  author: {id: string},
  post: {id: string},
  likes: number,
  createdAt: Date,
  updatedAt: Date,
};

export type PostComment = Omit<UnhydratedPostComment, 'author' | 'post'> & {
  author: User,
  post: Post,
};

export type UnhydratedPost = {
  id: string,
  author: {id: string},
  published: boolean,
  likes: number,
  comments: {id: string}[],
  postHistory: {id: string}[],
  createdAt: Date,
  updatedAt: Date,
};

export type Post = Omit<UnhydratedPost, 'author' | 'postHistory' | 'comments'> & {
  author: User,
  postHistory: PostHistory[],
  comments: PostComment[],
};

export type UnhydratedPostHistory = {
  id: string,
  title: string,
  content: string,
  post: {id: string},
  createdAt: Date,
  updatedAt: Date,
};

export type PostHistory = Omit<UnhydratedPostHistory, 'post'> & {
  post: Post,
};
