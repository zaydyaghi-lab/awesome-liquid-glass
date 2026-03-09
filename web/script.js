// Liquid Glass — Interactive Demo
// Renders each component preset and wires up live controls.

// ── Design tokens (kept in sync with the Figma plugin) ───────
var tokens = {
  fill:            'rgba(255, 255, 255, 0.12)',
  border:          '1px solid rgba(255, 255, 255, 0.25)',
  shadowOuter:     '0 0 30px rgba(0, 0, 0, 0.35)',
  shadowHighlight: '0 8px 20px rgba(255, 255, 255, 0.25)',
  shadowInset:     'inset 0 1px 0 rgba(255, 255, 255, 0.30)',
  borderRadius:    '20px',
  blur:            5,   // px — controlled by the slider
};

// ── Component HTML templates ──────────────────────────────────
var components = {

  'play-button': {
    label: 'Play Button',
    render: function() {
      return '<div class="play-button-wrap">' +
        '<button class="play-btn glass" id="playBtn" title="Click to toggle play / pause" aria-label="Play">' +
          '<span id="playIcon">▶</span>' +
        '</button>' +
      '</div>';
    },
    init: function() {
      var btn  = document.getElementById('playBtn');
      var icon = document.getElementById('playIcon');
      var playing = false;
      btn.addEventListener('click', function() {
        playing = !playing;
        icon.textContent = playing ? '⏸' : '▶';
        btn.setAttribute('aria-label', playing ? 'Pause' : 'Play');
      });
    },
    css: function(blur) {
      return '.play-btn {\n' +
        '  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n' +
        '  background: rgba(255, 255, 255, 0.12);\n' +
        '  border: 1px solid rgba(255, 255, 255, 0.25);\n' +
        '  box-shadow:\n' +
        '    0 0 30px rgba(0, 0, 0, 0.35),\n' +
        '    0 8px 20px rgba(255, 255, 255, 0.25),\n' +
        '    inset 0 1px 0 rgba(255, 255, 255, 0.30);\n' +
        '  backdrop-filter: blur(' + blur + 'px);\n' +
        '  -webkit-backdrop-filter: blur(' + blur + 'px);\n' +
        '  color: #fff;\n  font-size: 28px;\n  cursor: pointer;\n}';
    },
  },

  'toolbar': {
    label: 'Toolbar',
    render: function() {
      return '<div class="toolbar glass">' +
        '<div class="toolbar-start">' +
          '<button class="icon-btn" title="Back">‹</button>' +
          '<button class="icon-btn" title="Forward">›</button>' +
        '</div>' +
        '<span class="toolbar-title">Liquid Glass</span>' +
        '<div class="toolbar-end">' +
          '<button class="icon-btn" title="Close">×</button>' +
        '</div>' +
      '</div>';
    },
    init: function() {},
    css: function(blur) {
      return '.toolbar {\n' +
        '  display: flex;\n  align-items: center;\n  padding: 10px 16px;\n  gap: 8px;\n' +
        '  background: rgba(255, 255, 255, 0.12);\n' +
        '  border: 1px solid rgba(255, 255, 255, 0.25);\n' +
        '  box-shadow:\n' +
        '    0 0 30px rgba(0, 0, 0, 0.35),\n' +
        '    0 8px 20px rgba(255, 255, 255, 0.25),\n' +
        '    inset 0 1px 0 rgba(255, 255, 255, 0.30);\n' +
        '  backdrop-filter: blur(' + blur + 'px);\n' +
        '  -webkit-backdrop-filter: blur(' + blur + 'px);\n' +
        '}';
    },
  },

  'tab-bar': {
    label: 'Tab Bar',
    render: function() {
      return '<div class="tab-bar glass">' +
        '<button class="tab-item active" data-tab="alerts">' +
          '<span class="tab-icon">🔔</span>' +
          '<span>Alerts</span>' +
        '</button>' +
        '<button class="tab-item" data-tab="timers">' +
          '<span class="tab-icon">⏱</span>' +
          '<span class="tab-badge">3</span>' +
          '<span>Timers</span>' +
        '</button>' +
        '<button class="tab-item" data-tab="home">' +
          '<span class="tab-icon">⊙</span>' +
          '<span>Home</span>' +
        '</button>' +
      '</div>';
    },
    init: function() {
      document.querySelectorAll('.tab-item').forEach(function(btn) {
        btn.addEventListener('click', function() {
          document.querySelectorAll('.tab-item').forEach(function(b) { b.classList.remove('active'); });
          btn.classList.add('active');
        });
      });
    },
    css: function(blur) {
      return '.tab-bar {\n' +
        '  display: flex;\n  padding: 8px 0 2px;\n' +
        '  background: rgba(255, 255, 255, 0.12);\n' +
        '  border: 1px solid rgba(255, 255, 255, 0.25);\n' +
        '  box-shadow:\n' +
        '    0 0 30px rgba(0, 0, 0, 0.35),\n' +
        '    0 8px 20px rgba(255, 255, 255, 0.25),\n' +
        '    inset 0 1px 0 rgba(255, 255, 255, 0.30);\n' +
        '  backdrop-filter: blur(' + blur + 'px);\n' +
        '  -webkit-backdrop-filter: blur(' + blur + 'px);\n' +
        '  border-radius: 20px;\n' +
        '}';
    },
  },

  'floating-bar': {
    label: 'Floating Bar',
    render: function() {
      return '<div class="floating-bar-wrap">' +
        '<div class="action-bar glass">' +
          '<button class="icon-btn" title="Delete">🗑</button>' +
          '<button class="icon-btn" title="Folder">📁</button>' +
          '<button class="icon-btn" title="Reply">↩</button>' +
        '</div>' +
        '<button class="fab glass" title="Compose">✎</button>' +
      '</div>';
    },
    init: function() {},
    css: function(blur) {
      return '.action-bar {\n' +
        '  display: flex;\n  gap: 8px;\n  padding: 12px 20px;\n  border-radius: 32px;\n' +
        '  background: rgba(255, 255, 255, 0.12);\n' +
        '  border: 1px solid rgba(255, 255, 255, 0.25);\n' +
        '  box-shadow:\n' +
        '    0 0 30px rgba(0, 0, 0, 0.35),\n' +
        '    0 8px 20px rgba(255, 255, 255, 0.25),\n' +
        '    inset 0 1px 0 rgba(255, 255, 255, 0.30);\n' +
        '  backdrop-filter: blur(' + blur + 'px);\n' +
        '  -webkit-backdrop-filter: blur(' + blur + 'px);\n' +
        '}\n\n' +
        '.fab {\n' +
        '  width: 52px;\n  height: 52px;\n  border-radius: 50%;\n' +
        '  /* same glass properties as above */\n' +
        '}';
    },
  },

  'h-container': {
    label: 'H Container',
    render: function() {
      return '<div class="h-container glass">' +
        '<button class="icon-btn" title="Back">‹</button>' +
        '<span class="h-title">Navigation</span>' +
        '<button class="icon-btn" title="Add">+</button>' +
        '<button class="icon-btn" title="More">○</button>' +
      '</div>';
    },
    init: function() {},
    css: function(blur) {
      return '.h-container {\n' +
        '  display: flex;\n  align-items: center;\n  padding: 20px 32px;\n' +
        '  border-radius: 20px;\n' +
        '  background: rgba(255, 255, 255, 0.12);\n' +
        '  border: 1px solid rgba(255, 255, 255, 0.25);\n' +
        '  box-shadow:\n' +
        '    0 0 30px rgba(0, 0, 0, 0.35),\n' +
        '    0 8px 20px rgba(255, 255, 255, 0.25),\n' +
        '    inset 0 1px 0 rgba(255, 255, 255, 0.30);\n' +
        '  backdrop-filter: blur(' + blur + 'px);\n' +
        '  -webkit-backdrop-filter: blur(' + blur + 'px);\n' +
        '}';
    },
  },

  'menu': {
    label: 'Menu',
    render: function() {
      var items = [
        { icon: '○', label: 'Circle'   },
        { icon: '△', label: 'Triangle' },
        { icon: '□', label: 'Square'   },
        { icon: '⬠', label: 'Pentagon' },
      ];
      var rows = items.map(function(item) {
        return '<button class="menu-item">' +
          '<span class="menu-icon">' + item.icon + '</span>' +
          '<span>' + item.label + '</span>' +
        '</button>';
      }).join('');
      return '<div class="menu-wrap glass" style="border-radius:16px;overflow:hidden">' +
        '<div class="menu-header"><span>Shapes</span><span style="opacity:.5;font-size:18px">…</span></div>' +
        rows +
      '</div>';
    },
    init: function() {},
    css: function(blur) {
      return '.menu {\n' +
        '  border-radius: 16px;\n  overflow: hidden;\n' +
        '  background: rgba(255, 255, 255, 0.12);\n' +
        '  border: 1px solid rgba(255, 255, 255, 0.25);\n' +
        '  box-shadow:\n' +
        '    0 0 30px rgba(0, 0, 0, 0.35),\n' +
        '    0 8px 20px rgba(255, 255, 255, 0.25),\n' +
        '    inset 0 1px 0 rgba(255, 255, 255, 0.30);\n' +
        '  backdrop-filter: blur(' + blur + 'px);\n' +
        '  -webkit-backdrop-filter: blur(' + blur + 'px);\n' +
        '}';
    },
  },

  'glass-card': {
    label: 'Glass Card',
    render: function() {
      return '<div class="glass-card glass" style="margin-bottom:28px">' +
        '<h2>Glass Card</h2>' +
        '<p>A standalone glass panel component that can be placed anywhere in your layout.</p>' +
        '<button class="card-fab glass" title="Add">+</button>' +
      '</div>';
    },
    init: function() {},
    css: function(blur) {
      return '.glass-card {\n' +
        '  border-radius: 20px;\n  padding: 28px;\n' +
        '  background: rgba(255, 255, 255, 0.12);\n' +
        '  border: 1px solid rgba(255, 255, 255, 0.25);\n' +
        '  box-shadow:\n' +
        '    0 0 30px rgba(0, 0, 0, 0.35),\n' +
        '    0 8px 20px rgba(255, 255, 255, 0.25),\n' +
        '    inset 0 1px 0 rgba(255, 255, 255, 0.30);\n' +
        '  backdrop-filter: blur(' + blur + 'px);\n' +
        '  -webkit-backdrop-filter: blur(' + blur + 'px);\n' +
        '}';
    },
  },
};

