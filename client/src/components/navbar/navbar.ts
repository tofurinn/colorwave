import logoUrl from './logo.PNG';
import './navbar.css';

export type NavigateCallback = (path: string) => void;

export function createNavbar(activePath: string, onNavigate: NavigateCallback): HTMLElement {
    const isAboutActive = ['/about', '/race-info', '/terms'].includes(activePath);

    const header = document.createElement('header');
    header.className = 'site-header';
    header.innerHTML = `
        <div class="site-branding">
            <a href="/" data-nav class="brand">
                <img src="${logoUrl}" class="navbar-logo" alt="ColorWave 2026 Logo" />
                ColorWave 2026
            </a>
        </div>
        <nav class="site-nav">
            <a href="/" data-nav ${activePath === '/' ? 'class="active"' : ''}>Home</a>
            <div class="nav-dropdown ${isAboutActive ? 'active' : ''}">
                <button class="nav-dropdown-toggle" type="button" aria-expanded="false">About Us</button>
                <div class="nav-dropdown-menu">
                    <a href="/about" data-nav ${activePath === '/about' ? 'class="active"' : ''}>About</a>
                    <a href="/race-info" data-nav ${activePath === '/race-info' ? 'class="active"' : ''}>Race Info</a>
                    <a href="/terms" data-nav ${activePath === '/terms' ? 'class="active"' : ''}>Terms & Conditions</a>
                </div>
            </div>
            <a href="/registration" data-nav ${activePath === '/registration' ? 'class="active"' : ''}>Registration</a>
        </nav>
    `;

    const dropdown = header.querySelector<HTMLElement>('.nav-dropdown');
    const toggle = header.querySelector<HTMLButtonElement>('.nav-dropdown-toggle');
    const allNavLinks = header.querySelectorAll<HTMLAnchorElement>('a[data-nav]');

    // Dropdown toggle
    toggle?.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown?.classList.toggle('open');
        if (toggle) {
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }
    });

    // Close on outside click
    document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (!header.contains(target)) {
            dropdown?.classList.remove('open');
            toggle?.setAttribute('aria-expanded', 'false');
        }
    });

    // Link click navigation
    allNavLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (!href) return;

        link.addEventListener('click', (event) => {
            event.preventDefault();
            dropdown?.classList.remove('open');
            toggle?.setAttribute('aria-expanded', 'false');
            onNavigate(href);
        });
    });

    return header;
}