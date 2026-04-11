import { Router, useLocation, useNavigate } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { For, JSX, Suspense, createSignal, createEffect } from "solid-js";
import "./app.css";
import { House, Info, MonitorPlay, PanelLeftOpen, X } from "lucide-solid";
import { Dynamic } from "solid-js/web";
import ThemeSelector from "./shared/components/ThemeSelector";

import { Dialog } from "@kobalte/core/dialog";
import { Tooltip } from "@kobalte/core/tooltip";

import { createIsMobile } from "~/shared/hooks/is-mobile"; // adjust path if needed
import { Button } from "@kobalte/core/button";

export default function App() {
  return (
    <Router
      root={(props) => (
        <Layout>
          <Suspense>{props.children}</Suspense>
        </Layout>
      )}
    >
      <FileRoutes />
    </Router>
  );
}

function Layout(props: { children: JSX.Element }) {
  const isMobile = createIsMobile();
  const [isCollapsed, setIsCollapsed] = createSignal(false); // Desktop collapse state
  const [isDrawerOpen, setIsDrawerOpen] = createSignal(false); // Mobile drawer

  // Close mobile drawer when switching to desktop
  createEffect(() => {
    if (!isMobile()) setIsDrawerOpen(false);
  });

  const toggleSidebar = () => {
    if (isMobile()) {
      setIsDrawerOpen((prev) => !prev);
    } else {
      setIsCollapsed((prev) => !prev);
    }
  };

  return (
    <div class="flex h-screen overflow-hidden bg-base-100 text-base-content">
      {/* === DESKTOP SIDEBAR (collapsible) === */}
      <div
        class={`hidden md:block border-r border-base-content/10 bg-base-200 transition-all duration-300 ease-in-out overflow-hidden ${isCollapsed() ? "w-20" : "w-64"}`}
      >
        <SidebarContent
          isOpen={!isCollapsed()}
          onToggle={toggleSidebar}
          onNavigate={() => {}} // no-op on desktop
          isMobile={false}
        />
      </div>

      {/* === MOBILE DRAWER === */}
      <Dialog open={isDrawerOpen()} onOpenChange={setIsDrawerOpen}>
        <Dialog.Portal>
          <Dialog.Overlay class="fixed inset-0 bg-black/60 z-50 data-closed:animate-fade-out data-expanded:animate-fade-in" />
          <Dialog.Content class="fixed inset-y-0 left-0 z-50 w-64 bg-base-200 border-r border-base-content/10 shadow-2xl overflow-hidden focus:outline-none data-closed:animate-drawer-out data-expanded:animate-drawer-in">
            <SidebarContent
              isOpen={true}
              onToggle={toggleSidebar}
              onNavigate={() => setIsDrawerOpen(false)}
              isMobile={true}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>

      {/* === MAIN CONTENT === */}
      <div class="flex flex-1 flex-col overflow-hidden">
        <Header
          onToggle={toggleSidebar}
          isMobile={isMobile()}
          isCollapsed={isCollapsed()}
        />
        <main class="flex-1 overflow-y-auto p-4">{props.children}</main>
      </div>
    </div>
  );
}

function Header(props: {
  onToggle: () => void;
  isMobile: boolean;
  isCollapsed: boolean;
}) {
  return (
    <nav class="navbar sticky top-0 z-20 bg-base-300 border-b border-base-content/10 shadow-sm px-4 py-0 h-16 flex items-center">
      <div class="flex w-full items-center h-14">
        <button
          onClick={props.onToggle}
          class="btn btn-square btn-ghost"
          aria-label={
            props.isMobile
              ? "Open menu"
              : props.isCollapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
          }
        >
          <PanelLeftOpen class="size-4" />
        </button>

        <div class="divider divider-horizontal w-0" />
        <div class="px-4 text-lg font-medium">Navbar Title</div>
      </div>

      <ThemeSelector />
    </nav>
  );
}

function SidebarContent(props: {
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: () => void;
  isMobile: boolean;
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { title: "Home", url: "/", icon: House },
    { title: "About", url: "/about", icon: Info },
    { title: "Button", url: "/demo/button", icon: MonitorPlay },
  ];

  const handleLinkClick = (url: string) => {
    navigate(url);
    if (props.isMobile) props.onNavigate(); // close drawer on mobile
  };

  return (
    <>
      {/* Logo Area */}
      <div class="h-16 px-2 lg:px-6 flex items-center border-b border-base-content/10 overflow-hidden ">
        <span class="text-2xl shrink-0">🔵</span>

        <div
          class={`w-full flex items-center overflow-hidden transition-all duration-300 ease-in-out ${props.isOpen ? "w-40 opacity-100 translate-x-0 ml-3" : "w-0 opacity-0 -translate-x-2 pointer-events-none"}`}
        >
          <span class="text-md lg:text-lg font-bold whitespace-nowrap">
            SolidStart App
          </span>
        </div>

        {props.isMobile && (
          <Button
            onClick={props.onToggle}
            class="ml-auto btn btn-square btn-ghost btn-sm"
            aria-label="Close menu"
          >
            <X class="size-4" />
          </Button>
        )}
      </div>

      {/* Menu */}
      <ul class="menu w-full flex-1 p-2">
        <For each={links}>
          {(item) => (
            <SidebarItem
              title={item.title}
              icon={item.icon}
              isActive={location.pathname === item.url}
              onClick={() => handleLinkClick(item.url)}
              isOpen={props.isOpen}
              isMobile={props.isMobile}
            />
          )}
        </For>
      </ul>
    </>
  );
}

function SidebarItem(props: {
  title: string;
  icon: any;
  onClick: () => void;
  isActive: boolean;
  isOpen: boolean;
  isMobile: boolean;
}) {
  return (
    <li>
      <Tooltip
        placement="right"
        openDelay={100}
        closeDelay={0}
        disabled={props.isOpen || props.isMobile}
      >
        <Tooltip.Trigger
          onClick={props.onClick}
          class={`btn ${props.isActive ? "bg-primary text-primary-content" : "hover:bg-neutral"}`}
        >
          <Dynamic
            component={props.icon}
            class={`transition-all duration-300 ease-in-out ${props.isOpen ? "size-4" : "size-5"}`}
          />

          <span
            class={`whitespace-nowrap  flex items-center overflow-hidden transition-all duration-300 ease-in-out ${props.isOpen || props.isMobile ? "w-40 opacity-100 translate-x-0 ml-3" : "w-0 opacity-0 -translate-x-2 pointer-events-none "}`}
          >
            {props.title}
          </span>
        </Tooltip.Trigger>

        <Tooltip.Portal>
          <Tooltip.Content class="tooltip tooltip-right bg-base-300 text-base-content px-3 py-1.5 rounded shadow-md">
            <Tooltip.Arrow />
            {props.title}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip>
    </li>
  );
}