// ── State ─────────────────────────────────────────────────────
var currentComp = 'play-button';
var currentBlur = 5;

// ── Helpers ───────────────────────────────────────────────────

function updateCSSVar(blur) {
  document.documentElement.style.setProperty('--blur', blur + 'px');
}

function renderComponent(name) {
  var comp = components[name];
  if (!comp) return;
  var area = document.getElementById('demoArea');
  area.innerHTML = comp.render();
  comp.init();
  updateCodePanel(name, currentBlur);
}

function updateCodePanel(name, blur) {
  var comp = components[name];
  if (!comp) return;
  document.getElementById('codeBlock').textContent = comp.css(blur);
}

function showToast(msg) {
  var toast = document.getElementById('toast');
  toast.textContent = msg || '✓ Copied!';
  toast.classList.add('show');
  setTimeout(function() { toast.classList.remove('show'); }, 2200);
}

// ── Init ──────────────────────────────────────────────────────

function initializeLiquidGlass() {
  // Component navigation
  var navBtns = document.querySelectorAll('#componentNav button');
  navBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      navBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      currentComp = btn.getAttribute('data-comp');
      renderComponent(currentComp);
    });
  });

  // Blur slider
  var slider = document.getElementById('blurSlider');
  var valLabel = document.getElementById('blurVal');
  slider.addEventListener('input', function() {
    currentBlur = parseFloat(slider.value);
    valLabel.textContent = currentBlur + 'px';
    updateCSSVar(currentBlur);
    updateLiquidGlass();
    updateCodePanel(currentComp, currentBlur);
  });

  // Copy CSS
  document.getElementById('copyBtn').addEventListener('click', function() {
    var code = document.getElementById('codeBlock').textContent;
    var copyBtn = document.getElementById('copyBtn');
    if (!navigator.clipboard) {
      showToast('⚠ Copy not supported in this browser');
      return;
    }
    navigator.clipboard.writeText(code).then(function() {
      copyBtn.textContent = '✓ Copied';
      copyBtn.classList.add('copied');
      showToast('✓ CSS copied to clipboard!');
      setTimeout(function() {
        copyBtn.textContent = 'Copy';
        copyBtn.classList.remove('copied');
      }, 2000);
    }).catch(function() {
      showToast('⚠ Could not copy — try selecting the text manually');
    });
  });

  // Theme toggle
  document.querySelectorAll('#themeToggle .pill-tab').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('#themeToggle .pill-tab').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      applyTheme(btn.getAttribute('data-theme'));
    });
  });

  // Render initial component
  renderComponent(currentComp);
  updateCSSVar(currentBlur);
}

