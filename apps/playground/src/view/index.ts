import { createFactory } from '@effector-tools/view';

import { FactorioPlugin } from '@effector-tools/view/plugins/factorio';

import { TFunctionPlugin } from '@effector-tools/view/plugins/t';

import { UnitsPlugin } from '@effector-tools/view/plugins/units';

const factorio = new FactorioPlugin<{
  useModel: (...args: any) => {
    $$ui: any;
  };
}>();

const tplugin = new TFunctionPlugin();

const units = new UnitsPlugin();

const createView = createFactory()
  .plugin(factorio, 'model')

  .plugin(units, 'units')

  .plugin(tplugin, 't')

  .bake();
