import './ParticipantList.css';

// ---- Data -----------------------------------------------------------------
// Replace this with a real data source (API fetch, etc.) later.
// This single file combines every "admin page" (Participants, Transaction,
// Attendance) into one component. Navigation between them is handled purely
// client-side by toggling which <section class="view"> is visible — no full
// page reload / router change is required.

interface Participant {
  id: string;
  name: string;
  university: string;
  registrationDate: string;
  status: string;
}

interface TransactionRecord {
  participantId: string;
  participantName: string;
  receiptUploaded: boolean;
  actualAmountPaid: number; // amount confirmed against the bank statement
  tally: boolean; // true = amount paid matches the expected registration fee
}

interface AttendanceRecord {
  participantId: string;
  participantName: string;
  attended: boolean;
  goodiesCollected: boolean;
}

const participants: Participant[] = [
  {
    id: 'P-001',
    name: 'Aiman Haziq bin Rosli',
    university: 'Universiti Teknologi Malaysia',
    registrationDate: '12 Jul 2026',
    status: 'Confirmed',
  },
  {
    id: 'P-002',
    name: 'Nur Aisyah binti Kamal',
    university: 'Universiti Putra Malaysia',
    registrationDate: '13 Jul 2026',
    status: 'Confirmed',
  },
  {
    id: 'P-003',
    name: 'Kevin Tan Wei Jie',
    university: 'Universiti Malaya',
    registrationDate: '14 Jul 2026',
    status: 'Pending',
  },
];

const transactions: TransactionRecord[] = [
  {
    participantId: 'P-001',
    participantName: 'Aiman Haziq bin Rosli',
    receiptUploaded: true,
    actualAmountPaid: 45.0,
    tally: true,
  },
  {
    participantId: 'P-002',
    participantName: 'Nur Aisyah binti Kamal',
    receiptUploaded: true,
    actualAmountPaid: 40.0,
    tally: false,
  },
  {
    participantId: 'P-003',
    participantName: 'Kevin Tan Wei Jie',
    receiptUploaded: false,
    actualAmountPaid: 0,
    tally: false,
  },
];

const attendanceRecords: AttendanceRecord[] = [
  {
    participantId: 'P-001',
    participantName: 'Aiman Haziq bin Rosli',
    attended: true,
    goodiesCollected: true,
  },
  {
    participantId: 'P-002',
    participantName: 'Nur Aisyah binti Kamal',
    attended: false,
    goodiesCollected: false,
  },
  {
    participantId: 'P-003',
    participantName: 'Kevin Tan Wei Jie',
    attended: true,
    goodiesCollected: false,
  },
];

// ---- Formatting helpers -----------------------------------------------------

function formatCurrency(amount: number): string {
  return `RM ${amount.toFixed(2)}`;
}

// ---- Render: Participants ---------------------------------------------------

function renderParticipants(list: Participant[], container: HTMLElement): void {
  const tableBody = container.querySelector<HTMLTableSectionElement>('#participantsTableBody');
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

  attachParticipantRowClickHandlers(container);
}

// Redirects to the participant detail page when a row is clicked.
function attachParticipantRowClickHandlers(container: HTMLElement): void {
  container.querySelectorAll<HTMLTableRowElement>('#participantsTableBody tr').forEach((row) => {
    row.addEventListener('click', () => {
      window.location.href = 'ParticipantDetail.html';
    });
  });
}

// ---- Render: Transaction -----------------------------------------------------
// Shows the payment/receipt history for every registered participant, with a
// "tally" checkbox admins can toggle to confirm the receipt matches the
// actual amount that landed in the bank account.

function renderTransactions(list: TransactionRecord[], container: HTMLElement): void {
  const tableBody = container.querySelector<HTMLTableSectionElement>('#transactionTableBody');
  if (!tableBody) return;

  tableBody.innerHTML = '';

  list.forEach((transaction, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${transaction.participantName}</td>
      <td class="id-cell">${transaction.participantId}</td>
      <td>
        <span class="badge ${transaction.receiptUploaded ? 'badge-accent' : 'badge-danger'}">
          ${transaction.receiptUploaded ? 'Uploaded' : 'Missing'}
        </span>
      </td>
      <td class="mono-cell">${formatCurrency(transaction.actualAmountPaid)}</td>
      <td class="checkbox-cell">
        <input type="checkbox" class="tally-checkbox" data-index="${index}" ${transaction.tally ? 'checked' : ''} />
      </td>
    `;
    tableBody.appendChild(row);
  });

  container.querySelectorAll<HTMLInputElement>('.tally-checkbox').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const index = Number(checkbox.dataset.index);
      const record = transactions[index];
      if (record) {
        record.tally = checkbox.checked;
      }
    });
  });
}

// ---- Render: Attendance -------------------------------------------------------
// Lets admins mark each participant as present on race day and confirm
// whether they collected their event goodies.

function renderAttendance(list: AttendanceRecord[], container: HTMLElement): void {
  const tableBody = container.querySelector<HTMLTableSectionElement>('#attendanceTableBody');
  if (!tableBody) return;

  tableBody.innerHTML = '';

  list.forEach((record, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="id-cell">${record.participantId}</td>
      <td>${record.participantName}</td>
      <td class="checkbox-cell">
        <input type="checkbox" class="attendance-checkbox" data-index="${index}" ${record.attended ? 'checked' : ''} />
      </td>
      <td class="checkbox-cell">
        <input type="checkbox" class="goodies-checkbox" data-index="${index}" ${record.goodiesCollected ? 'checked' : ''} />
      </td>
    `;
    tableBody.appendChild(row);
  });

  container.querySelectorAll<HTMLInputElement>('.attendance-checkbox').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const index = Number(checkbox.dataset.index);
      const record = attendanceRecords[index];
      if (record) {
        record.attended = checkbox.checked;
      }
    });
  });

  container.querySelectorAll<HTMLInputElement>('.goodies-checkbox').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const index = Number(checkbox.dataset.index);
      const record = attendanceRecords[index];
      if (record) {
        record.goodiesCollected = checkbox.checked;
      }
    });
  });
}

