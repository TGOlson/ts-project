import { USERS_1_DATA, USERS_2_DATA, dedupeUsers, parseUser1Data, parseUser2Data } from "./users";

const main = async () => {
  // Steps:
  // 1. Read in data from both files (done by importing json files directly in users.ts)
  // 2. Transform data into a common format (done by parseUser1Data and parseUser2Data)
  // 3. Dedupe based on dedupe key

  // If we needed to support more files with different schemas, may need to change:
  // 1. File reading could be a more generic readFile function (would then need to manually type out schemas)
  // 2. Transform may need to refactor to a mapping of: file -> schema/parser function
  const users1 = USERS_1_DATA.map(parseUser1Data);
  const users2 = USERS_2_DATA.map(parseUser2Data);
  
  const deduped = dedupeUsers([...users1, ...users2]);
  console.log(deduped);
  // console.log(users1);
  // console.log(users2);

  console.log('Done!');
};

main();
