(function() {
  // ===== ЭЛЕМЕНТЫ =====
  const teacherRow = document.getElementById('teacherRow');
  const teacherOptions = document.getElementById('teacherOptions');
  const teacherDisplay = document.getElementById('teacherDisplay');

  const subjectRow = document.getElementById('subjectRow');
  const subjectOptions = document.getElementById('subjectOptions');
  const subjectDisplay = document.getElementById('subjectDisplay');

  const resultTeacher = document.getElementById('resultTeacher');
  const resultSubject = document.getElementById('resultSubject');

  // ===== ТЕМЫ ДЛЯ КОМБИНАЦИЙ ПРЕПОДАВАТЕЛЬ + ПРЕДМЕТ =====
  const comboThemes = {
    'Грознов М.Д._Математика': {
      accent: '#d4a843',
      cardBg: '#2a241a',
      rowBg: '#3a3228',
      pageBg: '#161210',
      text: '#f8f8ff',
      border: '#5a4a2a',
      shadow: '#0a0808'
    },
    'Грознов М.Д._Информатика': {
      accent: '#e74c3c',
      cardBg: '#2a1a1a',
      rowBg: '#3a2828',
      pageBg: '#160e0e',
      text: '#f8f8ff',
      border: '#5a2a2a',
      shadow: '#0a0606'
    },
    'Козлов Е.А._Математика': {
      accent: '#69db7c',
      cardBg: '#1a2a1a',
      rowBg: '#283a28',
      pageBg: '#101810',
      text: '#f0fff0',
      border: '#3a5a3a',
      shadow: '#060a06'
    },
    'Покровская В.А._Русский язык': {
      accent: '#a29bfe',
      cardBg: '#1a1a2a',
      rowBg: '#28283a',
      pageBg: '#10101a',
      text: '#e8e8ff',
      border: '#4a4a6a',
      shadow: '#06060a'
    },
    'Перников И.А._Информатика': {
      accent: '#f48fb1',
    cardBg: '#2a1420',
    rowBg: '#3a1e2a',
    pageBg: '#1a0c12',
    text: '#f8e8ee',
    border: '#5a3242',
    shadow: '#0e060a'
    }
  };

  // ===== ПРИМЕНЕНИЕ ТЕМЫ =====
  function applyTheme(teacher, subject) {
    const key = teacher + '_' + subject;
    const theme = comboThemes[key];

    if (!theme) {
      document.documentElement.style.setProperty('--accent', '#555577');
      document.documentElement.style.setProperty('--card-bg', '#24243a');
      document.documentElement.style.setProperty('--row-bg', '#2e2e4a');
      document.documentElement.style.setProperty('--page-bg', '#1a1a24');
      document.documentElement.style.setProperty('--text-primary', '#f8f8ff');
      document.documentElement.style.setProperty('--border-color', '#3a3a56');
      document.documentElement.style.setProperty('--shadow', '#0f0f18');
      return;
    }

    document.documentElement.style.setProperty('--accent', theme.accent);
    document.documentElement.style.setProperty('--card-bg', theme.cardBg);
    document.documentElement.style.setProperty('--row-bg', theme.rowBg);
    document.documentElement.style.setProperty('--page-bg', theme.pageBg);
    document.documentElement.style.setProperty('--text-primary', theme.text);
    document.documentElement.style.setProperty('--border-color', theme.border);
    document.documentElement.style.setProperty('--shadow', theme.shadow);
  }

  // ===== ДАННЫЕ: ПРЕДМЕТЫ ДЛЯ КАЖДОГО ПРЕПОДАВАТЕЛЯ =====
  const teacherSubjects = {
    'Грознов М.Д.': ['Математика', 'Информатика'],
    'Козлов Е.А.': ['Математика'],
    'Покровская В.А.': ['Русский язык'],
    'Перников И.А.': ['Информатика']
  };

  // ===== ФУНКЦИЯ: БЛОКИРОВКА ПРЕДМЕТА, ЕСЛИ НЕ ВЫБРАН ПРЕПОД =====
  function checkTeacherSelected() {
    const teacher = document.getElementById('teacherDisplay').textContent;
    const subjectRow = document.getElementById('subjectRow');
    
    if (teacher === 'Не выбрано') {
      subjectRow.style.opacity = '0.5';
      subjectRow.style.pointerEvents = 'none';
      subjectRow.style.cursor = 'default';
    } else {
      subjectRow.style.opacity = '1';
      subjectRow.style.pointerEvents = 'auto';
      subjectRow.style.cursor = 'pointer';
    }
  }

  // ===== ФУНКЦИЯ: ОБНОВЛЕНИЕ СПИСКА ПРЕДМЕТОВ =====
  function updateSubjects(teacherName) {
    const subjects = teacherSubjects[teacherName] || [];
    const optionsContainer = document.getElementById('subjectOptions');
    const subjectDisplay = document.getElementById('subjectDisplay');
    
    optionsContainer.innerHTML = '';
    
    if (subjects.length === 0) {
      const emptyOption = document.createElement('div');
      emptyOption.className = 'option';
      emptyOption.textContent = 'Нет предметов';
      emptyOption.style.color = '#666';
      emptyOption.style.cursor = 'default';
      optionsContainer.appendChild(emptyOption);
      subjectDisplay.textContent = 'Нет предметов';
    } else {
      subjects.forEach(function(subject) {
        const option = document.createElement('div');
        option.className = 'option';
        option.textContent = subject;
        option.dataset.val = subject;
        
        option.addEventListener('click', function(e) {
          e.stopPropagation();
          subjectDisplay.textContent = this.textContent;
          subjectOptions.querySelectorAll('.option').forEach(o => o.classList.remove('active'));
          this.classList.add('active');
          closeAllRows();
          updateResult();
        });
        
        optionsContainer.appendChild(option);
      });
      subjectDisplay.textContent = 'Выберите предмет';
    }
  }

  // ===== ОБНОВЛЕНИЕ РЕЗУЛЬТАТА И ПРИМЕНЕНИЕ ТЕМЫ =====
  function updateResult() {
    const teacher = teacherDisplay.textContent;
    const subject = subjectDisplay.textContent;
    
    if (resultTeacher) resultTeacher.textContent = teacher;
    if (resultSubject) resultSubject.textContent = subject;
    
    checkTeacherSelected();
    applyTheme(teacher, subject);
  }

  // ===== ЗАКРЫТИЕ ВСЕХ СПИСКОВ =====
  function closeAllRows() {
    document.querySelectorAll('.row').forEach(row => {
      row.classList.remove('open');
      const opts = row.nextElementSibling;
      if (opts && opts.classList.contains('options')) {
        opts.style.maxHeight = '0';
        opts.style.opacity = '0';
        opts.style.padding = '0 18px';
      }
    });
  }

  // ===== ОТКРЫТИЕ/ЗАКРЫТИЕ СТРОКИ =====
  function toggleRow(row) {
    const isOpen = row.classList.contains('open');
    closeAllRows();
    if (!isOpen) {
      row.classList.add('open');
      const options = row.nextElementSibling;
      if (options && options.classList.contains('options')) {
        options.style.maxHeight = '300px';
        options.style.opacity = '1';
        options.style.padding = '10px 18px 14px';
      }
    }
  }

  // ===== КЛИК ПО СТРОКЕ =====
  if (teacherRow) {
    teacherRow.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleRow(this);
    });
  }

  if (subjectRow) {
    subjectRow.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleRow(this);
    });
  }

  // ===== КЛИК ПО ОПЦИЯМ (преподаватель) =====
  if (teacherOptions) {
    teacherOptions.querySelectorAll('.option').forEach(opt => {
      opt.addEventListener('click', function(e) {
        e.stopPropagation();
        const selectedName = this.textContent;
        teacherDisplay.textContent = selectedName;
        teacherOptions.querySelectorAll('.option').forEach(o => o.classList.remove('active'));
        this.classList.add('active');
        
        updateSubjects(selectedName);
        closeAllRows();
        updateResult();
      });
    });
  }

  // ===== КЛИК ПО ОПЦИЯМ (предмет) =====
  if (subjectOptions) {
    subjectOptions.querySelectorAll('.option').forEach(opt => {
      opt.addEventListener('click', function(e) {
        e.stopPropagation();
        subjectDisplay.textContent = this.dataset.val;
        subjectOptions.querySelectorAll('.option').forEach(o => o.classList.remove('active'));
        this.classList.add('active');
        closeAllRows();
        updateResult();
      });
    });
  }

  // ===== ЗАКРЫТИЕ ПРИ КЛИКЕ ВНЕ =====
  document.addEventListener('click', function() {
    closeAllRows();
  });

  // ===== КНОПКА "ПОГНАЛИ" =====
  const goBtn = document.getElementById('goBtn');
  if (goBtn) {
    goBtn.addEventListener('click', function(e) {
      e.preventDefault();

      const teacher = teacherDisplay.textContent;
      const subject = subjectDisplay.textContent;

      const themeId = (teacher + '_' + subject).replace(/\./g, '').replace(/\s/g, '_');

      let targetPage = 'selected.html';

      if (teacher === 'Грознов М.Д.' && subject === 'Информатика') {
        targetPage = 'teachers_files/groznov_inf/selected_groznov_inf.html';
      } else if (teacher === 'Грознов М.Д.' && subject === 'Математика') {
        targetPage = 'teachers_files/groznov_math/selected_groznov_math.html';
      } else if (teacher === 'Козлов Е.А.' && subject === 'Математика') {
        targetPage = 'teachers_files/kozlov_math/selected_kozlov_math.html';
      } else if (teacher === 'Покровская В.А.' && subject === 'Русский язык') {
        targetPage = 'teachers_files/pokrov_rus/selected_pokrov_rus.html';
      } else if (teacher === 'Перников И.А.' && subject === 'Информатика') {
        targetPage = 'teachers_files/pernikov_inf/selected_pernikov_inf.html';
      }

      window.location.href = targetPage + '?teacher=' + encodeURIComponent(teacher) + '&subject=' + encodeURIComponent(subject) + '&theme=' + themeId;
    });
  }

  // ===== ИНИЦИАЛИЗАЦИЯ =====
  updateSubjects('Грознов М.Д.');
  updateResult();
  checkTeacherSelected();

})();