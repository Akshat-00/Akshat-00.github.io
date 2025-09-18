document.addEventListener('DOMContentLoaded', function () {
  var modal = document.getElementById('project-modal');
  var modalTitle = document.getElementById('project-title');
  var modalDescription = document.getElementById('project-description');
  var githubLink = document.getElementById('github-link');
  var tagsBox = modal.querySelector('.modal-tags');
  var closeBtn = modal ? modal.querySelector('.close') : null;
  var prevBtn = document.getElementById('prev-project');
  var nextBtn = document.getElementById('next-project');

var cards = Array.prototype.slice.call(document.querySelectorAll('.project-card'))
  .filter(function(card){ return !card.classList.contains('other'); });
  if (!modal || cards.length === 0) return;

  var projectData = cards.map(function (card) {
    var h3 = card.querySelector('h3');
    var a  = card.querySelector('a[href]');
    return {
      title: h3 ? h3.textContent : 'Untitled',
      description: card.getAttribute('data-description') || '',
      github: card.getAttribute('data-github') || (a ? a.getAttribute('href') : '#'),
      stack: (card.getAttribute('data-stack') || '')
        .split(',').map(function(s){ return s.trim(); }).filter(Boolean)
    };
  });

  var currentIndex = -1;

  function renderTags(stack){
    if (!tagsBox) return;
    tagsBox.innerHTML = '';
    stack.forEach(function (t) {
      var span = document.createElement('span');
      span.className = 'tag';
      span.textContent = t;
      tagsBox.appendChild(span);
    });
  }

  function openModal(i) {
    currentIndex = i;
    var data = projectData[i];

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalDescription) modalDescription.innerHTML = data.description;
    if (githubLink) githubLink.setAttribute('href', data.github);
    renderTags(data.stack);

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    if (prevBtn) prevBtn.disabled = (currentIndex <= 0);
    if (nextBtn) nextBtn.disabled = (currentIndex >= projectData.length - 1);
  }

  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  // Open handlers (click + keyboard)
  cards.forEach(function (card, idx) {
    card.setAttribute('tabindex', '0');
    card.addEventListener('click', function () { openModal(idx); });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(idx); }
    });
  });

  // Close handlers
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });

  // Don’t let clicks on the GitHub link close or be swallowed
  if (githubLink) githubLink.addEventListener('click', function (e) { e.stopPropagation(); });

  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  // Prev/Next
  if (prevBtn) prevBtn.addEventListener('click', function () {
    if (currentIndex > 0) openModal(currentIndex - 1);
  });
  if (nextBtn) nextBtn.addEventListener('click', function () {
    if (currentIndex < projectData.length - 1) openModal(currentIndex + 1);
  });
});
