// Awesome Liquid Glass — Figma Plugin (code.js)
// Self-contained bundle: UI HTML is inlined so no separate build step is required.
// This file is loaded directly by Figma as specified in manifest.json "main".

// ─── Inline UI HTML ──────────────────────────────────────────────────────────

var UI_HTML = '<!DOCTYPE html>' +
'<html lang="en"><head>' +
'<meta charset="UTF-8">' +
'<meta name="viewport" content="width=device-width,initial-scale=1.0">' +
'<title>Awesome Liquid Glass</title>' +
'<style>' +
'*{box-sizing:border-box;margin:0;padding:0}' +
'body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#1e1e1e;color:#fff;padding:14px}' +
'.header{display:flex;align-items:center;gap:10px;margin-bottom:14px;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,.1)}' +
'.header-icon{width:32px;height:32px;background:linear-gradient(135deg,rgba(255,255,255,.25),rgba(255,255,255,.05));border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;border:1px solid rgba(255,255,255,.2);flex-shrink:0}' +
'.header-text h1{font-size:13px;font-weight:600;letter-spacing:-.3px}' +
'.header-text p{font-size:10px;color:rgba(255,255,255,.45);margin-top:2px}' +
'.grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}' +
'.card{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:13px 11px;cursor:pointer;transition:background .12s,border-color .12s,transform .1s;user-select:none;position:relative;overflow:hidden}' +
'.card::before{content:"";position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);pointer-events:none}' +
'.card:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.18);transform:translateY(-1px)}' +
'.card:active{transform:translateY(0);background:rgba(255,255,255,.14)}' +
'.card.wide{grid-column:span 2;display:flex;align-items:center;gap:12px;padding:12px 14px}' +
'.card.wide .card-icon{margin-bottom:0;flex-shrink:0}' +
'.card.wide .card-body{flex:1}' +
'.card-icon{width:36px;height:36px;background:linear-gradient(135deg,rgba(255,255,255,.14),rgba(255,255,255,.04));border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:17px;margin-bottom:9px;border:1px solid rgba(255,255,255,.13)}' +
'.card-title{font-size:11.5px;font-weight:600;margin-bottom:3px;letter-spacing:-.2px}' +
'.card-desc{font-size:10px;color:rgba(255,255,255,.42);line-height:1.4}' +
'.footer{margin-top:14px;text-align:center;font-size:10px;color:rgba(255,255,255,.28)}' +
'.toast{display:none;position:fixed;bottom:12px;left:50%;transform:translateX(-50%);background:rgba(52,199,89,.92);color:#fff;padding:7px 16px;border-radius:20px;font-size:11.5px;font-weight:500;white-space:nowrap;z-index:999}' +
'.toast.show{display:block;animation:tf 2s ease forwards}' +
'@keyframes tf{0%{opacity:0;transform:translateX(-50%) translateY(8px)}12%{opacity:1;transform:translateX(-50%) translateY(0)}75%{opacity:1;transform:translateX(-50%) translateY(0)}100%{opacity:0;transform:translateX(-50%) translateY(-4px)}}' +
'</style></head><body>' +
'<div class="header">' +
'  <div class="header-icon">&#10022;</div>' +
'  <div class="header-text"><h1>Liquid Glass Components</h1><p>iOS 26 / SwiftUI glass effects</p></div>' +
'</div>' +
'<div class="grid">' +
'  <div class="card" data-preset="play-button"><div class="card-icon">&#9654;</div><div class="card-title">Play Button</div><div class="card-desc">Circular glass button with play icon</div></div>' +
'  <div class="card" data-preset="toolbar"><div class="card-icon">&#8801;</div><div class="card-title">Toolbar</div><div class="card-desc">Glass nav bar with back, forward &amp; close</div></div>' +
'  <div class="card" data-preset="tab-bar"><div class="card-icon">&#9634;</div><div class="card-title">Tab Bar</div><div class="card-desc">Bottom tabs with badge support</div></div>' +
'  <div class="card" data-preset="floating-bar"><div class="card-icon">&#8853;</div><div class="card-title">Floating Bar</div><div class="card-desc">Action bar with floating compose button</div></div>' +
'  <div class="card" data-preset="h-container"><div class="card-icon">&#8596;</div><div class="card-title">H Container</div><div class="card-desc">Full-width glass navigation container</div></div>' +
'  <div class="card" data-preset="menu"><div class="card-icon">&#9776;</div><div class="card-title">Menu</div><div class="card-desc">Glass dropdown with icon-labeled items</div></div>' +
'  <div class="card wide" data-preset="glass-card"><div class="card-icon">&#9647;</div><div class="card-body"><div class="card-title">Glass Card</div><div class="card-desc">Standalone glass panel with circular action button</div></div></div>' +
'</div>' +
'<div class="footer">Click any preset to insert it onto the canvas</div>' +
'<div class="toast" id="toast">&#10003; Component inserted!</div>' +
'<script>' +
'document.querySelectorAll(".card").forEach(function(c){' +
'  c.addEventListener("click",function(){' +
'    var p=c.getAttribute("data-preset");' +
'    parent.postMessage({pluginMessage:{type:"create-component",preset:p}},"*");' +
'    var t=document.getElementById("toast");' +
'    t.classList.remove("show");void t.offsetWidth;t.classList.add("show");' +
'  });' +
'});' +
'<\/script></body></html>';

