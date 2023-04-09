type PluginResult<Props = any, Meta = any> = {
  meta: Meta;

  props: Props;
};

type IPlugin<Params = any, Props = any, Meta = any> = (
  params: Params,
  props: any,
  meta: any
) => PluginResult<Props, Meta>;

export type { IPlugin, PluginResult };
