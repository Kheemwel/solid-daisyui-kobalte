import { Button as KobalteButton } from "@kobalte/core/button";
import { splitProps, JSX, ComponentProps } from "solid-js";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

export const buttonVariants = cva("btn", {
  variants: {
    variant: {
      outline: "btn-outline",
      ghost: "btn-ghost",
      soft: "btn-soft",
      active: "btn-active",
      wide: "btn-wide",
      dash: "btn-dash",
      link: "btn-link",
      block: "btn-block",
    },
    color: {
      primary: "btn-primary",
      secondary: "btn-secondary",
      accent: "btn-accent",
      info: "btn-info",
      success: "btn-success",
      warning: "btn-warning",
      error: "btn-error",
      neutral: "btn-neutral",
    },
    size: {
      xs: "btn-xs",
      sm: "btn-sm",
      lg: "btn-lg",
      xl: "btn-xl",
    },
    shape: {
      square: "btn-square",
      circle: "btn-circle",
    },
  },
  defaultVariants: {
    // You can define default styles here
  },
});

export type ButtonProps = ComponentProps<typeof KobalteButton> &
  VariantProps<typeof buttonVariants> & {
    class?: string;
    href?: string;
  };

export default function Button(props: ButtonProps) {
  const [local, others] = splitProps(props, [
    "variant",
    "color",
    "size",
    "shape",
    "class",
    "children",
  ]);

  return (
    <KobalteButton
      {...others}
      as={others.href ? "a" : "button"}
      class={cn(
        buttonVariants({
          variant: local.variant,
          color: local.color,
          size: local.size,
          shape: local.shape,
        }),
        local.class,
      )}
    >
      {local.children}
    </KobalteButton>
  );
}
