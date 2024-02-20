import { add, sum } from "./math";
import _ from 'lodash';

const groups = _.groupBy([{foo: 1}, {foo: 2}, {foo: 1}], x => x.foo);
const values = Object.values(groups);

const main = () => {
  console.log('add(1, 2)', add(1, 2));
  console.log('sum([3, 4, 5])', sum([3, 4, 5]));
  console.log('grouped values', values);
  console.log('Done!');
};

main();
