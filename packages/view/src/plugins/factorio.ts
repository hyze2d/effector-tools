import { FactoryPlugin } from '../plugin';

type FactorioModel = {
  useModel: () => any;
};

class FactorioPlugin<Input extends FactorioModel> extends FactoryPlugin<Input> {
  public constructor() {
    super();
  }

  public override meta(input: Input) {
    return {
      $$model: input.useModel()
    };
  }
}

export { FactorioPlugin };
