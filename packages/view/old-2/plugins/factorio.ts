import type { IPlugin } from '../plugin';

type FactorioModel = {
  useModel: () => any;
};

class FactorioPlugin<Input extends FactorioModel> implements IPlugin<Input> {
  public readonly inputType!: Input;

  public process(input: Input) {
    return {
      meta: {
        $$model: input.useModel()
      }
    };
  }
}

export { FactorioPlugin };
