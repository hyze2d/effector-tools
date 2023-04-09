/* eslint-disable @typescript-eslint/ban-types */
import { ViewBuilder } from './builder';

function createView<P = {}>() {
  return new ViewBuilder<P>();
}

export { createView };
