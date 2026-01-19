import {createRoot} from 'react-dom/client'
import './index.css'
import {App} from './app/ui/App.tsx'
import {Provider} from "react-redux";
import {store} from "./app/model/store.ts";
import {BrowserRouter} from "react-router";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
)
