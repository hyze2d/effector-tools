/* eslint-disable @typescript-eslint/ban-types */
import type { ComponentType } from 'react';

import type { FactoryPlugin } from './plugin';

import { TFunctionPlugin } from './plugins/t';

import { UnitsPlugin } from './plugins/units';

import { FactorioPlugin } from './plugins/factorio';

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

type ViewBuilder<
  Props,
  Methods,
  Config extends ViewConfig<{}> = BaseViewConfig
> = {
  ref: () => ViewBuilder<Props, Methods, Config>;

  memo: () => ViewBuilder<Props, Methods, Config>;

  map: () => ViewBuilder<Props, Methods, Config>;

  defaultProps: <DefaultProps extends Partial<Props>>(
    props: DefaultProps
  ) => ViewBuilder<
    Props,
    Methods,
    Omit<Config, 'defaultProps'> & { defaultProps: DefaultProps }
  >;

  view: () => ComponentType;
} & {
  [P in keyof Methods]: Methods[P] extends void
    ? () => ViewBuilder<Props, Methods, Config>
    : Methods[P] extends object
    ? (payload: Methods[P]) => ViewBuilder<Props, Methods, Config>
    : Methods[P] extends (props: any, meta: any) => any
    ? (props: any, meta: any) => ViewBuilder<Props, Methods, Config>
    : () => ViewBuilder<Props, Methods, Config>;
};

type PluginMethod<Methods> = <
  Input,
  Plugin extends FactoryPlugin<Input>,
  Name extends string
>(
  plugin: Plugin,
  name: Name
) => FactoryBuilder<
  Methods & {
    [key in Name]: Input;
  }
>;

type FactoryBuilder<Methods> = {
  plugin: PluginMethod<Methods>;

  bake: () => <Props = {}>() => ViewBuilder<Props, Methods>;
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