figma.showUI(UI_HTML, { width: 320, height: 560 });

// ─── Design tokens ────────────────────────────────────────────────────────────
// Values sourced from web/index.html and web/styles.css

var GLASS_FILL       = { type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0.1 };
var BACKGROUND_BLUR  = { type: 'BACKGROUND_BLUR', radius: 5, visible: true };
var HIGHLIGHT_SHADOW = { type: 'DROP_SHADOW', color: { r: 1, g: 1, b: 1, a: 0.3 }, offset: { x: 0, y: 8 },  radius: 20, spread: 0, visible: true, blendMode: 'NORMAL' };
var OUTER_SHADOW     = { type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.3 }, offset: { x: 0, y: 0 },  radius: 30, spread: 0, visible: true, blendMode: 'NORMAL' };
var WHITE            = { r: 1, g: 1, b: 1 };

// ─── Helpers ──────────────────────────────────────────────────────────────────

function applyGlass(node) {
  node.fills   = [GLASS_FILL];
  node.effects = [BACKGROUND_BLUR, HIGHLIGHT_SHADOW, OUTER_SHADOW];
}

function centerInViewport(node) {
  node.x = Math.round(figma.viewport.center.x - node.width  / 2);
  node.y = Math.round(figma.viewport.center.y - node.height / 2);
}

function finalise(nodes) {
  nodes.forEach(function(n) { figma.currentPage.appendChild(n); });
  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);
}

async function loadFonts() {
  try {
    await Promise.all([
      figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
      figma.loadFontAsync({ family: 'Inter', style: 'Medium' }),
      figma.loadFontAsync({ family: 'Inter', style: 'Bold' }),
    ]);
  } catch (_) {
    await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
  }
}

function makeText(content, size, opacity) {
  var t = figma.createText();
  t.characters = content;
  t.fontSize   = size;
  t.fills      = [{ type: 'SOLID', color: WHITE, opacity: opacity !== undefined ? opacity : 0.9 }];
  return t;
}

function centreChild(child, parent) {
  child.x = Math.round((parent.width  - child.width)  / 2);
  child.y = Math.round((parent.height - child.height) / 2);
}

function makeIconButton(symbol, name, frameSize, fontSize) {
  var fs   = frameSize || 32;
  var fnt  = fontSize  || 18;
  var frame = figma.createFrame();
  frame.name         = name;
  frame.resize(fs, fs);
  frame.cornerRadius = fs / 2;
  frame.clipsContent = false;
  frame.fills        = [{ type: 'SOLID', color: WHITE, opacity: 0.15 }];

  var icon = makeText(symbol, fnt);
  frame.appendChild(icon);
  centreChild(icon, frame);
  return frame;
}

// ─── Play Button ─────────────────────────────────────────────────────────────

async function createPlayButton() {
  await loadFonts();

  var circle = figma.createFrame();
  circle.name         = 'Liquid Glass / Play Button';
  circle.resize(80, 80);
  circle.cornerRadius = 40;
  circle.clipsContent = true;
  applyGlass(circle);

  var icon = makeText('\u25B6', 28); // ▶
  circle.appendChild(icon);
  icon.x = Math.round((80 - icon.width)  / 2) + 3; // +3 for optical centering
  icon.y = Math.round((80 - icon.height) / 2);

  centerInViewport(circle);
  finalise([circle]);
}

// ─── Toolbar ─────────────────────────────────────────────────────────────────

async function createToolbar() {
  await loadFonts();

  var bar = figma.createFrame();
  bar.name         = 'Liquid Glass / Toolbar';
  bar.resize(390, 52);
  bar.cornerRadius = 0;
  applyGlass(bar);

  var back    = makeIconButton('\u2039', 'Back Button');    // ‹
  var forward = makeIconButton('\u203A', 'Forward Button'); // ›
  var close   = makeIconButton('\u00D7', 'Close Button');   // ×

  bar.appendChild(back);
  bar.appendChild(forward);
  bar.appendChild(close);

  var btnY = Math.round((52 - 32) / 2);
  back.x    = 16;  back.y    = btnY;
  forward.x = 56;  forward.y = btnY;
  close.x   = 342; close.y   = btnY;

  centerInViewport(bar);
  finalise([bar]);
}

