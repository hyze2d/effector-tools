import { createView } from '@effector-tools/view';

import { createEvent, createStore } from 'effector';

import { useUnit } from 'effector-react';

import { modelFactory, modelView } from 'effector-factorio';

const ViewModelExample = modelFactory(() => {
  const $value = createStore('Example');

  const changed = createEvent<string>();

  return {
    $$ui: {
      $value,
      changed
    }
  };
});

const $$viewModelExample = ViewModelExample.createModel();

const ViewExample = createView<{ id: string }>({ t: true })
  .model(ViewModelExample)

  .map((_, $$model) =>
    useUnit({
      value: $$model.$value,

      onChange: $$model.changed
    })
  )

  .view(() => <div>Example</div>);

const ViewModelViewExample = modelView(ViewModelExample, () => (
  <div>
    <h1>View Model View Example</h1>

    <ViewExample id='123' />
  </div>
));

export { ViewModelViewExample, $$viewModelExample };
