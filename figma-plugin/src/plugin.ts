// plugin.ts — Awesome Liquid Glass Figma Plugin
// Generates pixel-perfect Liquid Glass UI components inspired by iOS 26 / SwiftUI glass effects.

figma.showUI(__html__, { width: 320, height: 560 });

// ─── Design tokens ────────────────────────────────────────────────────────────
// Sourced from web/index.html and web/styles.css

const GLASS_FILL: SolidPaint = {
  type: 'SOLID',
  color: { r: 1, g: 1, b: 1 },
  opacity: 0.1,
};

const BACKGROUND_BLUR: BackgroundBlurEffect = {
  type: 'BACKGROUND_BLUR',
  radius: 5, // matches backdrop-filter: blur(5px)
  visible: true,
};

const HIGHLIGHT_SHADOW: DropShadowEffect = {
  type: 'DROP_SHADOW',
  color: { r: 1, g: 1, b: 1, a: 0.3 }, // 0 8px 20px rgba(255,255,255,0.3)
  offset: { x: 0, y: 8 },
  radius: 20,
  spread: 0,
  visible: true,
  blendMode: 'NORMAL',
};

const OUTER_SHADOW: DropShadowEffect = {
  type: 'DROP_SHADOW',
  color: { r: 0, g: 0, b: 0, a: 0.3 }, // 0 0 30px rgba(0,0,0,0.3)
  offset: { x: 0, y: 0 },
  radius: 30,
  spread: 0,
  visible: true,
  blendMode: 'NORMAL',
};

const WHITE: RGB = { r: 1, g: 1, b: 1 };

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Apply the Liquid Glass visual effect to a frame, rectangle, or ellipse. */
function applyGlass(node: FrameNode | RectangleNode | EllipseNode): void {
  node.fills = [GLASS_FILL];
  node.effects = [BACKGROUND_BLUR, HIGHLIGHT_SHADOW, OUTER_SHADOW];
}

/** Move a node so it is centred on the current viewport. */
function centerInViewport(node: SceneNode & { x: number; y: number; width: number; height: number }): void {
  node.x = Math.round(figma.viewport.center.x - node.width / 2);
  node.y = Math.round(figma.viewport.center.y - node.height / 2);
}

/** Select the nodes, scroll them into view, and append them to the current page. */
function finalise(nodes: SceneNode[]): void {
  nodes.forEach((n) => figma.currentPage.appendChild(n));
  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);
}

/** Load Inter (fallback: Roboto) fonts needed for text nodes. */
async function loadFonts(): Promise<void> {
  try {
    await Promise.all([
      figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
      figma.loadFontAsync({ family: 'Inter', style: 'Medium' }),
      figma.loadFontAsync({ family: 'Inter', style: 'Bold' }),
    ]);
  } catch {
    await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
  }
}

/** Create a white text node with the given content and font size. */
function makeText(content: string, size: number, opacity = 0.9): TextNode {
  const t = figma.createText();
  t.characters = content;
  t.fontSize = size;
  t.fills = [{ type: 'SOLID', color: WHITE, opacity }];
  return t;
}

/**
 * Centre a child node within a parent frame using absolute x/y positioning.
 * The child must already be appended to the parent.
 */
function centreChild(child: SceneNode & { x: number; y: number; width: number; height: number },
                     parent: FrameNode): void {
  child.x = Math.round((parent.width  - child.width)  / 2);
  child.y = Math.round((parent.height - child.height) / 2);
}

/** Create a small rounded icon-button frame containing a unicode symbol. */
function makeIconButton(symbol: string, name: string, frameSize = 32, fontSize = 18): FrameNode {
  const frame = figma.createFrame();
  frame.name = name;
  frame.resize(frameSize, frameSize);
  frame.cornerRadius = frameSize / 2;
  frame.clipsContent = false;
  frame.fills = [{ type: 'SOLID', color: WHITE, opacity: 0.15 }];

  const icon = makeText(symbol, fontSize);
  frame.appendChild(icon);
  centreChild(icon, frame);
  return frame;
}

// ─── Component creators ───────────────────────────────────────────────────────

/** Play Button — 80×80 circular glass frame with a centred play triangle. */
async function createPlayButton(): Promise<void> {
  await loadFonts();

  const circle = figma.createFrame();
  circle.name = 'Liquid Glass / Play Button';
  circle.resize(80, 80);
  circle.cornerRadius = 40;
  circle.clipsContent = true;
  applyGlass(circle);

  // Play icon: unicode right-pointing triangle
  const icon = makeText('▶', 28);
  circle.appendChild(icon);
  // Slight rightward offset for optical centering (play icons look better shifted right)
  icon.x = Math.round((80 - icon.width) / 2) + 3;
  icon.y = Math.round((80 - icon.height) / 2);

  centerInViewport(circle);
  finalise([circle]);
}

