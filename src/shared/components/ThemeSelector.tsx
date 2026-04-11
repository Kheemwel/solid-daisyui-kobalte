import { createSignal, For, onMount } from "solid-js";
import { Sun, Moon, Monitor, Palette } from "lucide-solid";

const allThemes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
  "caramellatte",
  "abyss",
  "silk",
] as const;

type Theme = (typeof allThemes)[number];
type Mode = "light" | "dark" | "system";

export default function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = createSignal<Theme>("light");
  const [currentMode, setCurrentMode] = createSignal<Mode>("system");
  const [alignment, setAlignment] = createSignal("dropdown-end");
  let containerRef: HTMLDivElement | undefined;

  const applyTheme = (themeName: Theme) => {
    // Prevent gradual transitions during theme switch
    const style = document.createElement("style");
    style.innerHTML = `*, *::before, *::after { transition: none !important; }`;
    document.head.appendChild(style);

    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem("selectedTheme", themeName);
    localStorage.setItem("themeMode", "manual");
    setCurrentTheme(themeName);
    setCurrentMode("manual" as any);

    // Force reflow and cleanup
    window.getComputedStyle(document.body).opacity;
    setTimeout(() => document.head.removeChild(style), 0);
  };

  const setMode = (mode: Mode) => {
    // Prevent gradual transitions during mode switch
    const style = document.createElement("style");
    style.innerHTML = `*, *::before, *::after { transition: none !important; }`;
    document.head.appendChild(style);

    setCurrentMode(mode);
    localStorage.setItem("themeMode", mode);

    if (mode === "system") {
      localStorage.removeItem("selectedTheme");
      document.documentElement.removeAttribute("data-theme");
    } else {
      applyTheme(mode === "light" ? "light" : "dark");
    }

    // Force reflow and cleanup
    window.getComputedStyle(document.body).opacity;
    setTimeout(() => document.head.removeChild(style), 0);
  };

  onMount(() => {
    // Check position to adapt dropdown alignment
    if (containerRef) {
      const rect = containerRef.getBoundingClientRect();
      const isRightHalf = rect.left > window.innerWidth / 2;
      setAlignment(isRightHalf ? "dropdown-end" : "");
    }

    const savedMode = localStorage.getItem("themeMode") as Mode | null;
    const savedTheme = localStorage.getItem("selectedTheme") as Theme | null;

    if (savedMode === "system" || !savedMode) {
      setMode("system");
    } else if (savedTheme && allThemes.includes(savedTheme)) {
      applyTheme(savedTheme);
    } else {
      setMode("system");
    }
  });

  return (
    <div ref={containerRef} class={`dropdown ${alignment()}`}>
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
        <Palette size={20} />
      </div>

      <div
        tabindex="0"
        class="dropdown-content menu bg-base-300 rounded-box z-50 w-72 p-3 shadow-2xl border border-base-content/10 mt-2"
      >
        {/* Mode Switcher */}
        <div class="mb-4">
          <div class="menu-title text-xs uppercase tracking-widest mb-1">
            Mode
          </div>
          <div class="flex gap-1">
            <button
              onClick={() => setMode("light")}
              class={`flex-1 btn btn-sm ${currentMode() === "light" ? "btn-active" : ""}`}
            >
              <Sun size={16} /> Light
            </button>
            <button
              onClick={() => setMode("dark")}
              class={`flex-1 btn btn-sm ${currentMode() === "dark" ? "btn-active" : ""}`}
            >
              <Moon size={16} /> Dark
            </button>
            <button
              onClick={() => setMode("system")}
              class={`flex-1 btn btn-sm ${currentMode() === "system" ? "btn-active" : ""}`}
            >
              <Monitor size={16} /> System
            </button>
          </div>
        </div>

        <div class="divider my-1"></div>

        {/* Full Theme List */}
        <div class="menu-title text-xs uppercase tracking-widest mb-2">
          All Themes
        </div>
        <ul class="max-h-96 overflow-auto text-sm">
          <For each={allThemes}>
            {(theme) => (
              <li>
                <a
                  onClick={() => applyTheme(theme)}
                  class={`capitalize ${currentTheme() === theme && currentMode() !== "system" ? "active" : ""}`}
                >
                  {theme}
                </a>
              </li>
            )}
          </For>
        </ul>
      </div>
    </div>
  );
}
