<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>Action Management — OPEX+</title>
  <meta name="ext-resource-dependency" content="assets/opex-o-plus.png" data-resource-id="opexLogo" />
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
      width: 100%;
      height: 100%;
      height: -webkit-fill-available;
      background: #F5F5F5;
      font-family: 'Satoshi', sans-serif;
      overflow: hidden;
    }

    #root {
      width: 100%;
      height: 100%;
      height: -webkit-fill-available;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding-top: env(safe-area-inset-top);
      padding-bottom: env(safe-area-inset-bottom);
    }

    ::-webkit-scrollbar { width:3px; height:3px; }
    ::-webkit-scrollbar-track { background:transparent; }
    ::-webkit-scrollbar-thumb { background:#DDDDDD; border-radius:99px; }

    button { -webkit-tap-highlight-color: transparent; }
  </style>
</head>
<body>
  <template id="__bundler_thumbnail">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" fill="#3382C4"/>
      <rect x="30" y="22" width="40" height="56" rx="6" fill="#fff"/>
      <rect x="36" y="32" width="20" height="3" rx="1.5" fill="#3382C4"/>
      <rect x="36" y="40" width="28" height="3" rx="1.5" fill="#C5DCEF"/>
      <rect x="36" y="47" width="28" height="3" rx="1.5" fill="#C5DCEF"/>
      <circle cx="62" cy="64" r="9" fill="#4CADAF"/>
      <path d="M58 64l3 3 5-6" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </template>

  <div id="root"></div>

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