/** Toolbar — 390×52 horizontal glass bar with back, forward, and close icons. */
async function createToolbar(): Promise<void> {
  await loadFonts();

  const bar = figma.createFrame();
  bar.name = 'Liquid Glass / Toolbar';
  bar.resize(390, 52);
  bar.cornerRadius = 0;
  applyGlass(bar);

  const back    = makeIconButton('‹', 'Back Button');
  const forward = makeIconButton('›', 'Forward Button');
  const close   = makeIconButton('×', 'Close Button');

  bar.appendChild(back);
  bar.appendChild(forward);
  bar.appendChild(close);

  const btnY = Math.round((52 - 32) / 2);
  back.x    = 16;     back.y    = btnY;
  forward.x = 56;     forward.y = btnY;
  close.x   = 342;    close.y   = btnY;

  centerInViewport(bar);
  finalise([bar]);
}

/** Tab Bar — 390×83 bottom tab bar with Alerts and Timers tabs, badge on Timers. */
async function createTabBar(): Promise<void> {
  await loadFonts();

  const bar = figma.createFrame();
  bar.name = 'Liquid Glass / Tab Bar';
  bar.resize(390, 83);
  bar.cornerRadius = 0;
  bar.clipsContent = false;
  applyGlass(bar);

  // ── Alerts tab (left half) ──
  const alertsTab = figma.createFrame();
  alertsTab.name = 'Alerts Tab';
  alertsTab.resize(195, 55);
  alertsTab.fills = [];
  alertsTab.x = 0;
  alertsTab.y = 8;

  const bellIcon  = makeText('🔔', 22);
  const alertsLbl = makeText('Alerts', 10, 0.7);
  alertsTab.appendChild(bellIcon);
  alertsTab.appendChild(alertsLbl);
  bellIcon.x  = Math.round((195 - bellIcon.width)  / 2);
  bellIcon.y  = 4;
  alertsLbl.x = Math.round((195 - alertsLbl.width) / 2);
  alertsLbl.y = 30;

  // ── Timers tab (right half) ──
  const timersTab = figma.createFrame();
  timersTab.name = 'Timers Tab';
  timersTab.resize(195, 55);
  timersTab.fills = [];
  timersTab.x = 195;
  timersTab.y = 8;

  const timerIcon  = makeText('⏱', 22);
  const timersLbl  = makeText('Timers', 10, 0.7);
  timersTab.appendChild(timerIcon);
  timersTab.appendChild(timersLbl);
  timerIcon.x  = Math.round((195 - timerIcon.width)  / 2);
  timerIcon.y  = 4;
  timersLbl.x  = Math.round((195 - timersLbl.width)  / 2);
  timersLbl.y  = 30;

  // Badge indicator on Timers tab
  const badge = figma.createEllipse();
  badge.name = 'Badge';
  badge.resize(16, 16);
  badge.fills = [{ type: 'SOLID', color: { r: 1, g: 0.2, b: 0.2 } }];
  badge.x = Math.round((195 - timerIcon.width) / 2) + timerIcon.width - 4;
  badge.y = 0;
  timersTab.appendChild(badge);

  const badgeNum = makeText('3', 9);
  badgeNum.x = badge.x + 3;
  badgeNum.y = badge.y + 1;
  timersTab.appendChild(badgeNum);

  bar.appendChild(alertsTab);
  bar.appendChild(timersTab);

  centerInViewport(bar);
  finalise([bar]);
}

/** Floating Action Bar — glass HStack with trash/folder/reply icons + compose FAB. */
async function createFloatingBar(): Promise<void> {
  await loadFonts();

  // Wrapper (transparent, holds both pieces)
  const wrapper = figma.createFrame();
  wrapper.name = 'Liquid Glass / Floating Bar';
  wrapper.resize(268, 64);
  wrapper.fills = [];
  wrapper.clipsContent = false;

  // Action bar (glass pill)
  const actionBar = figma.createFrame();
  actionBar.name = 'Action Bar';
  actionBar.resize(200, 64);
  actionBar.cornerRadius = 32;
  actionBar.clipsContent = false;
  applyGlass(actionBar);
  actionBar.x = 0;
  actionBar.y = 0;

  const trash  = makeText('🗑', 22);
  const folder = makeText('📁', 22);
  const reply  = makeText('↩', 22);
  actionBar.appendChild(trash);
  actionBar.appendChild(folder);
  actionBar.appendChild(reply);
  trash.x  = 20;  trash.y  = Math.round((64 - trash.height)  / 2);
  folder.x = 84;  folder.y = Math.round((64 - folder.height) / 2);
  reply.x  = 148; reply.y  = Math.round((64 - reply.height)  / 2);

  // Compose FAB
  const fab = figma.createFrame();
  fab.name = 'Compose Button';
  fab.resize(56, 56);
  fab.cornerRadius = 28;
  fab.clipsContent = false;
  applyGlass(fab);
  fab.x = 212;
  fab.y = 4;

  const fabIcon = makeText('✎', 22);
  fab.appendChild(fabIcon);
  centreChild(fabIcon, fab);

  wrapper.appendChild(actionBar);
  wrapper.appendChild(fab);

  centerInViewport(wrapper);
  finalise([wrapper]);
}

