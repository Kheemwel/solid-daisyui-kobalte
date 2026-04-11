import { createMediaQuery } from "@solid-primitives/media";
import { Accessor } from "solid-js";

const DEFAULT_MOBILE_BREAKPOINT = 768;

export function createIsMobile(
  breakpoint: number = DEFAULT_MOBILE_BREAKPOINT,
): Accessor<boolean> {
  // max-width: 767px  →  mobile
  return createMediaQuery(`(max-width: ${breakpoint - 1}px)`);
}
