import type { NavigateCallback } from '../../../components/navbar/navbar';
import './ParticipantList.css';

// ---- Data -----------------------------------------------------------------
// Replace this with a real data source (API fetch, etc.) later.

interface Participant {
  id: string;
  name: string;
  university: string;
  registrationDate: string;
  status: string;
}

const participants: Participant[] = [
  {
    id: 'P-001',
    name: 'Aiman Haziq bin Rosli',
    university: 'Universiti Teknologi Malaysia',
    registrationDate: '12 Jul 2026',
    status: 'Confirmed',
  },
];

// ---- Render -----------------------------------------------------------------

function renderParticipants(list: Participant[], container: HTMLElement): void {
  const tableBody = container.querySelector<HTMLTableSectionElement>('#tableBody');
  if (!tableBody) return;

  tableBody.innerHTML = '';

  list.forEach((participant) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="id-cell">${participant.id}</td>
      <td>${participant.name}</td>
      <td>${participant.university}</td>
      <td>${participant.registrationDate}</td>
      <td>${participant.status}</td>
    `;
    tableBody.appendChild(row);
  });

  attachRowClickHandlers(container);
}

// ---- Interaction ------------------------------------------------------------
// Redirects to the participant detail page when a row is clicked.

function attachRowClickHandlers(container: HTMLElement): void {
  container.querySelectorAll<HTMLTableRowElement>('#tableBody tr').forEach((row) => {
    row.addEventListener('click', () => {
      window.location.href = 'ParticipantDetail.html';
    });
  });
}

// ---- Page markup ------------------------------------------------------------
// Builds the whole app shell (sidebar, topbar, table) and returns it as an
// HTMLElement so the SPA router can mount it inside #app.

export default function createParticipantListPage(onNavigate: NavigateCallback): HTMLElement {
  const container = document.createElement('div');
  container.className = 'app';

  container.innerHTML = `
    <!-- ===================== SIDEBAR ===================== -->
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-brand">
        <div class="brand-mark">
          <!--the logo-->
        </div>
        <div>
          <div class="brand-name">ColourWave</div>
          <div class="brand-sub">ADMIN CONSOLE</div>
        </div>
      </div>

      <nav class="sidebar-nav">
        <a class="nav-item" href="/Overview"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>Overview</a>
        <a class="nav-item" href="/Transaction"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 7v10l9 4 9-4V7"/></svg>Transaction</a>
        <a class="nav-item active" href="/ParticipantList"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a8 8 0 0116 0v1"/></svg>List of Participants</a>
        <a class="nav-item" href="/Attendance"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 7v10l9 4 9-4V7"/></svg>Attendance</a>
      </nav>
    </aside>

    <!-- ===================== MAIN ===================== -->
    <main class="main">
      <div class="topbar">
        <div>
          <h1>List of Participants</h1>
        </div>
        <div class="topbar-actions">
          <div class="search-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
            <input type="text" placeholder="Search transaction, participant…">
          </div>
        </div>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Participant ID</th>
              <th>Student Name</th>
              <th>University Name</th>
              <th>Registration Date</th>
              <th>Registration Status</th>
            </tr>
          </thead>
          <tbody id="tableBody"></tbody>
        </table>
        <div class="table-footer">
          <span>use typecript later to show how many</span>
          <div class="page-btns">
            <button>‹</button>
            <button>1</button>
            <button>2</button>
            <button>›</button>
          </div>
        </div>
      </div>
    </main>
  `;

  // Route sidebar links through the SPA router instead of full page reloads.
  container.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      onNavigate(link.getAttribute('href') ?? '/');
    });
  });

  renderParticipants(participants, container);

  return container;
}
