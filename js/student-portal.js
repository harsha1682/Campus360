    /* ==========================================================
       1. PER-VIEW HEADER COPY
       [eyebrow, heading (may include HTML), description]
    ========================================================== */
    const copy = {
      dashboard: [
        'Student portal · Tuesday, 8 September',
        'A good day starts with<br>the next small thing.',
        'Your campus dashboard keeps classes, progress, support and the notices that shape your day in one calm place.'
      ],
      timetable: [
        'Student portal · Weekly plan',
        'Time, made visible.',
        'See the full week without turning the dashboard into one long page.'
      ],
      attendance: [
        'Student portal · Academic standing',
        'Keep your week in balance.',
        'Clear subject-level progress makes it easier to act before attendance becomes a problem.'
      ],
      calendar: [
        'Student portal · Important dates',
        'The dates that matter.',
        'Classes, cultural events and assessments in one academic calendar.'
      ],
      results: [
        'Student portal · Progress',
        'Marks, then the next move.',
        'Turn the latest assessment into a focused study plan.'
      ],
      syllabus: [
        'Student portal · Course map',
        'Know what comes next.',
        'A calm unit-by-unit frame for the topics behind each course.'
      ],
      clubs: [
        'Student portal · Communities',
        'Find your people, make things.',
        'Your memberships are front and centre; their settings stay one step deeper.'
      ],
      'club-settings': [
        'Student portal · Clubs · Settings',
        'Make club life work for you.',
        'This separate utility view keeps preferences out of the main sidebar.'
      ],
      support: [
        'Student portal · Support',
        'A ticket is better than a dead end.',
        'Help requests and feedback belong together, but do different jobs.'
      ],
      safety: [
        'Student portal · Safety',
        'Safety comes first.',
        'Use this protected space to find the next right step.'
      ]
    };

    /* ==========================================================
       2. DOM REFERENCES
    ========================================================== */
    const nav = [...document.querySelectorAll('[data-view]')];
    const views = [...document.querySelectorAll('.view')];

    const eyebrow = document.querySelector('#eyebrow');
    const heading = document.querySelector('#heading');
    const description = document.querySelector('#description');
    const bell = document.querySelector('#bell');
    const notifications = document.querySelector('#notifications');

    /* ==========================================================
       3. VIEW SWITCHING
    ========================================================== */
    function closeNotes() {
      notifications.hidden = true;
      bell.setAttribute('aria-expanded', 'false');
    }

    function show(name) {
      if (!copy[name]) return;

      views.forEach(v => v.classList.toggle('active', v.dataset.page === name));
      nav.forEach(b => b.classList.toggle('active', b.dataset.view === name));

      eyebrow.textContent = copy[name][0];
      heading.innerHTML = copy[name][1];
      description.textContent = copy[name][2];

      document.title = 'Campus360 | ' + (name === 'club-settings'
        ? 'Club settings'
        : name[0].toUpperCase() + name.slice(1));

      window.scrollTo({ top: 0, behavior: 'smooth' });
      closeNotes();
    }

    nav.forEach(b => b.addEventListener('click', () => show(b.dataset.view)));
    document.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => show(b.dataset.go)));

    /* ==========================================================
       4. NOTIFICATIONS POPOVER
    ========================================================== */
    bell.addEventListener('click', e => {
      e.stopPropagation();
      notifications.hidden = !notifications.hidden;
      bell.setAttribute('aria-expanded', String(!notifications.hidden));
    });

    document.querySelector('#openNotifications').addEventListener('click', () => {
      notifications.hidden = false;
      bell.setAttribute('aria-expanded', 'true');
      bell.focus();
    });

    document.querySelector('#markRead').addEventListener('click', () => {
      document.querySelector('#count').hidden = true;
      document.querySelector('#markRead').textContent = 'All caught up';
    });

    document.addEventListener('click', e => {
      if (!e.target.closest('.actions')) closeNotes();
    });

    /* ==========================================================
       5. FORM SUBMISSION (demo-only — no backend)
    ========================================================== */
    function wire(id, status, message) {
      document.querySelector('#' + id).addEventListener('submit', e => {
        e.preventDefault();
        if (!e.currentTarget.checkValidity()) return;
        e.currentTarget.reset();
        document.querySelector('#' + status).textContent = message;
      });
    }

    wire('ticketForm', 'ticketStatus', 'Ticket submitted. You will receive updates in Notifications.');
    wire('feedbackForm', 'feedbackStatus', 'Thank you — your feedback has been shared.');
    wire('safetyForm', 'safetyStatus', 'Support request saved. In production, route this to a secure, staffed service.');
    wire('clubForm', 'clubStatus', 'Club notification preferences saved.');

    /* ==========================================================
       6. INLINE "COMING SOON" MESSAGES (data-message buttons)
    ========================================================== */
    document.querySelectorAll('[data-message]').forEach(b => {
      b.addEventListener('click', () => description.textContent = b.dataset.message);
    });
  
