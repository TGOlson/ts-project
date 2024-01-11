import { loadData } from "./data-loader";
import { createStore } from "./store";
import { User } from "./types";

// goal
// * load json data from files
// * construct types
// * parse into entities
// * entities should have recursive types

const main = () => {
  const data = loadData();
  const firstUserId = data.users[0]?.id as string;
  const store = createStore(data);

  const user = store[firstUserId] as User;
  const posts = user.posts;
  const comments = posts.flatMap((post) => post.comments);

  // const num = add(1, 2);

  console.log(comments);
  console.log('Done!');
};

main();
