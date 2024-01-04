import { uniqBy } from 'ramda';
import USERS_1_DATA from '../data/users_1.json';
import USERS_2_DATA from '../data/users_2.json';
import assert from 'assert';

// Note: this uses tyescript inference of the json schemas
// I'm not 100% confident it does unions exactly correctly,
// but it's likely still less error prone than typing out the json files manually. 
// TODO: revisit and decide if a manual type is safer.
export type User1Raw = typeof USERS_1_DATA[0];
export type User2Raw = typeof USERS_2_DATA[0];

export {USERS_1_DATA, USERS_2_DATA};

export type User = {
  id: number;
  email: string;
  phone: string;
} & (
  | { fullName: string }
  | { userName: string }
);

// Note: could refactor this into a slightly more generic function for parsing users
// Consider doing this if there are larger schemas, more schemas, or more overlap between schemas.
export const parseUser1Data = (user: User1Raw): User => {
  const id = user.id;
  const fullName = user.full_name || user.name || (user.first_name ? `${user.first_name} ${user.last_name}` : undefined);
  const nameProp = fullName ? { fullName } : { userName: user.username as string };

  const email = user.email || user.email_address;
  const phone = user.phone || user.phone_number || user.contact_number;
  
  assert(email, `Unexpected parse error: no email found on user ${JSON.stringify(user)}`);
  assert(phone, `Unexpected parse error: no phone found on user ${JSON.stringify(user)}`);

  return {
    id,
    ...nameProp,
    email,
    phone,
  };
};

export const parseUser2Data = (user: User2Raw): User => {
  const id = user.identity;
  const fullName = user.full_name || user.name || (user.first ? `${user.first} ${user.last}` : undefined);
  const nameProp = fullName ? { fullName } : { userName: user.user as string };

  const email = user.email || user.email_address;
  const phone = user.phone || user.telephone || user.mobile || user.phone_number;
  
  assert(email, `Unexpected parse error: no email found on user ${JSON.stringify(user)}`);
  assert(phone, `Unexpected parse error: no phone found on user ${JSON.stringify(user)}`);

  return {
    id,
    ...nameProp,
    email,
    phone,
  };
};

// Rules:
// * Ignore id, inconsistent, can't use for dedupe
// * If username, use that to dedupe
// * Otherwise, use email (name and phone are possibly not unique)
const dedupeKey = (user: User) => 'userName' in user ? user.userName : user.email;

export const dedupeUsers = (users: User[]): User[] => uniqBy(dedupeKey, users);
