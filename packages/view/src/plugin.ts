const EMPTY_META = {};

const EMPTY_PROPS = {};

abstract class FactoryPlugin<Input> {
  public meta(props: any) {
    return EMPTY_META;
  }

  public props(input: Input, props: any, meta: any) {
    return EMPTY_PROPS;
  }
}

export { FactoryPlugin };
