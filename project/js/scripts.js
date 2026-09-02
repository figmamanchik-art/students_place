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

  // ===== ОБНОВЛЕНИЕ РЕЗУЛЬТАТА =====
  function updateResult() {
    if (resultTeacher) resultTeacher.textContent = teacherDisplay.textContent;
    if (resultSubject) resultSubject.textContent = subjectDisplay.textContent;
  }

  // ===== ФУНКЦИЯ ЗАКРЫТИЯ ВСЕХ СПИСКОВ =====
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
        teacherDisplay.textContent = this.dataset.val;
        teacherOptions.querySelectorAll('.option').forEach(o => o.classList.remove('active'));
        this.classList.add('active');
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
      window.location.href = 'selected.html?teacher=' + encodeURIComponent(teacher) + '&subject=' + encodeURIComponent(subject);
    });
  }

  updateResult();
})();