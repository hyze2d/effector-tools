import { useUnit } from 'effector-react';

import type { Event, Store } from 'effector';

import { ConfigPlugin, SelectorPlugin } from '../plugin';

type EventOrStore<T = any> = Event<T> | Store<T>;

type UnitsParam = Record<string, EventOrStore>;

class UnitsPlugin<T extends UnitsParam> extends ConfigPlugin<T> {
  public override process(params: T) {
    return {
      meta: {},

      props: useUnit(params)
    };
  }
}

class UseUnitPlugin<
  T extends (props: any, meta: any) => UnitsParam
> extends SelectorPlugin<T> {
  public override process(selector: T, props: any, meta: any) {
    return {
      meta: {},

      props: useUnit(selector(props, meta))
    };
  }
}

export { UseUnitPlugin, UnitsPlugin };
