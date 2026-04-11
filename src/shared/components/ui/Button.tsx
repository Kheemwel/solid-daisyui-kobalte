import { Button as KobalteButton } from "@kobalte/core/button";
import { splitProps, JSX } from "solid-js";

type ButtonProps = {
  variant?:
    | "outline"
    | "ghost"
    | "soft"
    | "active"
    | "wide"
    | "dash"
    | "link"
    | "block";
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "neutral";
  size?: "xs" | "sm" | "lg" | "xl";
  shape?: "square" | "circle";
  class?: string;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(props: ButtonProps) {
  const [local, others] = splitProps(props, [
    "variant",
    "color",
    "size",
    "shape",
    "class",
    "children",
  ]);

  // Map props to full class strings so Tailwind JIT can "see" them
  const variantMap = {
    outline: "btn-outline",
    ghost: "btn-ghost",
    soft: "btn-soft",
    active: "btn-active",
    wide: "btn-wide",
    dash: "btn-dash",
    link: "btn-link",
    block: "btn-block",
  };

  const colorMap = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    accent: "btn-accent",
    info: "btn-info",
    success: "btn-success",
    warning: "btn-warning",
    error: "btn-error",
    neutral: "btn-neutral",
  };

  const sizeMap = { xs: "btn-xs", sm: "btn-sm", lg: "btn-lg", xl: "btn-xl" };
  const shapeMap = { square: "btn-square", circle: "btn-circle" };

  const classList = [
    "btn",
    local.variant && variantMap[local.variant],
    local.color && colorMap[local.color],
    local.size && sizeMap[local.size],
    local.shape && shapeMap[local.shape],
    local.class,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <KobalteButton {...others} class={classList}>
      {local.children}
    </KobalteButton>
  );
}
