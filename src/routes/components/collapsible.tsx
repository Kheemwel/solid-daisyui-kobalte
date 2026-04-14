import { Moon, Sun } from "lucide-solid";
import DemoSection from "~/shared/components/DemoSection";
import Collapsible from "~/shared/components/ui/Collapsible";

export default function CollapsibleDemo() {
  return (
    <div class="p-4 pb-24 flex flex-col gap-10">
      <DemoSection title="Collapsible">
        <Collapsible title={<span>What is Kobalte?</span>}>
          <p>
            Kobalte is a UI toolkit for building accessible web apps and design
            systems with SolidJS. It provides a set of low-level UI components
            and primitives which can be the foundation for your design system
            implementation.
          </p>
        </Collapsible>
      </DemoSection>

      <DemoSection title="Collapsible With Arrow Plus/Minus Icon">
        <Collapsible title={<span>What is Kobalte?</span>} icon={"plus-minus"}>
          <p>
            Kobalte is a UI toolkit for building accessible web apps and design
            systems with SolidJS. It provides a set of low-level UI components
            and primitives which can be the foundation for your design system
            implementation.
          </p>
        </Collapsible>
      </DemoSection>

      <DemoSection title="Collapsible With Custom Icon">
        <Collapsible
          title={<span>What is Kobalte?</span>}
          icon={{
            open: <Sun />,
            closed: <Moon />,
          }}
        >
          <p>
            Kobalte is a UI toolkit for building accessible web apps and design
            systems with SolidJS. It provides a set of low-level UI components
            and primitives which can be the foundation for your design system
            implementation.
          </p>
        </Collapsible>
      </DemoSection>

      <DemoSection title="Collapsible With No Icon">
        <Collapsible title={<span>What is Kobalte?</span>} icon={"none"}>
          <p>
            Kobalte is a UI toolkit for building accessible web apps and design
            systems with SolidJS. It provides a set of low-level UI components
            and primitives which can be the foundation for your design system
            implementation.
          </p>
        </Collapsible>
      </DemoSection>

      <DemoSection title="Collapsible With Custom Border and Divider Color">
        <Collapsible
          title={<span>What is Kobalte?</span>}
          borderColor={"content"}
          dividerColor={"content"}
        >
          <p>
            Kobalte is a UI toolkit for building accessible web apps and design
            systems with SolidJS. It provides a set of low-level UI components
            and primitives which can be the foundation for your design system
            implementation.
          </p>
        </Collapsible>
      </DemoSection>

      <DemoSection title="Collapsible Without Divider">
        <Collapsible
          defaultOpen={true}
          title={<span>What is Kobalte?</span>}
          borderColor={"content"}
          showDivider={false}
        >
          <p>
            Kobalte is a UI toolkit for building accessible web apps and design
            systems with SolidJS. It provides a set of low-level UI components
            and primitives which can be the foundation for your design system
            implementation.
          </p>
        </Collapsible>
      </DemoSection>

      <DemoSection title="Collapsible Without Border And Divider">
        <Collapsible
          title={<span>What is Kobalte?</span>}
          showBorder={false}
          showDivider={false}
        >
          <p>
            Kobalte is a UI toolkit for building accessible web apps and design
            systems with SolidJS. It provides a set of low-level UI components
            and primitives which can be the foundation for your design system
            implementation.
          </p>
        </Collapsible>
      </DemoSection>
    </div>
  );
}
