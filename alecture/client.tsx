import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './layouts/App';

render(<BrowserRouter><App /></BrowserRouter>, document.querySelector('#app'));

// 폴더 구조
// pages - 페이지 진입점
// components - 공통된 컴포넌트
// layouts - 페이지의 공통 레이아웃