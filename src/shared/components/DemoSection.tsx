import { JSX } from "solid-js";

export default function DemoSection(props: {
  title: string;
  children: JSX.Element;
}) {
  return (
    <div class="flex flex-col gap-4 items-start">
      <p class="text-lg font-bold">{props.title}</p>
      <div class="w-full rounded p-6 border border-base-content flex flex-row justify-center items-center gap-4">
        {props.children}
      </div>
    </div>
  );
}
