/* eslint-disable @typescript-eslint/ban-types */

import type { Event, Store } from 'effector';

import { createStore } from 'effector';

import { useUnit } from 'effector-react';

import type { ComponentType } from 'react';

import { useTranslation } from 'react-i18next';

import type { IPlugin } from './plugin';

import type { UseUnit } from './common';

type Fn = (...args: any[]) => any;

type EventOrStore<T = any> = Event<T> | Store<T>;

type UnitsParam = Record<string, EventOrStore>;

type PluginsMap = Record<string, IPlugin>;

type ViewConfig<DefaultProps = {}, Ref = undefined> = {
  ref: Ref;
  memo: boolean | undefined;
  defaultProps: DefaultProps;
};

type BaseViewConfig = {
  ref: undefined;
  memo: undefined;
  defaultProps: {};
};

type ViewBuilder<
  Plugins extends PluginsMap,
  Props,
  InnerProps = {},
  Meta = {},
  Config extends ViewConfig = BaseViewConfig
> = {
  defaultProps: <DefaultProps extends Partial<Props>>(
    defaultProps: DefaultProps
  ) => any;

  ref: <Ref = any>() => any;

  memo: () => any;

  map: <Result>() => any;

  view: () => ComponentType;
} & {
  [P in keyof Plugins]: Parameters<Plugins[P]>[0] extends Fn
    ? <T extends ReturnType<Plugins[P]>>(
        fn: (props: Props & InnerProps, meta: Meta) => T
      ) => ViewBuilder<Plugins, Props, InnerProps & T, Meta, Config>
    : number;
};

class FactoryBuilder<Plugins extends PluginsMap> {
  private readonly plugins = {};

  public plugin<Plugin extends IPlugin, Name extends string>(
    name: Name,
    plugin: Plugin
  ): FactoryBuilder<Plugins & Record<Name, Plugin>> {
    return this as FactoryBuilder<Plugins & Record<Name, Plugin>>;
  }

  public build() {
    return <Props = {}>() => null! as ViewBuilder<Plugins, Props>;
  }
}

const createFactory: () => FactoryBuilder<{}> = null!;

const unitsPlugin = <Param extends UnitsParam>(units: Param) => ({
  meta: {},

  props: useUnit(units)
});

const useUnitPlugin = <
  Props,
  Meta,
  Param extends (props: Props, Meta: Meta) => UnitsParam
>(
  selector: Param,
  props: Props,
  meta: Meta
) => ({
  meta: {},

  props: useUnit(selector(props, meta)) as UseUnit<Param>
});

const tFunctionPlugin = () => ({
  meta: {},

  props: {
    t: useTranslation().t
  }
});

const factorioPlugin = (model: { useModel: () => any }) => ({
  props: {},

  meta: {
    $$model: model.useModel()
  }
});

const createView = createFactory()
  .plugin(
    'units',

    unitsPlugin
  )

  .plugin('useUnit', useUnitPlugin)

  .plugin('t', tFunctionPlugin)

  .plugin('model', factorioPlugin)

  .build();

type UserProps = {
  id: string;
  role: string;
};

const $email = createStore('');

const User = createView<UserProps>()
  .useUnit(props => ({
    email: $email
  }))

  .useUnit((props, meta) => {});
