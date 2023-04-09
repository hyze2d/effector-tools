import { StrictMode } from 'react';

import * as ReactDOM from 'react-dom/client';

import { ViewModelViewExample, $$viewModelExample } from './view';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <ViewModelViewExample model={$$viewModelExample} />
  </StrictMode>
);
