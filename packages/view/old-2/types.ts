/* eslint-disable @typescript-eslint/ban-types */
import type { ComponentType } from 'react';

import { TFunctionPlugin } from './plugins/t';

import { UnitsPlugin } from './plugins/units';

import { FactorioPlugin } from './plugins/factorio';

import type { IPlugin } from './plugin';

type ViewConfig<DefaultProps, Ref = undefined> = {
  ref: Ref;
  memo: boolean | undefined;
  defaultProps: DefaultProps;
};

type BaseViewConfig = {
  ref: undefined;
  memo: undefined;
  defaultProps: {};
};

type Fn = (...args: any[]) => any;

type ViewBuilder<
  Props,
  AccProps,
  Plugins extends Record<string, IPlugin<any>>,
  Methods = {},
  Config extends ViewConfig<{}> = BaseViewConfig
> = {
  ref: () => ViewBuilder<Props, AccProps, Plugins, Methods, Config>;

  memo: () => ViewBuilder<Props, AccProps, Plugins, Methods, Config>;

  map: () => ViewBuilder<Props, AccProps, Plugins, Methods, Config>;

  defaultProps: <DefaultProps extends Partial<Props>>(
    props: DefaultProps
  ) => ViewBuilder<
    Props,
    AccProps,
    Plugins,
    Methods,
    Omit<Config, 'defaultProps'> & { defaultProps: DefaultProps }
  >;

  view: () => ComponentType;
} & {
  [P in keyof Plugins]: Plugins[P]['inputType'] extends object
    ? (
        params: Plugins[P]['inputType']
      ) => ViewBuilder<Props, AccProps, Plugins, Methods, Config>
    : Plugins[P]['inputType'] extends Fn
    ? <T>(
        fn: (props: Omit<Props, keyof AccProps> & AccProps, meta: {}) => T
      ) => ViewBuilder<Props, AccProps, Plugins, Methods, Config>
    : () => ViewBuilder<Props, AccProps, Plugins, Methods, Config>;
};

type PluginMethod<Plugins> = <Plugin extends IPlugin<any>, Name extends string>(
  plugin: Plugin,
  name: Name
) => FactoryBuilder<
  Plugins & {
    [key in Name]: Plugin;
  }
>;

type FactoryBuilder<Plugins extends Record<string, IPlugin<any>>> = {
  plugin: PluginMethod<Plugins>;

  bake: () => <Props = {}>() => ViewBuilder<Props, {}, Plugins>;
};

const createFactory: () => FactoryBuilder<{}> = null!;

const createView = createFactory()
  .plugin(new TFunctionPlugin(), 't')

  .plugin(new UnitsPlugin(), 'units')

  .plugin(new FactorioPlugin<{ useModel: () => { $$ui: any } }>(), 'model')

  .bake();

const Input = createView<{ id: string; label: string; disabled: boolean }>()
  .defaultProps({ disabled: false })

  .t()

  .ref()

  .memo()

  .units()

  .map()

  .view();

// [P in keyof Methods]: Methods[P] extends void
//   ? () => ViewBuilder<Props, Methods, Config>
//   : Methods[P] extends object
//   ? (payload: Methods[P]) => ViewBuilder<Props, Methods, Config>
//   : Methods[P] extends (props: any, meta: any) => any
//   ? (props: any, meta: any) => ViewBuilder<Props, Methods, Config>
//   : () => ViewBuilder<Props, Methods, Config>;
