import { Router, useNavigate } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { For, JSX, ParentProps, Suspense } from "solid-js";
import "./app.css";
import { House, Info, PanelLeftOpen } from "lucide-solid";
import { Dynamic } from "solid-js/web";
import ThemeSelector from "./components/ThemeSelector";

export default function App() {
  return (
    <Router
      root={(props) => (
        <>
          <Layout
            header={<Header />}
            sidebar={<Sidebar />}
            content={<Suspense>{props.children}</Suspense>}
          ></Layout>
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}

interface LayoutProps {
  header: JSX.Element;
  sidebar: JSX.Element;
  content: JSX.Element;
}

function Layout(props: LayoutProps) {
  return (
    <div class="drawer lg:drawer-open h-screen overflow-hidden ">
      <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col h-screen overflow-hidden ">
        {/* <!-- Navbar --> */}
        {props.header}
        {/* <!-- Page content here --> */}
        <main class="flex-1 overflow-y-auto p-4 bg-base-100 text-base-content">
          {props.content}
        </main>
      </div>

      <div class="drawer-side is-drawer-close:overflow-visible z-50">
        <label
          for="my-drawer-4"
          aria-label="close sidebar"
          class="drawer-overlay"
        ></label>
        <div class="flex min-h-full flex-col items-start bg-base-200 border-r border-base-content/10 transition-all duration-300 ease-in-out is-drawer-close:w-14 is-drawer-open:w-64 is-drawer-close:overflow-visible overflow-hidden">
          {/* <!-- Sidebar content here --> */}
          {props.sidebar}
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <nav class="navbar sticky top-0 z-20 w-full bg-base-300 border-b border-base-content/10 shadow-sm px-4 py-0 flex flex-row items-center">
      <div class="w-full flex flex-row items-center h-full">
        <label
          for="my-drawer-4"
          aria-label="open sidebar"
          class="btn btn-square btn-ghost"
        >
          {/* <!-- Sidebar toggle icon --> */}
          <PanelLeftOpen class="size-4" />
        </label>
        <div class="divider divider-horizontal w-0"></div>
        <div class="px-4">Navbar Title</div>
      </div>
      <ThemeSelector />
    </nav>
  );
}

function Sidebar() {
  const navigate = useNavigate();

  const links = [
    { title: "Home", url: "/", icon: House },
    { title: "About", url: "/about", icon: Info },
  ];

  return (
    <>
      <div class="p-4 flex flex-row items-center gap-3 w-full">
        <span class="text-xl">🔵</span>
        <span class="is-drawer-close:hidden text-lg font-bold whitespace-nowrap overflow-hidden">
          SolidStart DaisyUI
        </span>
      </div>
      <ul class="menu w-full grow">
        <For each={links}>
          {(item) => (
            <SidebarItem
              title={item.title}
              icon={item.icon}
              onClick={() => navigate(item.url)}
            />
          )}
        </For>
      </ul>
    </>
  );
}

interface SidebarItemProps {
  title: string;
  icon: any;
  onClick: () => void;
}

function SidebarItem(props: SidebarItemProps) {
  return (
    <li>
      <button
        class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
        data-tip={props.title}
        onclick={props.onClick}
      >
        <Dynamic component={props.icon} class="size-4" />
        <span class="is-drawer-close:hidden whitespace-nowrap">
          {props.title}
        </span>
      </button>
    </li>
  );
}
