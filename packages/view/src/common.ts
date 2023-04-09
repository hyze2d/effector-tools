import type { Effect, Event, Store } from 'effector';

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

type UseUnit<Shape> = {
  [Key in keyof Shape]: Shape[Key] extends Event<infer T>
    ? Equal<T, void> extends true
      ? () => void
      : (payload: T) => T
    : Shape[Key] extends Effect<infer P, infer D, any>
    ? Equal<P, void> extends true
      ? () => Promise<D>
      : (payload: P) => Promise<D>
    : Shape[Key] extends Store<infer V>
    ? V
    : never;
};

export type { UseUnit, Equal };