// ---- View switching -----------------------------------------------------------
// Combines every admin page into this single component: instead of routing to
// separate files, the sidebar just toggles which <section class="view"> is
// visible.

type ViewName = 'participants' | 'transaction' | 'attendance';

function setActiveView(container: HTMLElement, view: ViewName): void {
  container.querySelectorAll<HTMLElement>('.view').forEach((section) => {
    section.classList.toggle('active', section.dataset.view === view);
  });

  container.querySelectorAll<HTMLAnchorElement>('.nav-item[data-view]').forEach((link) => {
    link.classList.toggle('active', link.dataset.view === view);
  });
}

// ---- Page markup ------------------------------------------------------------
// Builds the whole app shell (sidebar, topbar, table) and returns it as an
// HTMLElement so the SPA router can mount it inside #app.

export default function createAdminPage(): HTMLElement {
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
        <a class="nav-item" href="#" data-view="transaction"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 7v10l9 4 9-4V7"/></svg>Transaction</a>
        <a class="nav-item active" href="#" data-view="participants"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a8 8 0 0116 0v1"/></svg>List of Participants</a>
        <a class="nav-item" href="#" data-view="attendance"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>Attendance</a>
      </nav>
    </aside>

    <!-- ===================== MAIN ===================== -->
    <main class="main">

      <!-- ===================== PARTICIPANTS VIEW ===================== -->
      <section class="view active" data-view="participants">
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
            <tbody id="participantsTableBody"></tbody>
          </table>
          <div class="table-footer">
            <span>${participants.length} participants total</span>
            <div class="page-btns">
              <button>‹</button>
              <button>1</button>
              <button>2</button>
              <button>›</button>
            </div>
          </div>
        </div>
      </section>

      <!-- ===================== TRANSACTION VIEW ===================== -->
      <section class="view" data-view="transaction">
        <div class="topbar">
          <div>
            <h1>Transaction History</h1>
            <div class="sub">Payment receipts and bank tally per participant</div>
          </div>
          <div class="topbar-actions">
            <div class="search-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
              <input type="text" placeholder="Search by participant name or ID…">
            </div>
          </div>
        </div>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Participant Name</th>
                <th>Participant ID</th>
                <th>Receipt Uploaded</th>
                <th>Actual Amount Paid (Bank)</th>
                <th>Tally</th>
              </tr>
            </thead>
            <tbody id="transactionTableBody"></tbody>
          </table>
          <div class="table-footer">
            <span>${transactions.length} transactions total</span>
            <div class="page-btns">
              <button>‹</button>
              <button>1</button>
              <button>›</button>
            </div>
          </div>
        </div>
      </section>

      <!-- ===================== ATTENDANCE VIEW ===================== -->
      <section class="view" data-view="attendance">
        <div class="topbar">
          <div>
            <h1>Attendance</h1>
            <div class="sub">Race-day check-in and goodies collection</div>
          </div>
          <div class="topbar-actions">
            <div class="search-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
              <input type="text" placeholder="Search by participant name or ID…">
            </div>
          </div>
        </div>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Participant ID</th>
                <th>Student Name</th>
                <th>Attendance</th>
                <th>Goodies Collected</th>
              </tr>
            </thead>
            <tbody id="attendanceTableBody"></tbody>
          </table>
          <div class="table-footer">
            <span>${attendanceRecords.length} participants total</span>
            <div class="page-btns">
              <button>‹</button>
              <button>1</button>
              <button>›</button>
            </div>
          </div>
        </div>
      </section>

    </main>
  `;

  // Sidebar links that carry a data-view attribute switch sections in place
  // (this is what "combines all admin pages into one file" means in practice).
  container.querySelectorAll<HTMLAnchorElement>('.nav-item[data-view]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const view = link.dataset.view as ViewName | undefined;
      if (view) {
        setActiveView(container, view);
      }
    });
  });

  renderParticipants(participants, container);
  renderTransactions(transactions, container);
  renderAttendance(attendanceRecords, container);

  return container;
}
