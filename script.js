var PAGES = ['museum','marketing','sound','web','graphic','video','photography','art','reusable','dementia'];

function toggleMenu() { document.getElementById('mainNav').classList.toggle('open'); }
function closeMenu()  { document.getElementById('mainNav').classList.remove('open'); }

function _showHome() {
  document.getElementById('homeContent').style.display = 'block';
  PAGES.forEach(function(id) {
    var el = document.getElementById('page-' + id);
    if (el) el.style.display = 'none';
  });
}

function _showPage(id) {
  document.getElementById('homeContent').style.display = 'none';
  PAGES.forEach(function(pid) {
    var el = document.getElementById('page-' + pid);
    if (el) el.style.display = 'none';
  });
  var el = document.getElementById('page-' + id);
  if (el) {
    el.style.display = 'block';
    markWideImages(el);
  }
}

// Public nav functions — update hash which triggers render
function showHome() {
  window.location.hash = '';
}

function showPage(id) {
  window.location.hash = id;
}

function scrollToWork() {
  showHome();
  setTimeout(function() {
    var el = document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 80);
}

function scrollToExp() {
  showHome();
  setTimeout(function() {
    var el = document.getElementById('experience');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 80);
}

// Render whatever the current hash says
function renderFromHash() {
  var hash = window.location.hash.replace('#', '');
  if (hash && PAGES.indexOf(hash) !== -1) {
    _showPage(hash);
    window.scrollTo(0, 0);
  } else {
    _showHome();
    // If hash was something like #work or #experience, scroll to it
    if (hash === 'work' || hash === 'experience') {
      setTimeout(function() {
        var el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo(0, 0);
    }
  }
}

// Listen for back/forward
window.addEventListener('hashchange', renderFromHash);

// On first load, render from hash (handles refresh)
window.addEventListener('load', function() {
  renderFromHash();
  markWideImages();
});

function markWideImages(root) {
  var galleries = (root || document).querySelectorAll('.gallery.autospan');
  galleries.forEach(function(g) {
    g.querySelectorAll('img').forEach(function(img) {
      var check = function() {
        if (img.naturalWidth && img.naturalHeight) {
          if (img.naturalWidth / img.naturalHeight > 1.4) img.classList.add('wide');
          else img.classList.remove('wide');
        }
      };
      if (img.complete && img.naturalWidth) check();
      else img.addEventListener('load', check);
    });
  });
}
