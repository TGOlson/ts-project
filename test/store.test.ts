import { JSONData } from "../src/data-loader";
import { createStore, createUnhydratedStore } from "../src/store";
import { Post, PostComment, User } from "../src/types";

describe('store', () => {
  const testData: JSONData = {
    users: [
      {
        id: 'user-1',
        name: 'John',
        email: 'foo@gmail.com',
        comments: [
          {
            id: 'comment-1',
            text: 'foo',
            authorId: 'user-1',
            author: {id: 'user-1'},
            postId: 'post-1',
            post: {id: 'post-1'},
            likes: 10,
            createdAt: '2020-01-01T00:00:00.000Z',
            updatedAt: '2020-01-01T00:00:00.000Z',
          },
        ],
        posts: [{
          id: 'post-1',
          authorId: 'user-1',
          author: {id: 'user-1'},
          published: true,
          likes: 3,
          comments: [{
            id: 'comment-1',
          }],
          postHistory: [{
            id: 'post-history-1',
            postId: 'post-1',
            post: {id: 'post-1'},
            title: 'foo',
            content: 'bar',
            createdAt: '2020-01-01T00:00:00.000Z',
            updatedAt: '2020-01-01T00:00:00.000Z',
          }, {
            id: 'post-history-2',
            postId: 'post-1',
            post: {id: 'post-1'},
            title: 'foo2',
            content: 'bar2',
            createdAt: '2020-01-01T00:00:00.000Z',
            updatedAt: '2020-01-01T00:00:00.000Z',
          }],
          createdAt: '2020-01-01T00:00:00.000Z',
          updatedAt: '2020-01-01T00:00:00.000Z',
        }],
        createdAt: '2020-01-01T00:00:00.000Z',
        updatedAt: '2020-01-01T00:00:00.000Z',
      },
    ],
  };

  describe('createUnhydratedStore', () => {
    test('should work for a simple case', () => {
      const store = createUnhydratedStore(testData);
      expect(store).toEqual({
        'user-1': {
          id: 'user-1',
          name: 'John',
          email: 'foo@gmail.com',
          comments: [{id: 'comment-1'}],
          posts: [{id: 'post-1'}],
          createdAt: new Date('2020-01-01T00:00:00.000Z'),
          updatedAt: new Date('2020-01-01T00:00:00.000Z'),
        },
        'post-1': {
          id: 'post-1',
          author: {id: 'user-1'},
          published: true,
          likes: 3,
          comments: [{id: 'comment-1'}],
          postHistory: [{id: 'post-history-1'}, {id: 'post-history-2'}],
          createdAt: new Date('2020-01-01T00:00:00.000Z'),
          updatedAt: new Date('2020-01-01T00:00:00.000Z'),
        },
        'comment-1': {
          id: 'comment-1',
          text: 'foo',
          author: {id: 'user-1'},
          post: {id: 'post-1'},
          likes: 10,
          createdAt: new Date('2020-01-01T00:00:00.000Z'),
          updatedAt: new Date('2020-01-01T00:00:00.000Z'),
        },
        'post-history-1': {
          id: 'post-history-1',
          post: {id: 'post-1'},
          title: 'foo',
          content: 'bar',
          createdAt: new Date('2020-01-01T00:00:00.000Z'),
          updatedAt: new Date('2020-01-01T00:00:00.000Z'),
        }, 
        'post-history-2': {
          id: 'post-history-2',
          post: {id: 'post-1'},
          title: 'foo2',
          content: 'bar2',
          createdAt: new Date('2020-01-01T00:00:00.000Z'),
          updatedAt: new Date('2020-01-01T00:00:00.000Z'),
        },
      });
    });
  });
  describe('createStore', () => {
    test('should create a store of linked entities', () => {
      const store = createStore(testData);

      // work around ts types here...
      // TODO: maybe add type labels to entities
      const user = store['user-1'] as User;
      const post = store['post-1'] as Post;
      const comment = store['comment-1'] as PostComment;

      expect(post.author).toBe(user);
      expect(user.comments[0]).toBe(comment);
    });
    // test('works with an empty list', () => {
    //   expect(sum([])).toBe(0);
    // });
  });
});