// ─── Tab Bar ─────────────────────────────────────────────────────────────────

async function createTabBar() {
  await loadFonts();

  var bar = figma.createFrame();
  bar.name         = 'Liquid Glass / Tab Bar';
  bar.resize(390, 83);
  bar.cornerRadius = 0;
  bar.clipsContent = false;
  applyGlass(bar);

  // Alerts tab
  var alertsTab = figma.createFrame();
  alertsTab.name   = 'Alerts Tab';
  alertsTab.resize(195, 55);
  alertsTab.fills  = [];
  alertsTab.x = 0; alertsTab.y = 8;

  var bellIcon  = makeText('\uD83D\uDD14', 22); // 🔔
  var alertsLbl = makeText('Alerts', 10, 0.7);
  alertsTab.appendChild(bellIcon);
  alertsTab.appendChild(alertsLbl);
  bellIcon.x  = Math.round((195 - bellIcon.width)  / 2); bellIcon.y  = 4;
  alertsLbl.x = Math.round((195 - alertsLbl.width) / 2); alertsLbl.y = 30;

  // Timers tab
  var timersTab = figma.createFrame();
  timersTab.name   = 'Timers Tab';
  timersTab.resize(195, 55);
  timersTab.fills  = [];
  timersTab.x = 195; timersTab.y = 8;

  var timerIcon = makeText('\u23F1', 22); // ⏱
  var timersLbl = makeText('Timers', 10, 0.7);
  timersTab.appendChild(timerIcon);
  timersTab.appendChild(timersLbl);
  timerIcon.x = Math.round((195 - timerIcon.width)  / 2); timerIcon.y = 4;
  timersLbl.x = Math.round((195 - timersLbl.width)  / 2); timersLbl.y = 30;

  // Badge on Timers
  var badge = figma.createEllipse();
  badge.name   = 'Badge';
  badge.resize(16, 16);
  badge.fills  = [{ type: 'SOLID', color: { r: 1, g: 0.2, b: 0.2 } }];
  badge.x = Math.round((195 - timerIcon.width) / 2) + timerIcon.width - 4;
  badge.y = 0;
  timersTab.appendChild(badge);

  var badgeNum = makeText('3', 9);
  badgeNum.x = badge.x + 3; badgeNum.y = badge.y + 1;
  timersTab.appendChild(badgeNum);

  bar.appendChild(alertsTab);
  bar.appendChild(timersTab);

  centerInViewport(bar);
  finalise([bar]);
}

// ─── Floating Action Bar ──────────────────────────────────────────────────────

async function createFloatingBar() {
  await loadFonts();

  var wrapper = figma.createFrame();
  wrapper.name         = 'Liquid Glass / Floating Bar';
  wrapper.resize(268, 64);
  wrapper.fills        = [];
  wrapper.clipsContent = false;

  var actionBar = figma.createFrame();
  actionBar.name         = 'Action Bar';
  actionBar.resize(200, 64);
  actionBar.cornerRadius = 32;
  actionBar.clipsContent = false;
  applyGlass(actionBar);
  actionBar.x = 0; actionBar.y = 0;

  var trash  = makeText('\uD83D\uDDD1', 22); // 🗑
  var folder = makeText('\uD83D\uDCC1', 22); // 📁
  var reply  = makeText('\u21A9', 22);        // ↩
  actionBar.appendChild(trash);
  actionBar.appendChild(folder);
  actionBar.appendChild(reply);
  trash.x  = 20;  trash.y  = Math.round((64 - trash.height)  / 2);
  folder.x = 84;  folder.y = Math.round((64 - folder.height) / 2);
  reply.x  = 148; reply.y  = Math.round((64 - reply.height)  / 2);

  var fab = figma.createFrame();
  fab.name         = 'Compose Button';
  fab.resize(56, 56);
  fab.cornerRadius = 28;
  fab.clipsContent = false;
  applyGlass(fab);
  fab.x = 212; fab.y = 4;

  var fabIcon = makeText('\u270E', 22); // ✎
  fab.appendChild(fabIcon);
  centreChild(fabIcon, fab);

  wrapper.appendChild(actionBar);
  wrapper.appendChild(fab);

  centerInViewport(wrapper);
  finalise([wrapper]);
}

// ─── H Container ─────────────────────────────────────────────────────────────

