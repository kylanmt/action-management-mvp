<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>Action Management — OPEX+</title>
  <meta name="ext-resource-dependency" content="assets/opex-o-plus.png" data-resource-id="opexLogo" />
  <template id="__bundler_thumbnail" data-bg-color="#05213F">
    <svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="800" fill="#05213F"/>
      <text x="600" y="430" font-family="Montserrat, sans-serif" font-size="200" font-weight="700" text-anchor="middle">
        <tspan fill="#FFFFFF">O</tspan><tspan fill="#1AB3B8">+</tspan>
      </text>
      <text x="600" y="540" font-family="Satoshi, sans-serif" font-size="48" font-weight="600" letter-spacing="6" text-anchor="middle" fill="#1AB3B8">ACTIONS</text>
    </svg>
  </template>
  <style>
    @font-face { font-family:'Montserrat'; src:url('fonts/Montserrat-Regular.ttf'); font-weight:400; }
    @font-face { font-family:'Montserrat'; src:url('fonts/Montserrat-Medium.ttf');  font-weight:500; }
    @font-face { font-family:'Montserrat'; src:url('fonts/Montserrat-SemiBold.ttf');font-weight:600; }
    @font-face { font-family:'Montserrat'; src:url('fonts/Montserrat-Bold.ttf');    font-weight:700; }
    @font-face { font-family:'Poppins';    src:url('fonts/Poppins-Regular.ttf');    font-weight:400; }
    @font-face { font-family:'Poppins';    src:url('fonts/Poppins-Medium.ttf');     font-weight:500; }
    @font-face { font-family:'Poppins';    src:url('fonts/Poppins-SemiBold.ttf');   font-weight:600; }
    @font-face { font-family:'Satoshi';    src:url('fonts/Satoshi-Regular.otf');    font-weight:400; }
    @font-face { font-family:'Satoshi';    src:url('fonts/Satoshi-Medium.otf');     font-weight:500; }
    @font-face { font-family:'Satoshi';    src:url('fonts/Satoshi-Bold.otf');       font-weight:700; }

    *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

    html, body {
      height: 100%;
      background: #1a1a2e;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Satoshi', sans-serif;
      overflow: hidden;
    }

    /* Phone shell */
    .phone-outer {
      width: 393px;
      height: 852px;
      max-height: 98vh;
      aspect-ratio: 393/852;
      background: #111;
      border-radius: 52px;
      box-shadow:
        0 0 0 1.5px #333,
        0 0 0 10px #222,
        0 0 0 11px #444,
        0 32px 80px rgba(0,0,0,0.7),
        inset 0 0 0 1.5px #555;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    /* Notch / dynamic island */
    .phone-island {
      position: absolute;
      top: 12px;
      left: 50%;
      transform: translateX(-50%);
      width: 120px;
      height: 36px;
      background: #111;
      border-radius: 20px;
      z-index: 100;
      box-shadow: 0 0 0 1px #333;
    }

    /* Screen */
    .phone-screen {
      position: absolute;
      inset: 0;
      border-radius: 52px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    /* Sidebar label */
    .phone-label {
      position: absolute;
      bottom: -36px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 11px;
      color: rgba(255,255,255,0.3);
      font-family: 'Satoshi', sans-serif;
      font-weight: 500;
      white-space: nowrap;
      letter-spacing: 0.08em;
    }

    /* Side buttons */
    .btn-side {
      position: absolute;
      background: #333;
      border-radius: 3px;
    }
    .btn-right { right:-3px; }
    .btn-left  { left:-3px;  }
    .btn-vol-up   { top:130px; width:4px; height:52px; }
    .btn-vol-down { top:196px; width:4px; height:52px; }
    .btn-power    { top:200px; width:4px; height:72px; }

    /* Home indicator */
    .home-indicator {
      position: absolute;
      bottom: 8px;
      left: 50%;
      transform: translateX(-50%);
      width: 130px;
      height: 5px;
      background: rgba(255,255,255,0.25);
      border-radius: 999px;
      z-index: 99;
    }

    /* React root inside phone */
    #root {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      height: 100%;
    }

    ::-webkit-scrollbar { width:3px; height:3px; }
    ::-webkit-scrollbar-track { background:transparent; }
    ::-webkit-scrollbar-thumb { background:#DDDDDD; border-radius:99px; }

    button { -webkit-tap-highlight-color: transparent; }

    /* Background gradient behind phone */
    .bg-gradient {
      position: fixed;
      inset: 0;
      background: radial-gradient(ellipse at 30% 40%, #0E2A4A 0%, #05213F 40%, #0a0a1a 100%);
      z-index: -1;
    }

    /* Feature label strip */
    .feature-strip {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 8px;
      z-index: 50;
    }
    .feature-pill {
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 999px;
      padding: 5px 12px;
      font-size: 10px;
      color: rgba(255,255,255,0.5);
      font-family: 'Satoshi', sans-serif;
      font-weight: 500;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }
  </style>
</head>
<body>
  <div class="bg-gradient"></div>

  <!-- Phone shell -->
  <div class="phone-outer">
    <!-- Side buttons -->
    <div class="btn-side btn-left  btn-vol-up"></div>
    <div class="btn-side btn-left  btn-vol-down" style="top:196px"></div>
    <div class="btn-side btn-right btn-power"></div>

    <!-- Dynamic island -->
    <div class="phone-island"></div>

    <!-- Home indicator -->
    <div class="home-indicator"></div>

    <!-- App screen -->
    <div class="phone-screen">
      <div id="root"></div>
    </div>

    <div class="phone-label">Action Management MVP · OPEX+</div>
  </div>

  <!-- Feature hints -->
  <div class="feature-strip">
    <div class="feature-pill">Platform: search · bell · profile</div>
    <div class="feature-pill">Nav: Accueil · Actions · Apps</div>
    <div class="feature-pill">In-page tabs + FAB</div>
  </div>

  <!-- React + Babel -->
  <script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>

  <!-- Load modules in dependency order -->
  <script type="text/babel" src="am-data.jsx"></script>
  <script type="text/babel" src="am-atoms.jsx"></script>
  <script type="text/babel" src="am-kanban.jsx"></script>
  <script type="text/babel" src="am-listview.jsx"></script>
  <script type="text/babel" src="am-creation.jsx"></script>
  <script type="text/babel" src="am-detail.jsx"></script>
  <script type="text/babel" src="am-plans.jsx"></script>
  <script type="text/babel" src="am-secondary.jsx"></script>
  <script type="text/babel" src="am-shell.jsx"></script>

  <!-- Bootstrap -->
  <script type="text/babel">
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<AmApp />);
  </script>
</body>
</html>
