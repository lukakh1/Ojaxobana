import React, { useState } from 'react';
import { Provider, createStore } from 'aniuta';

const DataStore = createStore({
  name: 'DataStore',
  Store: () => {
    const [patarebisData, setpatarebisData] = useState();

    return { patarebisData, setpatarebisData };
  },
});

export default DataStore;
