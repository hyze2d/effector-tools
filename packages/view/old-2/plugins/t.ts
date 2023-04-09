import type { i18n } from 'i18next';

import { useTranslation } from 'react-i18next';

import type { IPlugin } from '../plugin';

type Params = {
  i18n: i18n | void;
};

class TFunctionPlugin<Input = void> implements IPlugin<Input> {
  public constructor(private readonly params?: Params) {}

  public readonly inputType!: Input;

  public process(_: Input) {
    return this.params?.i18n ?? useTranslation().t;
  }
}

export { TFunctionPlugin };
