// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <script
            innerHTML={`
              (function() {
                try {
                  var savedTheme = localStorage.getItem('selectedTheme');
                  var themeMode = localStorage.getItem('themeMode');
                  if (savedTheme && themeMode !== 'system') {
                    document.documentElement.setAttribute('data-theme', savedTheme);
                  } else if (themeMode === 'system' || !themeMode) {
                    var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
                  }
                } catch (e) {}
              })();
            `}
          />
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
