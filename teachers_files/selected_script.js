(function() {
  // ===== ПОЛУЧАЕМ ПАРАМЕТРЫ ИЗ URL =====
  const params = new URLSearchParams(window.location.search);
  const teacher = params.get('teacher') || 'Грознов М.Д.';
  const subject = params.get('subject') || 'Математика';

  const teacherSpan = document.getElementById('selectedTeacher');
  const subjectSpan = document.getElementById('selectedSubject');
  if (teacherSpan) teacherSpan.textContent = teacher;
  if (subjectSpan) subjectSpan.textContent = subject;

  // ===== ДАННЫЕ ДЛЯ КАТЕГОРИЙ =====
  const subData = {
    oge: ['Об экзамене', 'Расписание', 'Домашние задания', 'Успеваемость', 'Группы'],
    ege: ['Об экзамене', 'Расписание', 'Домашние задания', 'Успеваемость', 'Группы']
  };

  // ===== СООТВЕТСТВИЕ МЕСЯЦЕВ =====
  const MONTHS = {
    '09': 'Сентябрь',
    '10': 'Октябрь',
    '11': 'Ноябрь',
    '12': 'Декабрь',
    '01': 'Январь',
    '02': 'Февраль',
    '03': 'Март',
    '04': 'Апрель',
    '05': 'Май'
  };

  const MONTH_ORDER = ['Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь', 'Январь', 'Февраль', 'Март', 'Апрель', 'Май'];

  // ===== ДАННЫЕ ГРУПП ПО ЭКЗАМЕНАМ =====
  const scheduleData = {
    'Грознов_МД_Информатика': {
      oge: [
        { name: 'ОГЭ (Среда-Пятница)', time: '15:30–17:00', file: 'schedule_oge_g1.txt' },
        { name: 'ОГЭ (Суббота)',       time: '11:00–14:15', file: 'schedule_oge_g2.txt' }
      ],
      ege: [
        { name: 'ЕГЭ (Вторник-Четверг)', time: '17:15–18:45', file: 'schedule_ege_g1.txt' },
        { name: 'ЕГЭ (Среда-Пятница)',   time: '19:00–20:30', file: 'schedule_ege_g2.txt' }
      ]
    },

    'Грознов_МД_Математика': {
      oge: [
        { name: 'ОГЭ (Вторник-Четверг)', time: '19:00–20:30', file: 'schedule_oge_g1.txt' },
        { name: 'ОГЭ (Среда-Пятница)',   time: '17:15–18:45', file: 'schedule_oge_g2.txt' },
        { name: 'ОГЭ (Суббота)',         time: '14:30–17:45', file: 'schedule_oge_g3.txt' }
      ],
      ege: []
    },

    'Козлов_ЕА_Математика': {
      oge: [
        { name: 'Группа 1', time: '—', file: 'schedule_oge_g1.txt' }
      ],
      ege: []
    },

    'Покровская_ВА_Русский_язык': {
      oge: [
        { name: 'ОГЭ Группа 1', time: '—', file: 'schedule_oge_g1.txt' }
      ],
      ege: [
        { name: 'ЕГЭ Группа 1', time: '—', file: 'schedule_ege_g1.txt' }
      ]
    },

    'Перников_ИА_Информатика': {
      oge: [],
      ege: [
        { name: 'ЕГЭ Группа 1', time: '—', file: 'schedule_ege_g1.txt' }
      ]
    }
  };

  // ===== ЭЛЕМЕНТЫ =====
  const navLinks = document.querySelectorAll('.nav-link[data-target]');
  const plainLinks = document.querySelectorAll('.nav-link.plain');
  const navSub = document.getElementById('navSub');
  const subContent = document.getElementById('subContent');

  const welcomeMsg = document.getElementById('welcomeMessage');
  const lessonContent = document.getElementById('lessonContent');
  const examContent = document.getElementById('examContent');
  const examDataContainer = document.getElementById('examData');
  const examTitle = document.getElementById('examTitle');
  const examSubtitle = document.getElementById('examSubtitle');

  const footerSpan = document.querySelector('.footer span');
  if (footerSpan) {
    footerSpan.textContent = '✦ ' + subject + ' ✦';
  }

  // ===== ТЕМЫ =====
  const themeId = params.get('theme');

  const comboThemes = {
    'Грознов_МД_Математика': {
      accent: '#d4a843',
      cardBg: '#2a241a',
      subBg: '#3a3228',
      pageBg: '#161210',
      text: '#f8f8ff',
      border: '#5a4a2a',
      shadow: '#0a0808'
    },
    'Грознов_МД_Информатика': {
      accent: '#e74c3c',
      cardBg: '#2a1a1a',
      subBg: '#3a2828',
      pageBg: '#160e0e',
      text: '#f8f8ff',
      border: '#5a2a2a',
      shadow: '#0a0606'
    },
    'Козлов_ЕА_Математика': {
      accent: '#69db7c',
      cardBg: '#1a2a1a',
      subBg: '#283a28',
      pageBg: '#101810',
      text: '#f0fff0',
      border: '#3a5a3a',
      shadow: '#060a06'
    },
    'Покровская_ВА_Русский_язык': {
      accent: '#a29bfe',
      cardBg: '#1a1a2a',
      subBg: '#28283a',
      pageBg: '#10101a',
      text: '#e8e8ff',
      border: '#4a4a6a',
      shadow: '#06060a'
    },
    'Перников_ИА_Информатика': {
      accent: '#f48fb1',
      cardBg: '#2a1420',
      subBg: '#3a1e2a',
      pageBg: '#1a0c12',
      text: '#f8e8ee',
      border: '#5a3242',
      shadow: '#0e060a'
    }
  };

  function applyTheme(themeId) {
    const theme = comboThemes[themeId];

    if (!theme) {
      document.documentElement.style.setProperty('--accent', '#555577');
      document.documentElement.style.setProperty('--card-bg', '#24243a');
      document.documentElement.style.setProperty('--sub-bg', '#2e2e4a');
      document.documentElement.style.setProperty('--page-bg', '#1a1a24');
      document.documentElement.style.setProperty('--text-primary', '#f8f8ff');
      document.documentElement.style.setProperty('--border-color', '#3a3a56');
      document.documentElement.style.setProperty('--shadow', '#0f0f18');
      return;
    }

    document.documentElement.style.setProperty('--accent', theme.accent);
    document.documentElement.style.setProperty('--card-bg', theme.cardBg);
    document.documentElement.style.setProperty('--sub-bg', theme.subBg);
    document.documentElement.style.setProperty('--page-bg', theme.pageBg);
    document.documentElement.style.setProperty('--text-primary', theme.text);
    document.documentElement.style.setProperty('--border-color', theme.border);
    document.documentElement.style.setProperty('--shadow', theme.shadow);
  }

  document.documentElement.style.transition = 'none';
  if (themeId) {
    applyTheme(themeId);
  } else {
    applyTheme(null);
  }
  setTimeout(function() {
    document.documentElement.style.transition = '';
  }, 50);

  // ===== ПЕРЕМЕННЫЕ СОСТОЯНИЯ =====
  let currentTarget = null;
  let currentCategory = null;
  let currentGroupIndex = -1;
  let currentMonth = null;
  let parsedSchedule = {};

  // ===== ПАРСИНГ TXT =====
  function parseScheduleText(text) {
    const result = {};
    const lines = text.split('\n');

    lines.forEach(line => {
      line = line.trim();
      if (!line) return;

      const parts = line.split(',').map(p => p.trim());
      if (parts.length < 3) return;

      const date = parts[0];
      const type = parts[1];
      const topic = parts.slice(2).join(', ');

      const monthNum = date.split('.')[1];
      const monthName = MONTHS[monthNum];
      if (!monthName) return;

      if (!result[monthName]) result[monthName] = [];
      result[monthName].push({ date, type, topic });
    });

    return result;
  }

  // ===== ЗАГРУЗКА TXT =====
  async function loadScheduleFile(fileName) {
  try {
    // Добавляем timestamp, чтобы обойти кэш
    const response = await fetch(fileName + '?t=' + Date.now());
    if (!response.ok) throw new Error('Файл не найден: ' + fileName);
    const text = await response.text();
    return parseScheduleText(text);
  } catch (err) {
    console.error('Ошибка загрузки расписания:', err);
    return {};
  }
}

  // ===== РЕНДЕР КАРТОЧКИ =====
  function renderCard(item) {
    const typeClass = {
      'Лекция': 'card-lecture',
      'Практика': 'card-practice',
      'Зачет': 'card-exam'
    }[item.type] || 'card-default';

    return `
      <div class="schedule-card ${typeClass}">
        <div class="schedule-card-left">
          <div class="schedule-card-date">${item.date}</div>
          <div class="schedule-card-type">${item.type}</div>
        </div>
        <div class="schedule-card-right">
          <div class="schedule-card-topic">${item.topic}</div>
        </div>
      </div>
    `;
  }

  // ===== РЕНДЕР РАСПИСАНИЯ =====
  function renderSchedule() {
    const data = scheduleData[themeId];

    if (!data) {
      return `<div class="exam-block"><div class="exam-block-text">Расписание пока недоступно</div></div>`;
    }

    const examType = currentTarget;
    const groups = data[examType] || [];

    if (groups.length === 0) {
      return `<div class="exam-block"><div class="exam-block-text">Расписание для этого экзамена пока недоступно</div></div>`;
    }

    let html = '';

    // Группы (без автоподсветки — пользователь сам выберет)
    html += `<div class="schedule-block">`;
    html += `<div class="schedule-label">Группа</div>`;
    html += `<div class="schedule-buttons" id="groupButtons">`;
    groups.forEach((group, i) => {
      html += `<button class="schedule-btn" data-group-index="${i}">
        <span class="schedule-btn-line1">${group.name}</span>
        <span class="schedule-btn-line2">${group.time}</span>
      </button>`;
    });
    html += `</div>`;
    html += `</div>`;

    // Месяцы (скрыт, пока не выбрана группа)
    html += `<div class="schedule-block" id="monthsBlock" style="display: none;">`;
    html += `<div class="schedule-label">Месяц</div>`;
    html += `<div class="schedule-buttons" id="monthButtons"></div>`;
    html += `</div>`;

    // Карточки
    html += `<div class="schedule-cards" id="scheduleContent">
      <div class="exam-block-text">Выберите группу, чтобы увидеть расписание</div>
    </div>`;

    return html;
  }

  // ===== ЗАГРУЗКА ГРУППЫ =====
  async function loadGroup(groupIndex) {
    const data = scheduleData[themeId];
    if (!data) return;

    const examType = currentTarget;
    const groups = data[examType] || [];
    if (!groups[groupIndex]) return;

    const group = groups[groupIndex];
    const content = document.getElementById('scheduleContent');
    const monthsBlock = document.getElementById('monthsBlock');
    const monthButtons = document.getElementById('monthButtons');

    // Сбрасываем старое состояние
    currentMonth = null;
    parsedSchedule = {};
    monthButtons.innerHTML = '';
    monthsBlock.style.display = 'none';

    content.innerHTML = '<div class="exam-block-text">Загрузка...</div>';

    parsedSchedule = await loadScheduleFile(group.file);

    const months = MONTH_ORDER.filter(m => parsedSchedule[m] && parsedSchedule[m].length > 0);

    if (months.length === 0) {
      content.innerHTML = '<div class="exam-block-text">В файле расписания нет занятий</div>';
      return;
    }

    monthButtons.innerHTML = months.map((m, i) => {
      const active = i === 0 ? 'active' : '';
      return `<button class="schedule-btn ${active}" data-month="${m}">${m}</button>`;
    }).join('');

    monthsBlock.style.display = 'block';
    currentMonth = months[0];

    monthButtons.querySelectorAll('.schedule-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        monthButtons.querySelectorAll('.schedule-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentMonth = this.dataset.month;
        renderMonthCards();
      });
    });

    renderMonthCards();
  }

  // ===== РЕНДЕР КАРТОЧЕК МЕСЯЦА =====
  function renderMonthCards() {
    const content = document.getElementById('scheduleContent');
    const items = parsedSchedule[currentMonth] || [];

    if (items.length === 0) {
      content.innerHTML = '<div class="exam-block-text">Нет занятий</div>';
      return;
    }

    content.innerHTML = items.map(renderCard).join('');
  }

  // ===== ОБРАБОТЧИКИ РАСПИСАНИЯ =====
  function bindScheduleEvents() {
    const groupButtons = document.querySelectorAll('#groupButtons .schedule-btn');

    groupButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const newIndex = parseInt(this.dataset.groupIndex, 10);

        // Если кликнули по уже активной группе — ничего не делаем
        if (newIndex === currentGroupIndex && this.classList.contains('active')) {
          return;
        }

        groupButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentGroupIndex = newIndex;
        loadGroup(currentGroupIndex);
      });
    });

    // ❌ НЕТ автозагрузки первой группы.
    // Расписание появится только после клика.
  }

  // ===== ЗАГЛУШКА ДЛЯ КОНТЕНТА =====
  function renderContent(category) {
    examTitle.textContent = currentTarget === 'oge' ? 'ОГЭ' : 'ЕГЭ';
    examSubtitle.textContent = currentTarget === 'oge' ? 'Основной государственный экзамен' : 'Единый государственный экзамен';

    // Сбрасываем состояние группы при открытии новой категории
    currentGroupIndex = -1;
    currentMonth = null;
    parsedSchedule = {};

    let html = '';

    if (category === 'Расписание') {
      html = renderSchedule();
    } else {
      html += `<div class="exam-block">`;
      html += `<div class="exam-block-heading">📄 Контент</div>`;
      html += `<div class="exam-block-text">Вы выбрали: ${category}</div>`;
      html += `<div class="exam-block-text">Преподаватель: ${teacher}</div>`;
      html += `<div class="exam-block-text">Предмет: ${subject}</div>`;
      html += `</div>`;
    }

    examDataContainer.innerHTML = html;

    if (category === 'Расписание') {
      bindScheduleEvents();
    }

    welcomeMsg.style.display = 'none';
    lessonContent.style.display = 'none';
    examContent.style.display = 'block';
  }

  // ===== ВОЗВРАТ К ПРИВЕТСТВИЮ =====
  function backToWelcome() {
    welcomeMsg.style.display = 'block';
    lessonContent.style.display = 'none';
    examContent.style.display = 'none';
    currentCategory = null;
  }

  // ===== ЗАКРЫТЬ ДОПСТРОКУ =====
  function closeSubMenu() {
    navSub.classList.remove('open');
    navLinks.forEach(l => l.classList.remove('active'));
    currentTarget = null;
  }

  // ===== ОТКРЫТЬ ДОПСТРОКУ =====
  function openSubMenu(target) {
    const items = subData[target] || [];
    subContent.innerHTML = items.map(item =>
      `<a href="#" data-category="${item}">${item}</a>`
    ).join('');
    navSub.classList.add('open');
    currentTarget = target;
  }

  // ===== ОГЭ / ЕГЭ =====
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.dataset.target;

      if (currentTarget === target && navSub.classList.contains('open')) {
        closeSubMenu();
        backToWelcome();
        return;
      }

      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');

      openSubMenu(target);
      backToWelcome();
    });
  });

  // ===== КАТЕГОРИИ =====
  subContent.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      const category = e.target.textContent;

      subContent.querySelectorAll('a').forEach(a => a.style.borderBottomColor = 'transparent');
      e.target.style.borderBottomColor = '#e0c86c';

      currentCategory = category;

      renderContent(category);
    }
  });

  // ===== КОНТЕНТ / КОНТАКТЫ =====
  plainLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      closeSubMenu();
      backToWelcome();
    });
  });

  // ===== ЗАКРЫТИЕ ПРИ КЛИКЕ ВНЕ =====
  document.addEventListener('click', function(e) {
    const isNav = e.target.closest('.nav-top') || e.target.closest('.nav-sub');
    if (!isNav) {
      navSub.classList.remove('open');
      navLinks.forEach(l => l.classList.remove('active'));
      currentTarget = null;
    }
  });

  // ===== СТАРТ =====
  backToWelcome();

})();
