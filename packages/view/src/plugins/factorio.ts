import { ConfigPlugin } from '../plugin';

class FactorioPlugin<
  T extends { useModel: () => any }
> extends ConfigPlugin<T> {
  public override process(params: T) {
    return {
      props: {},

      meta: {
        $$model: params.useModel()
      }
    };
  }
}

export { FactorioPlugin };
