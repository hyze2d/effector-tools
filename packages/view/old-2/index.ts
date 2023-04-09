import type { FactoryPlugin } from './plugin';

type Config = {
  plugins: Record<string, FactoryPlugin<any>>;
};

const createFactory = () => {
  const config: Config = {
    plugins: {}
  };

  const builder = {
    plugin,
    bake
  };

  function plugin<Input, Plugin extends FactoryPlugin<Input>, T extends string>(
    plugin: Plugin,
    name: T
  ) {
    config.plugins[name] = plugin;

    return builder;
  }

  function bake() {}

  return {
    plugin,

    bake
  };
};

export { createFactory };
