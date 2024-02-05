export type Pool = {
  exec: (fn: () => Promise<void>) => void;

  // resolves when the queue is empty
  onEmpty: (fn: () => void) => void;
};

export const createPool = (size: number): Pool => {
  let workersInUse = 0;
  let onEmptyCallback = () => {
    return;
  };

  const queue: (() => Promise<void>)[] = [];

  const process = async (fn: () => Promise<void>) => {
    workersInUse++;
    await fn();
    
    if (queue.length > 0) {
      const next = queue.shift();
      await process(next!);
    }
    
    workersInUse--;

    if (workersInUse === 0) onEmptyCallback();
  };
  
  const exec = (fn: () => Promise<void>) => {
    if (workersInUse < size) {
      process(fn);
    }
    else {
      queue.push(fn);
    }
  };

  const onEmpty = (cb: () => void) => {
    onEmptyCallback = cb;
  };

  return { exec, onEmpty };
};
