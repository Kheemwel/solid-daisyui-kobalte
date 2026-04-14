import { Collapsible as KobalteCollapsible } from "@kobalte/core/collapsible";
import { cva, VariantProps } from "class-variance-authority";
import { ChevronDownIcon, MinusIcon, PlusIcon } from "lucide-solid";
import {
  ComponentProps,
  JSX,
  splitProps,
  Show,
  createMemo,
  Switch,
  Match,
} from "solid-js";
import { cn } from "~/shared/utils";

export const collapsibleRootVariants = cva(
  "rounded-box w-full overflow-hidden",
  {
    variants: {
      showBorder: {
        true: "border",
      },
      bgColor: {
        "100": "bg-base-100",
        "200": "bg-base-200",
        "300": "bg-base-300",
        content: "bg-base-content",
      },
      borderColor: {
        "100": "border-base-100",
        "200": "border-base-200",
        "300": "border-base-300",
        content: "border-base-content",
      },
    },
    defaultVariants: {
      showBorder: true,
      bgColor: "100",
      borderColor: "300",
    },
  },
);

export const collapsibleContentVariants = cva(
  "collapsible-content overflow-hidden",
  {
    variants: {
      showDivider: {
        true: "border-t",
      },
      dividerColor: {
        "100": "border-base-100",
        "200": "border-base-200",
        "300": "border-base-300",
        content: "border-base-content",
      },
    },
    defaultVariants: {
      showDivider: true,
      dividerColor: "300",
    },
  },
);

export type CollapsibleProps = ComponentProps<typeof KobalteCollapsible> &
  VariantProps<typeof collapsibleRootVariants> &
  VariantProps<typeof collapsibleContentVariants> & {
    class?: string;
    title?: JSX.Element;
    icon?:
      | "none"
      | "chevron"
      | "plus-minus"
      | {
          open: JSX.Element;
          closed: JSX.Element;
        };
    classNames?: {
      root?: string;
      trigger?: string;
      content?: string;
      inner?: string;
      icon?: string;
    };
  };

export default function Collapsible(props: CollapsibleProps) {
  const [local, rootVariants, contentVariants, others] = splitProps(
    props,
    ["class", "title", "children", "icon", "classNames"],
    ["showBorder", "bgColor", "borderColor"],
    ["showDivider", "dividerColor"],
  );

  const iconChoice = createMemo(() => local.icon ?? "chevron");

  return (
    <>
      <KobalteCollapsible
        {...others}
        class={cn(
          collapsibleRootVariants(rootVariants),
          local.class,
          local.classNames?.root,
        )}
      >
        <KobalteCollapsible.Trigger
          class={cn(
            "flex flex-row justify-between items-center p-2 w-full group",
            local.classNames?.trigger,
          )}
        >
          {local.title}
          <Show when={iconChoice() !== "none"}>
            <div
              class={cn(
                "transition-transform duration-300",
                iconChoice() === "chevron" && "group-data-expanded:rotate-180",
                local.classNames?.icon,
              )}
            >
              <Switch>
                <Match when={iconChoice() === "chevron"}>
                  <ChevronDownIcon />
                </Match>
                <Match when={iconChoice() === "plus-minus"}>
                  <div class="group-data-expanded:hidden">
                    <PlusIcon />
                  </div>
                  <div class="hidden group-data-expanded:block">
                    <MinusIcon />
                  </div>
                </Match>
                <Match when={typeof iconChoice() === "object"}>
                  <div class="group-data-expanded:hidden">
                    {(iconChoice() as { closed: JSX.Element }).closed}
                  </div>
                  <div class="hidden group-data-expanded:block">
                    {(iconChoice() as { open: JSX.Element }).open}
                  </div>
                </Match>
              </Switch>
            </div>
          </Show>
        </KobalteCollapsible.Trigger>
        <KobalteCollapsible.Content
          class={cn(
            collapsibleContentVariants(contentVariants),
            local.classNames?.content,
          )}
        >
          <div class={cn("p-2", local.classNames?.inner)}>{local.children}</div>
        </KobalteCollapsible.Content>
      </KobalteCollapsible>

      <style>{`
        .collapsible-content[data-expanded] {
          animation: slideDown 300ms cubic-bezier(0, 0, 0.2, 1);
        }
        .collapsible-content[data-closed] {
          animation: slideUp 300ms cubic-bezier(0.2, 0, 0, 1);
        }
        
        @keyframes slideDown {
          from { height: 0; }
          to { height: var(--kb-collapsible-content-height); }
        }
        
        @keyframes slideUp {
          from { height: var(--kb-collapsible-content-height); }
          to { height: 0; }
        }
      `}</style>
    </>
  );
}