async function createHContainer() {
  await loadFonts();

  var container = figma.createFrame();
  container.name         = 'Liquid Glass / H Container';
  container.resize(390, 88);
  container.cornerRadius = 20;
  container.clipsContent = false;
  applyGlass(container);

  var backIcon   = makeText('\u2039', 30); // ‹
  var plusIcon   = makeText('+',      30);
  var circleIcon = makeText('\u25CB', 30); // ○
  container.appendChild(backIcon);
  container.appendChild(plusIcon);
  container.appendChild(circleIcon);

  var iconY = Math.round((88 - backIcon.height) / 2);
  backIcon.x   = 32;
  backIcon.y   = iconY;
  plusIcon.x   = Math.round((390 - plusIcon.width) / 2);
  plusIcon.y   = iconY;
  circleIcon.x = 390 - 32 - Math.round(circleIcon.width);
  circleIcon.y = iconY;

  centerInViewport(container);
  finalise([container]);
}

// ─── Menu ─────────────────────────────────────────────────────────────────────

async function createMenu() {
  await loadFonts();

  var menu = figma.createFrame();
  menu.name         = 'Liquid Glass / Menu';
  menu.resize(220, 200);
  menu.cornerRadius = 16;
  menu.clipsContent = true;
  applyGlass(menu);

  var items = [
    { icon: '\u25CB', label: 'Circle'   },
    { icon: '\u25B3', label: 'Triangle' },
    { icon: '\u25A1', label: 'Square'   },
    { icon: '\u2B20', label: 'Pentagon' },
  ];

  items.forEach(function(item, i) {
    var row = figma.createFrame();
    row.name   = item.label + ' Item';
    row.resize(220, 50);
    row.fills  = i % 2 === 0 ? [{ type: 'SOLID', color: WHITE, opacity: 0.04 }] : [];
    row.x = 0; row.y = i * 50;

    var iconNode  = makeText(item.icon,  18, 0.8);
    var labelNode = makeText(item.label, 14, 0.9);
    row.appendChild(iconNode);
    row.appendChild(labelNode);
    iconNode.x  = 16; iconNode.y  = Math.round((50 - iconNode.height)  / 2);
    labelNode.x = 46; labelNode.y = Math.round((50 - labelNode.height) / 2);

    if (i < items.length - 1) {
      var sep = figma.createRectangle();
      sep.name   = 'Separator';
      sep.resize(188, 1);
      sep.x = 16; sep.y = 49;
      sep.fills = [{ type: 'SOLID', color: WHITE, opacity: 0.08 }];
      row.appendChild(sep);
    }

    menu.appendChild(row);
  });

  centerInViewport(menu);
  finalise([menu]);
}

// ─── Glass Card ───────────────────────────────────────────────────────────────

async function createGlassCard() {
  await loadFonts();

  var wrapper = figma.createFrame();
  wrapper.name         = 'Liquid Glass / Glass Card';
  wrapper.resize(300, 220);
  wrapper.fills        = [];
  wrapper.clipsContent = false;

  var card = figma.createFrame();
  card.name         = 'Glass Panel';
  card.resize(300, 200);
  card.cornerRadius = 20;
  card.clipsContent = true;
  applyGlass(card);
  card.x = 0; card.y = 0;

  var title = makeText('Glass Card', 18, 0.75);
  title.x = 20; title.y = 20;
  card.appendChild(title);

  var sub = makeText('Custom glass panel component', 12, 0.45);
  sub.x = 20; sub.y = 46;
  card.appendChild(sub);

  var plusBtn = figma.createFrame();
  plusBtn.name         = 'Plus Button';
  plusBtn.resize(56, 56);
  plusBtn.cornerRadius = 28;
  plusBtn.clipsContent = false;
  applyGlass(plusBtn);
  plusBtn.x = 300 - 56 - 16;
  plusBtn.y = 200 - 28; // overlapping card bottom edge

  var plusIcon = makeText('+', 28);
  plusBtn.appendChild(plusIcon);
  centreChild(plusIcon, plusBtn);

  wrapper.appendChild(card);
  wrapper.appendChild(plusBtn);

  centerInViewport(wrapper);
  finalise([wrapper]);
}

// ─── Message handler ──────────────────────────────────────────────────────────

figma.ui.onmessage = function(msg) {
  if (msg.type !== 'create-component' || !msg.preset) { return; }

  var handlers = {
    'play-button':  createPlayButton,
    'toolbar':      createToolbar,
    'tab-bar':      createTabBar,
    'floating-bar': createFloatingBar,
    'h-container':  createHContainer,
    'menu':         createMenu,
    'glass-card':   createGlassCard,
  };

  var handler = handlers[msg.preset];
  if (handler) {
    handler().then(function() {
      figma.notify('\u2726 Liquid Glass / ' + msg.preset + ' inserted');
    }).catch(function(err) {
      figma.notify('Error: ' + String(err), { error: true });
    });
  } else {
    figma.notify('Unknown preset: ' + msg.preset, { error: true });
  }
};
