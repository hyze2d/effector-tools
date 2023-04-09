import type { Event, Store } from 'effector';

import { useUnit } from 'effector-react';

import type { IPlugin } from '../plugin';

type EventOrStore<T = any> = Event<T> | Store<T>;

type Shape =
  | ((...args: any[]) => Record<string, EventOrStore>)
  | Record<string, EventOrStore>;

class UnitsPlugin<Input extends Shape> implements IPlugin<Input> {
  public readonly inputType!: Input;

  public process(input: Input, props: any, meta: any) {
    if (typeof input === 'function') {
      return useUnit(input(meta, props));
    }

    return useUnit(input);
  }
}

export { UnitsPlugin };
