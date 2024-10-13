import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { CombinedApiProvider } from './utils/CombinedApiContext';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <CombinedApiProvider>
            <App />
        </CombinedApiProvider>
    </BrowserRouter>
);
