/* eslint-disable @typescript-eslint/ban-types */

import { createStore } from 'effector';

import type { ComponentType } from 'react';

import { UnitsPlugin, UseUnitPlugin } from './plugins/units';

import { TFunctionPlugin } from './plugins/t';

import { FactorioPlugin } from './plugins/factorio';

import type { AnyPlugin } from './plugin';

type PluginsMap = Record<string, AnyPlugin>;

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
  [P in keyof Plugins]: any;
};

class FactoryBuilder<Plugins extends PluginsMap> {
  private readonly plugins = {};

  public plugin<Plugin extends AnyPlugin, Name extends string>(
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

const createView = createFactory()
  .plugin(
    'units',

    new UnitsPlugin()
  )

  .plugin('useUnit', new UseUnitPlugin())

  .plugin('t', new TFunctionPlugin())

  .plugin('model', new FactorioPlugin())

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