// ── updateLiquidGlass ─────────────────────────────────────────
// Called whenever the blur slider changes — updates live glass elements.
function updateLiquidGlass() {
  updateCSSVar(currentBlur);
}

// ── Theme ─────────────────────────────────────────────────────
function applyTheme(theme) {
  var root = document.documentElement;
  if (theme === 'light') {
    document.body.style.background = 'linear-gradient(135deg, #cce8ff 0%, #e8d5f5 50%, #d0edff 100%)';
    document.body.style.color = '#111';
    root.style.setProperty('--fill', 'rgba(255,255,255,0.45)');
    root.style.setProperty('--border', 'rgba(255,255,255,0.7)');
    root.style.setProperty('--shadow-highlight', '0 8px 20px rgba(255,255,255,0.6)');
  } else {
    document.body.style.background = 'linear-gradient(135deg, #0d1b2a 0%, #1a2a4a 40%, #0f2030 100%)';
    document.body.style.color = '#fff';
    root.style.setProperty('--fill', 'rgba(255,255,255,0.12)');
    root.style.setProperty('--border', 'rgba(255,255,255,0.25)');
    root.style.setProperty('--shadow-highlight', '0 8px 20px rgba(255,255,255,0.25)');
  }
}

// ── Start ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', initializeLiquidGlass);
