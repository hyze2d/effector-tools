import { FactoryPlugin } from '../plugin';

import type { i18n } from 'i18next';

import { useTranslation } from 'react-i18next';

type Params = {
  i18n: i18n | void;
};

class TFunctionPlugin extends FactoryPlugin<void> {
  public constructor(private readonly params: Params | void) {
    super();
  }

  public override props() {
    return this.params?.i18n ?? useTranslation().t;
  }
}

export { TFunctionPlugin };
