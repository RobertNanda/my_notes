/**
 * AI Visual Learning Hub — Shared Core Script (core.js)
 * Handles:
 *  1. Dark / Light theme persistence (#theme-toggle)
 *  2. Catalog search (#search-input) & category tabs (.filter-btn)
 *  3. Topic completion tracking & progress bar (#progress-fill, #progress-text)
 *  4. Flashcard flip interactivity (.flashcard)
 *  5. Auto-initialization of KaTeX and Mermaid.js when present
 */

(function () {
  'use strict';

  const THEME_STORAGE_KEY = 'ai_notes_theme';
  const COMPLETED_STORAGE_KEY = 'ai_notes_completed_items';

  /* ========================================================================
     1. Theme Management (Dark default, Light supported)
     ======================================================================== */
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'dark';
    applyTheme(savedTheme);

    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem(THEME_STORAGE_KEY, next);
      });
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.innerHTML =
        theme === 'dark'
          ? '<span aria-hidden="true">☀️</span> <span>Light Mode</span>'
          : '<span aria-hidden="true">🌙</span> <span>Dark Mode</span>';
      toggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    }
  }

  /* ========================================================================
     2. Search & Category Filtering on index.html
     ======================================================================== */
  function initCatalogFilters() {
    const searchInput = document.getElementById('search-input');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card[data-category]');

    if (!cards.length) return;

    let activeCategory = 'all';
    let searchQuery = '';

    function filterCatalog() {
      cards.forEach((card) => {
        const category = (card.getAttribute('data-category') || '').toLowerCase();
        const title = (card.querySelector('.card-title')?.textContent || '').toLowerCase();
        const desc = (card.querySelector('.card-desc')?.textContent || '').toLowerCase();
        const badge = (card.querySelector('.card-badge')?.textContent || '').toLowerCase();
        const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();

        const matchesCategory =
          activeCategory === 'all' || category === activeCategory;
        const matchesSearch =
          !searchQuery ||
          title.includes(searchQuery) ||
          desc.includes(searchQuery) ||
          badge.includes(searchQuery) ||
          keywords.includes(searchQuery);

        card.style.display = matchesCategory && matchesSearch ? '' : 'none';
      });

      // Optionally toggle section headings if all cards inside a grid are hidden
      document.querySelectorAll('[data-section-group]').forEach((section) => {
        const visibleCards = section.querySelectorAll('.card[data-category]:not([style*="display: none"])');
        section.style.display = visibleCards.length ? '' : 'none';
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        filterCatalog();
      });
    }

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = (btn.getAttribute('data-filter') || 'all').toLowerCase();
        filterCatalog();
      });
    });
  }

  /* ========================================================================
     3. Completion Tracking & Progress Bar
     ======================================================================== */
  function getCompletedSet() {
    try {
      const raw = localStorage.getItem(COMPLETED_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return new Set(Array.isArray(parsed) ? parsed : []);
    } catch (err) {
      return new Set();
    }
  }

  function saveCompletedSet(set) {
    try {
      localStorage.setItem(COMPLETED_STORAGE_KEY, JSON.stringify(Array.from(set)));
    } catch (err) {
      // Ignore storage quota errors
    }
  }

  function initProgressTracker() {
    const toggleButtons = document.querySelectorAll('[data-complete-id]');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');

    if (!toggleButtons.length && !progressFill) return;

    const completedSet = getCompletedSet();

    function updateProgressUI() {
      const total = toggleButtons.length;
      let completedCount = 0;

      toggleButtons.forEach((btn) => {
        const id = btn.getAttribute('data-complete-id');
        const isDone = completedSet.has(id);
        if (isDone) completedCount++;

        const parentCard = btn.closest('.card');
        if (parentCard) {
          parentCard.classList.toggle('completed', isDone);
        }

        if (btn.tagName === 'INPUT' && btn.type === 'checkbox') {
          btn.checked = isDone;
        } else {
          btn.classList.toggle('is-completed', isDone);
          btn.setAttribute('aria-pressed', String(isDone));
          btn.innerHTML = isDone
            ? '<span aria-hidden="true">✅</span> <span>Completed</span>'
            : '<span aria-hidden="true">⬜</span> <span>Mark Complete</span>';
        }
      });

      const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0;
      if (progressFill) {
        progressFill.style.width = `${pct}%`;
      }
      if (progressText) {
        progressText.textContent = `${completedCount} of ${total} active module${total === 1 ? '' : 's'} completed (${pct}%)`;
      }
    }

    toggleButtons.forEach((btn) => {
      const handler = () => {
        const id = btn.getAttribute('data-complete-id');
        if (!id) return;
        if (completedSet.has(id)) {
          completedSet.delete(id);
        } else {
          completedSet.add(id);
        }
        saveCompletedSet(completedSet);
        updateProgressUI();
      };

      if (btn.tagName === 'INPUT' && btn.type === 'checkbox') {
        btn.addEventListener('change', handler);
      } else {
        btn.addEventListener('click', handler);
      }
    });

    updateProgressUI();
  }

  /* ========================================================================
     4. Generic Interactive Flashcards
     ======================================================================== */
  function initFlashcards() {
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.flashcard');
      if (!card) return;
      card.classList.toggle('flipped');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const card = e.target.closest('.flashcard');
        if (!card) return;
        e.preventDefault();
        card.classList.toggle('flipped');
      }
    });
  }

  /* ========================================================================
     5. Auto-Initialize KaTeX & Mermaid.js (if loaded on page)
     ======================================================================== */
  function initMathAndDiagrams() {
    // KaTeX auto-render
    if (typeof window.renderMathInElement === 'function') {
      try {
        window.renderMathInElement(document.body, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '\\[', right: '\\]', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\(', right: '\\)', display: false }
          ],
          throwOnError: false
        });
      } catch (err) {
        console.warn('KaTeX auto-render warning:', err);
      }
    }

    // Mermaid.js initialization
    if (typeof window.mermaid !== 'undefined' && window.mermaid) {
      try {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        window.mermaid.initialize({
          startOnLoad: true,
          theme: currentTheme === 'light' ? 'default' : 'dark',
          securityLevel: 'loose'
        });
      } catch (err) {
        console.warn('Mermaid init warning:', err);
      }
    }
  }

  /* ========================================================================
     Bootstrap on DOMContentLoaded
     ======================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initCatalogFilters();
    initProgressTracker();
    initFlashcards();
    initMathAndDiagrams();
  });
})();
