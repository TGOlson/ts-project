type Model = Record<string, string | number>;

type WhereClause<T> = {
  type: 'GT' | 'LT' | 'EQ';
  column: keyof T;
  value: T[keyof T];
};

function makeDB<Schema extends Record<string, Model>>() {
  const _data = {} as Record<keyof Schema, Model[]>;

  function insert<K extends keyof Schema>(table: K, data: Schema[K]): void {
    if (!_data[table]) {
      _data[table] = [];
    }

    _data[table]!.push(data);
  }

  function query<K extends keyof Schema, T extends Schema[K], TK extends keyof T>(table: K, cols: TK[], where: WhereClause<T>[] = []): Record<TK, T[TK]>[] {
    const rows = (_data[table] || []) as T[];

    const filteredRows = rows.filter(row => {
      return where.every(clause => {
        const value = row[clause.column]!;

        if (clause.type === 'GT') {
          return value > clause.value;
        }

        if (clause.type === 'LT') {
          return value < clause.value;
        }

        return value === clause.value;
      });
    });

    return filteredRows.map(row => {
      const result = {} as Record<TK, T[TK]>;

      cols.forEach(col => {
        result[col] = row[col];
      });

      return result;
    });
  }

  return { insert, query };
}

type User = {
  id: number;
  name: string;
  age: number;
};

type Foo = {
  bar: string;
};

type DBSchema = {
  users: User;
  foos: Foo;
};

const db = makeDB<DBSchema>();

db.insert('users', { id: 1, name: 'John Doe', age: 30 });
db.insert('users', { id: 2, name: 'Jane Zay', age: 25 });

console.log(db.query('users', ['name', 'age']));
console.log(db.query('users', ['name', 'age'], [{
  type: 'GT',
  column: 'age',
  value: 25
}]));
