type PluginResult<Props = any, Meta = any> = {
  meta: Meta;
  props: Props;
};

abstract class SelectorPlugin<Params> {
  public abstract process(params: Params, props: any, meta: any): PluginResult;
}

abstract class ConfigPlugin<Params> {
  public abstract process(params: Params, props: any, meta: any): PluginResult;
}

type AnyPlugin = SelectorPlugin<any> | ConfigPlugin<any>;

export { SelectorPlugin, ConfigPlugin };

export type { AnyPlugin, PluginResult };
