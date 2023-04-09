/* eslint-disable @typescript-eslint/ban-types */
import { createEvent, createStore, sample } from 'effector';

import { modelFactory } from 'effector-factorio';

import { useUnit } from 'effector-react';

import type { TFunction } from 'i18next';

import type {
  ComponentType,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  MemoExoticComponent,
  RefAttributes
} from 'react';

type OmitUK<
  Props,
  MapResult,
  Model extends {} | null = null,
  DefaultProps = {},
  Config extends AccumulatedConfig<any, any, any> = AccumulatedConfig<
    undefined,
    undefined,
    undefined
  >,
  UsedKeys extends string = ''
> = Omit<ViewBuilder<Props, MapResult, Model, DefaultProps, Config>, UsedKeys>;

type UiModelFactory<T> = {
  createModel: (params: any) => {
    $$ui: T;
  };
};

type AccumulatedConfig<
  RefType extends any | undefined,
  T extends TFunction | undefined,
  IsMemo extends any | undefined
> = {
  t: T;
  refType: RefType;
  isMemo: IsMemo;
};

type RenderFunction<
  Props,
  Config extends AccumulatedConfig<any, any, any>
> = Config['refType'] extends undefined
  ? ComponentType<Props>
  : ForwardRefRenderFunction<Config['refType'], Props>;

type ResultComponent<
  Props,
  Config extends AccumulatedConfig<any, any, any>,
  ForwardedOrNot extends ComponentType<any> = Config['refType'] extends undefined
    ? ComponentType<Props>
    : ForwardRefExoticComponent<Props & RefAttributes<Config['refType']>>
> = Config['isMemo'] extends undefined
  ? ForwardedOrNot
  : MemoExoticComponent<ForwardedOrNot>;

class ViewBuilder<
  Props = {},
  MapResult = {},
  Model extends {} | null = null,
  DefaultProps = {},
  Config extends AccumulatedConfig<any, any, any> = AccumulatedConfig<
    undefined,
    undefined,
    undefined
  >,
  ConfigBasedProps = Config['t'] extends undefined ? {} : { t: TFunction }
> {
  private factory: UiModelFactory<Model> = null!;

  private shouldUseMemo = false;

  private shouldForwardRef = false;

  private useT = false;

  private _defaultProps = {} as DefaultProps;

  private hoc: (props: Props, $$model: Model) => MapResult = () =>
    ({} as MapResult);

  public defaultProps<D extends Partial<Props>>(
    defaultProps: D
  ): OmitUK<Props, MapResult, Model, D, Config, 'defaultProps'> {
    this._defaultProps = defaultProps as any;

    return this as any;
  }

  public model<UI extends {}>(
    factory: UiModelFactory<UI>
  ): OmitUK<
    Props,
    MapResult,
    UI,
    DefaultProps,
    Config,
    'model' | 'defaultProps'
  > {
    this.factory = factory as any;

    return this as any;
  }

  public t(): OmitUK<
    Props,
    MapResult,
    Model,
    DefaultProps,
    AccumulatedConfig<undefined, TFunction, undefined>,
    'model' | 'defaultProps' | 't'
  > {
    this.useT = true;

    return this as any;
  }

  public ref<RefType>(): OmitUK<
    Props,
    MapResult,
    Model,
    DefaultProps,
    AccumulatedConfig<RefType, Config['t'], undefined>,
    'model' | 'defaultProps' | 't' | 'ref'
  > {
    this.shouldForwardRef = true;

    return this as any;
  }

  public memo(): OmitUK<
    Props,
    MapResult,
    Model,
    DefaultProps,
    AccumulatedConfig<Config['refType'], Config['t'], true>,
    'model' | 'defaultProps' | 't' | 'ref' | 'memo'
  > {
    this.shouldUseMemo = true;

    return this as any;
  }

  public map<Result>(
    hoc: (props: Props & Config, $$model: Model) => Result = () =>
      ({} as Result)
  ): OmitUK<
    Props,
    Result,
    Model,
    DefaultProps,
    Config,
    'model' | 'defaultProps' | 't' | 'ref' | 'memo' | 'map'
  > {
    this.hoc = hoc as any;

    return this as any;
  }

  public view<
    CalculatedProps = Omit<Props, keyof MapResult> &
      MapResult &
      ConfigBasedProps,
    RawProps = Omit<Props, keyof MapResult> & MapResult & ConfigBasedProps
  >(
    View: RenderFunction<CalculatedProps, Config>
  ): ResultComponent<CalculatedProps, Config> & {
    Raw: ResultComponent<RawProps, Config>;
  } {
    let result: any;

    return result as any;
  }
}

function createView<P = {}>() {
  return new ViewBuilder<P>();
}

const ChangeValue = modelFactory(() => {
  const $value = createStore('');

  const changed = createEvent<string>();

  sample({
    clock: changed,

    target: $value
  });

  return {
    $$ui: {
      $value,
      changed
    }
  };
});

type InputProps = {
  name: string;
  label: string;
};

const Input = createView<InputProps>()
  .defaultProps({
    label: 'Kek'
  })

  .model(ChangeValue)

  .ref<HTMLInputElement>()

  .map(({ label, name }, $$model) => {
    const [value, onChange] = useUnit([$$model.$value, $$model.changed]);

    return {
      value,
      onChange
    };
  })

  .view(({ value, onChange, label }, ref) => (
    <div>
      {label && <label>{label}</label>}

      <input
        ref={ref}
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  ));

export { createView };
