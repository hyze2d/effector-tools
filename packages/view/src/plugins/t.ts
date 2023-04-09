import { useTranslation } from 'react-i18next';

import { ConfigPlugin } from '../plugin';

class TFunctionPlugin<T = void> extends ConfigPlugin<T> {
  public override process(_: T) {
    return {
      props: {
        t: useTranslation().t
      },

      meta: {}
    };
  }
}

export { TFunctionPlugin };
