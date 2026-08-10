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
            <a href="/about" data-nav>About Us</a>
            <a href="/race-info" data-nav>Race Info</a>
            <a href="/terms" data-nav>Terms & Conditions</a>
        </nav>
    `;

    header.querySelectorAll<HTMLAnchorElement>('a[data-nav]').forEach((link) => {
        const href = link.getAttribute('href');
        if (!href) {
            return;
        }

        link.addEventListener('click', (event) => {
            event.preventDefault();
            onNavigate(href);
        });

        if (href === activePath) {
            link.classList.add('active');
        }
    });

    return header;
}
