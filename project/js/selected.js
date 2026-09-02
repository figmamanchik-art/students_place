(function() {
  // ПОЛУЧАЕМ ПАРАМЕТРЫ ИЗ URL
  const params = new URLSearchParams(window.location.search);
  const teacher = params.get('teacher') || 'Грознов М.Д.';
  const subject = params.get('subject') || 'Математика';

  const teacherSpan = document.getElementById('selectedTeacher');
  const subjectSpan = document.getElementById('selectedSubject');
  if (teacherSpan) teacherSpan.textContent = teacher;
  if (subjectSpan) subjectSpan.textContent = subject;

  const isMath = subject === 'Математика';

  // ===== ДАННЫЕ ДЛЯ ЭКЗАМЕНОВ =====
  const examData = {
    oge: {
      title: 'ОГЭ',
      subtitle: 'Основной государственный экзамен',
      blocks: [
        {
          heading: '📅 Даты проведения',
          text: 'Пока неизвестно'
        },
        {
          heading: '📈 Разбаловка',
          isCollapsible: true,
          isTable: true,
          tableData: isMath ? {
            headers: ['Оценка', 'Баллы'],
            rows: [
              ['«2»', '0–7 баллов (или менее 2 баллов по геометрии)'],
              ['«3»', '8–14 баллов (мин. 2 балла по геометрии)'],
              ['«4»', '15–21 балл (мин. 2 балла по геометрии)'],
              ['«5»', '22–31 балл (мин. 2 балла по геометрии)']
            ]
          } : {
            headers: ['Оценка', 'Баллы'],
            rows: [
              ['«2»', '0–4 баллов (экзамен не сдан)'],
              ['«3»', '5–10 баллов (минимальный порог)'],
              ['«4»', '11–16 баллов'],
              ['«5»', '17–21 балла']
            ]
          }
        },
        {
          heading: '🔗 Полезные ссылки',
          items: (() => {
            if (isMath) {
              return [
                '<a href="https://math-oge.sdamgia.ru/" target="_blank">Решу ОГЭ — Математика</a>',
                '<a href="https://kpolyakov.spb.ru/school/oge/generate.htm" target="_blank">Генератор вариантов (Поляков)</a>',
                '<a href="https://fipi.ru/oge" target="_blank">ФИПИ — ОГЭ</a>'
              ];
            } else {
              return [
                '<a href="https://inf-oge.sdamgia.ru/" target="_blank">Решу ОГЭ — Информатика</a>',
                '<a href="https://kpolyakov.spb.ru/school/oge/generate.htm" target="_blank">Генератор вариантов (Поляков)</a>',
                '<a href="https://fipi.ru/oge" target="_blank">ФИПИ — ОГЭ</a>'
              ];
            }
          })(),
          isLinks: true
        }
      ]
    },
    ege: {
      title: 'ЕГЭ',
      subtitle: 'Единый государственный экзамен',
      blocks: [
        {
          heading: '📅 Даты проведения',
          text: 'Пока неизвестно'
        },
        {
          heading: '📈 Разбаловка',
          isCollapsible: true,
          isTable: true,
          isSplitTable: true,
          tableData: isMath ? {
            headers: ['Первичный балл', 'Тестовый балл'],
            leftPart: [
              ['1', '6'], ['2', '11'], ['3', '17'], ['4', '22'], ['5', '27'],
              ['6', '34'], ['7', '40'], ['8', '46'], ['9', '52'], ['10', '58'],
              ['11', '64'], ['12', '70'], ['13', '72'], ['14', '74'], ['15', '76'],
              ['16', '78']
            ],
            rightPart: [
              ['17', '80'], ['18', '82'], ['19', '84'], ['20', '86'],
              ['21', '88'], ['22', '90'], ['23', '92'], ['24', '93'], ['25', '94'],
              ['26', '95'], ['27', '96'], ['28', '97'], ['29', '98'], ['30', '99'],
              ['31', '100'], ['32', '100'], ['33', '100']
            ],
            thresholds: { redBetween: [4, 5], orangeBetween: [6, 7] },
            legend: [
              '🔴 Красной линией обозначен минимальный порог для поступления в вузы и получения аттестата — <strong>5 баллов</strong>',
              '🟠 Оранжевой линией обозначен порог для поступления в подведомственные вузы Минобрнауки — <strong>7 баллов</strong>'
            ]
          } : {
            headers: ['Первичный балл', 'Тестовый балл'],
            leftPart: [
              ['1', '7'], ['2', '14'], ['3', '20'], ['4', '27'], ['5', '34'],
              ['6', '40'], ['7', '43'], ['8', '46'], ['9', '48'], ['10', '51'],
              ['11', '54'], ['12', '56'], ['13', '59'], ['14', '62'], ['15', '64']
            ],
            rightPart: [
              ['16', '67'], ['17', '70'], ['18', '72'], ['19', '75'], ['20', '78'],
              ['21', '80'], ['22', '83'], ['23', '85'], ['24', '88'], ['25', '90'],
              ['26', '93'], ['27', '95'], ['28', '98'], ['29', '100']
            ],
            thresholds: { redBetween: [4, 5], orangeBetween: [6, 7] },
            legend: [
              '🔴 Красной линией обозначен минимальный порог для поступления в вузы и получения аттестата — <strong>5 баллов</strong>',
              '🟠 Оранжевой линией обозначен порог для поступления в подведомственные вузы Минобрнауки — <strong>7 баллов</strong>'
            ]
          }
        },
        {
          heading: '🔗 Полезные ссылки',
          items: (() => {
            if (isMath) {
              return [
                '<a href="https://math-ege.sdamgia.ru/" target="_blank">Решу ЕГЭ — Математика</a>',
                '<a href="https://kompege.ru/" target="_blank">КомпЕГЭ — тренировка КЕГЭ</a>',
                '<a href="https://fipi.ru/ege" target="_blank">ФИПИ — ЕГЭ</a>'
              ];
            } else {
              return [
                '<a href="https://inf-ege.sdamgia.ru/" target="_blank">Решу ЕГЭ — Информатика</a>',
                '<a href="https://kompege.ru/" target="_blank">КомпЕГЭ — тренировка КЕГЭ</a>',
                '<a href="https://fipi.ru/ege" target="_blank">ФИПИ — ЕГЭ</a>'
              ];
            }
          })(),
          isLinks: true
        }
      ]
    }
  };

  // ===== ДАННЫЕ ДЛЯ КАТЕГОРИЙ =====
  const subData = {
    oge: ['Об экзамене', 'Расписание', 'Домашние задания', 'Успеваемость', 'Группы'],
    ege: ['Об экзамене', 'Расписание', 'Домашние задания', 'Успеваемость', 'Группы']
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

  let currentTarget = null;
  let currentCategory = null;

  // ===== РЕНДЕР ТАБЛИЦЫ =====
  function renderTable(tableData, isSplit) {
    const renderRows = (rows, headers, thresholds) => {
      let html = `<table class="exam-table"><thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>`;
      rows.forEach((row, index) => {
        const primary = parseInt(row[0]);
        html += `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`;
        if (thresholds) {
          const nextRow = rows[index + 1];
          if (nextRow) {
            const nextPrimary = parseInt(nextRow[0]);
            if (primary === thresholds.redBetween[0] && nextPrimary === thresholds.redBetween[1]) {
              html += `<tr class="threshold-line-red"><td colspan="${headers.length}"></td></tr>`;
            }
            if (primary === thresholds.orangeBetween[0] && nextPrimary === thresholds.orangeBetween[1]) {
              html += `<tr class="threshold-line-orange"><td colspan="${headers.length}"></td></tr>`;
            }
          }
        }
      });
      html += `</tbody></table>`;
      return html;
    };

    let html = '';
    if (isSplit && tableData.leftPart && tableData.rightPart) {
      html += `<div class="exam-table-split">
        <div class="exam-table-wrap">${renderRows(tableData.leftPart, tableData.headers, tableData.thresholds)}</div>
        <div class="exam-table-wrap">${renderRows(tableData.rightPart, tableData.headers, tableData.thresholds)}</div>
      </div>`;
    } else {
      html += `<div class="exam-table-wrap">${renderRows(tableData.rows, tableData.headers, tableData.thresholds)}</div>`;
    }

    if (tableData.legend) {
      html += `<div class="exam-legend">${tableData.legend.map(item => `<div class="exam-legend-item">${item}</div>`).join('')}</div>`;
    }

    return html;
  }

  // ===== РЕНДЕР ЭКЗАМЕНА =====
  function renderExam(type) {
    const data = examData[type];
    if (!data) return;

    examTitle.textContent = data.title;
    examSubtitle.textContent = data.subtitle;

    let html = '';
    data.blocks.forEach((block, index) => {
      const blockId = 'block-' + type + '-' + index;
      const isCollapsible = block.isCollapsible || false;

      html += `<div class="exam-block ${isCollapsible ? 'collapsible' : ''}" data-block="${blockId}">`;
      
      if (isCollapsible) {
        html += `<div class="exam-block-heading toggle-heading" data-target="${blockId}">`;
        html += `${block.heading} <span class="toggle-icon">▸</span>`;
        html += `</div>`;
        html += `<div class="exam-block-body collapsed" id="${blockId}">`;
      } else {
        html += `<div class="exam-block-heading">${block.heading}</div>`;
      }

      if (block.text) {
        html += `<div class="exam-block-text">${block.text}</div>`;
      }

      if (block.isTable && block.tableData) {
        html += renderTable(block.tableData, block.isSplitTable || false);
      }

      // ===== ССЫЛКИ — КНОПКИ =====
      if (block.items && block.isLinks) {
        html += `<div class="exam-block-links">`;
        block.items.forEach(linkHtml => {
          html += `<div class="exam-link">${linkHtml}</div>`;
        });
        html += `</div>`;
      }

      if (isCollapsible) {
        html += `</div>`;
      }

      html += `</div>`;
    });

    examDataContainer.innerHTML = html;

    document.querySelectorAll('.toggle-heading').forEach(heading => {
      heading.addEventListener('click', function() {
        const targetId = this.dataset.target;
        const body = document.getElementById(targetId);
        const icon = this.querySelector('.toggle-icon');
        if (body) {
          body.classList.toggle('collapsed');
          if (icon) {
            icon.textContent = body.classList.contains('collapsed') ? '▸' : '▾';
          }
        }
      });
    });

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

      if (category === 'Об экзамене') {
        renderExam(currentTarget);
      } else {
        welcomeMsg.style.display = 'none';
        lessonContent.style.display = 'block';
        examContent.style.display = 'none';

        const subjectSpan = document.getElementById('selectedSubject');
        if (subjectSpan) {
          const subject = params.get('subject') || 'Математика';
          subjectSpan.textContent = subject + ' — ' + category;
        }
      }
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