/** H Container — full-width glass container with back, plus, and circle icons. */
async function createHContainer(): Promise<void> {
  await loadFonts();

  const container = figma.createFrame();
  container.name = 'Liquid Glass / H Container';
  container.resize(390, 88);
  container.cornerRadius = 20;
  container.clipsContent = false;
  applyGlass(container);

  const backIcon   = makeText('‹', 30);
  const plusIcon   = makeText('+', 30);
  const circleIcon = makeText('○', 30);
  container.appendChild(backIcon);
  container.appendChild(plusIcon);
  container.appendChild(circleIcon);

  const iconY = Math.round((88 - backIcon.height) / 2);
  backIcon.x   = 32;
  backIcon.y   = iconY;
  plusIcon.x   = Math.round((390 - plusIcon.width) / 2);
  plusIcon.y   = iconY;
  circleIcon.x = 390 - 32 - Math.round(circleIcon.width);
  circleIcon.y = iconY;

  centerInViewport(container);
  finalise([container]);
}

/** Menu — glass dropdown with four shape-labeled items. */
async function createMenu(): Promise<void> {
  await loadFonts();

  const menu = figma.createFrame();
  menu.name = 'Liquid Glass / Menu';
  menu.resize(220, 200);
  menu.cornerRadius = 16;
  menu.clipsContent = true;
  applyGlass(menu);

  const items = [
    { icon: '○', label: 'Circle'   },
    { icon: '△', label: 'Triangle' },
    { icon: '□', label: 'Square'   },
    { icon: '⬠', label: 'Pentagon' },
  ];

  items.forEach((item, i) => {
    const row = figma.createFrame();
    row.name = item.label + ' Item';
    row.resize(220, 50);
    row.fills = i % 2 === 0 ? [{ type: 'SOLID', color: WHITE, opacity: 0.04 }] : [];
    row.x = 0;
    row.y = i * 50;

    const iconNode  = makeText(item.icon,  18, 0.8);
    const labelNode = makeText(item.label, 14, 0.9);
    row.appendChild(iconNode);
    row.appendChild(labelNode);

    iconNode.x  = 16;
    iconNode.y  = Math.round((50 - iconNode.height)  / 2);
    labelNode.x = 46;
    labelNode.y = Math.round((50 - labelNode.height) / 2);

    // Separator line (except last row)
    if (i < items.length - 1) {
      const sep = figma.createRectangle();
      sep.name = 'Separator';
      sep.resize(188, 1);
      sep.x = 16;
      sep.y = 49;
      sep.fills = [{ type: 'SOLID', color: WHITE, opacity: 0.08 }];
      row.appendChild(sep);
    }

    menu.appendChild(row);
  });

  centerInViewport(menu);
  finalise([menu]);
}

/** Glass Card — 300×200 glass panel with a floating circular plus button. */
async function createGlassCard(): Promise<void> {
  await loadFonts();

  const wrapper = figma.createFrame();
  wrapper.name = 'Liquid Glass / Glass Card';
  wrapper.resize(300, 220);
  wrapper.fills = [];
  wrapper.clipsContent = false;

  const card = figma.createFrame();
  card.name = 'Glass Panel';
  card.resize(300, 200);
  card.cornerRadius = 20;
  card.clipsContent = true;
  applyGlass(card);
  card.x = 0;
  card.y = 0;

  const title = makeText('Glass Card', 18, 0.75);
  title.x = 20;
  title.y = 20;
  card.appendChild(title);

  const sub = makeText('Custom glass panel component', 12, 0.45);
  sub.x = 20;
  sub.y = 46;
  card.appendChild(sub);

  // Circular plus button (bottom-right, overlapping card edge)
  const plusBtn = figma.createFrame();
  plusBtn.name = 'Plus Button';
  plusBtn.resize(56, 56);
  plusBtn.cornerRadius = 28;
  plusBtn.clipsContent = false;
  applyGlass(plusBtn);
  plusBtn.x = 300 - 56 - 16;
  plusBtn.y = 200 - 28; // half-overlapping the bottom edge

  const plusIcon = makeText('+', 28);
  plusBtn.appendChild(plusIcon);
  centreChild(plusIcon, plusBtn);

  wrapper.appendChild(card);
  wrapper.appendChild(plusBtn);

  centerInViewport(wrapper);
  finalise([wrapper]);
}

// ─── Message handler ──────────────────────────────────────────────────────────

figma.ui.onmessage = (msg: { type: string; preset?: string }) => {
  if (msg.type !== 'create-component' || !msg.preset) return;

  const handlers: Record<string, () => Promise<void>> = {
    'play-button':   createPlayButton,
    'toolbar':       createToolbar,
    'tab-bar':       createTabBar,
    'floating-bar':  createFloatingBar,
    'h-container':   createHContainer,
    'menu':          createMenu,
    'glass-card':    createGlassCard,
  };

  const handler = handlers[msg.preset];
  if (handler) {
    handler().then(() => {
      figma.notify('✦ Liquid Glass / ' + msg.preset + ' inserted');
    }).catch((err) => {
      figma.notify('Error: ' + String(err), { error: true });
    });
  } else {
    figma.notify('Unknown preset: ' + msg.preset, { error: true });
  }
};
