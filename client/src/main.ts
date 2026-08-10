import './style.css';
import { initRouter } from './route';

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
    initRouter(app);
}
