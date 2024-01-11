import { mergeDeepLeft } from "ramda";
import assert from "assert";

import { JSONData } from "./data-loader";
import { UnhydratedPost, UnhydratedPostComment, UnhydratedPostHistory, UnhydratedUser, Post, PostComment, PostHistory, User } from "./types";

// internal type used during parsing
type UnhydratedStore = {
  [key: string]: UnhydratedUser | UnhydratedPost | UnhydratedPostComment | UnhydratedPostHistory;
};

export type Entity = User | Post | PostComment | PostHistory;

export type Store = {
  [key: string]: Entity;
};

export const createStore = (data: JSONData): Store => {
  const unhydratedStore = createUnhydratedStore(data);
  const store = hydrateStore(unhydratedStore);

  return store;
};

export const hydrateStore = (unhydratedStore: UnhydratedStore): Store => {
  // note: this is a little typescript trickery
  // this isn't a hydrated store yet... but it will be once we mutate the objects a few lines below
  const store: Store = mergeDeepLeft({} as Store, unhydratedStore);

  const getEntity = (id: string) => {
    const entity = store[id];
    assert(entity, `Entity with id ${id} does not exist`);
    return entity;
  };

  // do some mutation here, directly assign entity references to each other
  Object.values(store).forEach((entity) => {
    Object.entries(entity).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item, i) => {
          if ('id' in item) {
            value[i] = getEntity(item.id);
          }
        });
      } else if (typeof value === "object" && 'id' in value) {
        Object.assign(entity, {[key]: getEntity(value.id)});
        // entity[key] = getEntity(value.id);
      }
    });
  });
  
  return store;
};

export const createUnhydratedStore = (data: JSONData): UnhydratedStore => {
  const store: UnhydratedStore = {};

  data.users.forEach((user) => {
    store[user.id] = {
      id: user.id,
      name: user.name,
      email: user.email,
      comments: user.comments.map((comment) => ({id: comment.id})),
      posts: user.posts.map((post) => ({id: post.id})),
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
    };

    user.comments.forEach((comment) => {
      store[comment.id] = {
        id: comment.id,
        text: comment.text,
        author: {id: comment.authorId},
        post: {id: comment.postId},
        likes: comment.likes,
        createdAt: new Date(comment.createdAt),
        updatedAt: new Date(comment.updatedAt),
      };
    });

    user.posts.forEach((post) => {
      store[post.id] = {
        id: post.id,
        author: {id: post.authorId},
        published: post.published,
        likes: post.likes,
        comments: post.comments.map((comment) => ({id: comment.id})),
        postHistory: post.postHistory.map((postHistory) => ({id: postHistory.id})),
        createdAt: new Date(post.createdAt),
        updatedAt: new Date(post.updatedAt),
      };

      post.postHistory.forEach((postHistory) => {
        store[postHistory.id] = {
          id: postHistory.id,
          post: {id: postHistory.postId},
          title: postHistory.title,
          content: postHistory.content,
          createdAt: new Date(postHistory.createdAt),
          updatedAt: new Date(postHistory.updatedAt),
        };
      });
    });
  });

  return store;
};
