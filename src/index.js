import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Search from './Component/Search.js';
import Gallery from './Component/Gallery.js';

ReactDOM.render(
    <BrowserRouter>
        <Routes path='/'>
            <Route index element={<Search />} />
            <Route path='/Gallery' element={<Gallery />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById("root")
);