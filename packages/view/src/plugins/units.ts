import type { Event, Store } from 'effector';

import { useUnit } from 'effector-react';

import { FactoryPlugin } from '../plugin';

type EventOrStore<T = any> = Event<T> | Store<T>;

type Input =
  | ((...args: any[]) => Record<string, EventOrStore>)
  | Record<string, EventOrStore>;

class UnitsPlugin extends FactoryPlugin<Input> {
  public constructor() {
    super();
  }

  public override props(input: Input, props: any, meta: any) {
    if (typeof input === 'function') {
      return useUnit(input(meta, props));
    }

    return useUnit(input);
  }
}

export { UnitsPlugin };
