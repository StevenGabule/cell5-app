import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PersonCreate from './persons/create.person';
import PersonEdit from './persons/edit.person';
import PersonIndex from './persons/index.person';

function App() {
  return (
    <>
      <BrowserRouter>
        <Route path='/' exact component={PersonIndex} />
        <Route path='/create' exact component={PersonCreate} />
        <Route path='/:id/edit' exact component={PersonEdit} />
      </BrowserRouter>
    </>
  );
}

export default App;
