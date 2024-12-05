import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import { APIProvider } from '@vis.gl/react-google-maps';
import { API_KEY } from 'Utils';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <APIProvider
    apiKey={API_KEY}
    onLoad={() => console.log('Maps API has loaded.')}
  >
    <Router>
      <App />
    </Router>
  </APIProvider>
);
