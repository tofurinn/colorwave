export type NavigateCallback = (path: string) => void;

export function createNavbar(activePath: string, onNavigate: NavigateCallback): HTMLElement {
    const header = document.createElement('header');
    header.className = 'site-header';
    header.innerHTML = `
        <div class="site-branding">
            <a href="/" data-nav class="brand">Colorwave</a>
        </div>
        <nav class="site-nav">
            <a href="/" data-nav>Home</a>
            <div class="nav-dropdown ${['/about', '/race-info', '/terms'].includes(activePath) ? 'active' : ''}">
                <button class="nav-dropdown-toggle" type="button" aria-expanded="false">About Us</button>
                <div class="nav-dropdown-menu">
                    <a href="/about" data-nav>About</a>
                    <a href="/race-info" data-nav>Race Info</a>
                    <a href="/terms" data-nav>Terms & Conditions</a>
                </div>
            </div>
            <a href="/registration" data-nav>Registration</a>
        </nav>
    `;

    const dropdown = header.querySelector<HTMLElement>('.nav-dropdown');
    const toggle = header.querySelector<HTMLButtonElement>('.nav-dropdown-toggle');

    toggle?.addEventListener('click', () => {
        const isOpen = dropdown?.classList.toggle('open');
        if (toggle) {
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }
    });

    header.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (!dropdown?.contains(target)) {
            dropdown?.classList.remove('open');
            toggle?.setAttribute('aria-expanded', 'false');
        }
    });

    header.querySelectorAll<HTMLAnchorElement>('a[data-nav]').forEach((link) => {
        const href = link.getAttribute('href');
        if (!href) {
            return;
        }

        link.addEventListener('click', (event) => {
            event.preventDefault();
            onNavigate(href);
            dropdown?.classList.remove('open');
            toggle?.setAttribute('aria-expanded', 'false');
        });

        if (href === activePath) {
            link.classList.add('active');
        }
    });

    return header;
}
