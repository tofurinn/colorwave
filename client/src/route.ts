import createHomePage from './pages/index/home/home';
import createParticipantListPage from './pages/Admin/ParticipationList/ParticipantList';
import createMultiStepForm from './pages/registration/multi-step-form';
import createAboutPage from './pages/index/about/about';
import createRaceInfoPage from './pages/index/race-info/race-info';
import createTermsPage from './pages/index/terms/terms';

interface RouteDefinition {
    path: string;
    title: string;
    render: () => HTMLElement;
}

const routes: RouteDefinition[] = [
    {
        path: '/',
        title: 'Colorwave Home',
        render: () => createHomePage(navigate),
    },
    {
        path: '/about',
        title: 'About Us',
        render: () => createAboutPage(navigate),
    },
    {
        path: '/race-info',
        title: 'Race Info',
        render: () => createRaceInfoPage(navigate),
    },
    {
        path: '/terms',
        title: 'Terms & Conditions',
        render: () => createTermsPage(navigate),
    },
    {
        path: '/preview/registration',
        title: 'Registration Preview',
        render: () => createMultiStepForm(),
    },
    {
        path: '/registration',
        title: 'Registration Preview',
        render: () => createMultiStepForm(),
    },
    {
        path: '/ParticipantList',
        title: 'Participant List',
        render: () => createParticipantListPage(navigate),
    },
];

function normalizePath(path: string): string {
    const trimmed = path.trim();
    if (!trimmed || trimmed === '/') {
        return '/';
    }

    return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

function matchRoute(path: string): RouteDefinition {
    const normalizedPath = normalizePath(path);
    return routes.find((route) => route.path === normalizedPath) ?? routes[0];
}

export function renderRoute(path = window.location.pathname): HTMLElement {
    const route = matchRoute(path);
    document.title = route.title;
    return route.render();
}

export function navigate(path: string): void {
    const normalizedPath = normalizePath(path);
    window.history.pushState({}, '', normalizedPath);
    renderIntoApp(normalizedPath);
}

export function initRouter(container: HTMLElement): void {
    const render = () => {
        container.replaceChildren(renderRoute(window.location.pathname));
    };

    window.addEventListener('popstate', render);
    render();
}

export function renderIntoApp(path: string): void {
    const app = document.querySelector<HTMLElement>('#app');
    if (!app) {
        return;
    }

    app.replaceChildren(renderRoute(path));
}
