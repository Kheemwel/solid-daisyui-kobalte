import { Heart, Star } from "lucide-solid";
import { JSX } from "solid-js";
import Button from "~/shared/components/ui/Button";

export default function ButtonDemo() {
  return (
    <div class="p-4 pb-24 flex flex-col gap-10">
      <ButtonDemoSection title="Button">
        <Button>Default</Button>
      </ButtonDemoSection>

      <ButtonDemoSection title="Buttons Sizes">
        <Button size="xs">Extra Small</Button>
        <Button size="sm">Small</Button>
        <Button>Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">Extra Large</Button>
      </ButtonDemoSection>

      <ButtonDemoSection title="Buttons Colors">
        <Button color="neutral">Neutral</Button>
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="accent">Accent</Button>
        <Button color="info">Info</Button>
        <Button color="success">Success</Button>
        <Button color="warning">Warning</Button>
        <Button color="error">Error</Button>
      </ButtonDemoSection>

      <ButtonDemoSection title="Soft Buttons">
        <Button variant="soft">Default</Button>
        <Button variant="soft" color="neutral">
          Neutral
        </Button>
        <Button variant="soft" color="primary">
          Primary
        </Button>
        <Button variant="soft" color="secondary">
          Secondary
        </Button>
        <Button variant="soft" color="accent">
          Accent
        </Button>
        <Button variant="soft" color="info">
          Info
        </Button>
        <Button variant="soft" color="success">
          Success
        </Button>
        <Button variant="soft" color="warning">
          Warning
        </Button>
        <Button variant="soft" color="error">
          Error
        </Button>
      </ButtonDemoSection>

      <ButtonDemoSection title="Outline Buttons">
        <Button variant="outline">Default</Button>
        <Button variant="outline" color="neutral">
          Neutral
        </Button>
        <Button variant="outline" color="primary">
          Primary
        </Button>
        <Button variant="outline" color="secondary">
          Secondary
        </Button>
        <Button variant="outline" color="accent">
          Accent
        </Button>
        <Button variant="outline" color="info">
          Info
        </Button>
        <Button variant="outline" color="success">
          Success
        </Button>
        <Button variant="outline" color="warning">
          Warning
        </Button>
        <Button variant="outline" color="error">
          Error
        </Button>
      </ButtonDemoSection>

      <ButtonDemoSection title="Dash Buttons">
        <Button variant="dash">Default</Button>
        <Button variant="dash" color="neutral">
          Neutral
        </Button>
        <Button variant="dash" color="primary">
          Primary
        </Button>
        <Button variant="dash" color="secondary">
          Secondary
        </Button>
        <Button variant="dash" color="accent">
          Accent
        </Button>
        <Button variant="dash" color="info">
          Info
        </Button>
        <Button variant="dash" color="success">
          Success
        </Button>
        <Button variant="dash" color="warning">
          Warning
        </Button>
        <Button variant="dash" color="error">
          Error
        </Button>
      </ButtonDemoSection>

      <ButtonDemoSection title="Active Buttons">
        <Button variant="active">Default</Button>
        <Button variant="active" color="neutral">
          Neutral
        </Button>
        <Button variant="active" color="primary">
          Primary
        </Button>
        <Button variant="active" color="secondary">
          Secondary
        </Button>
        <Button variant="active" color="accent">
          Accent
        </Button>
        <Button variant="active" color="info">
          Info
        </Button>
        <Button variant="active" color="success">
          Success
        </Button>
        <Button variant="active" color="warning">
          Warning
        </Button>
        <Button variant="active" color="error">
          Error
        </Button>
      </ButtonDemoSection>

      <ButtonDemoSection title="Button Ghost and Button Link">
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </ButtonDemoSection>

      <ButtonDemoSection title="Wide Button">
        <Button variant="wide">Wide</Button>
      </ButtonDemoSection>

      <ButtonDemoSection title="Block Button">
        <Button variant="block">Block</Button>
      </ButtonDemoSection>

      <ButtonDemoSection title="Square Button and Circle Button">
        <Button shape="square">
          <Heart />
        </Button>
        <Button shape="circle">
          <Star />
        </Button>
      </ButtonDemoSection>

      <ButtonDemoSection title="Disabled Button">
        <Button disabled={true}>Disabled</Button>
      </ButtonDemoSection>

      <ButtonDemoSection title="Buttons with Icon">
        <Button>
          <Heart class="size-4" /> Heart
        </Button>
        <Button>
          Star <Star class="size-4" />
        </Button>
      </ButtonDemoSection>
    </div>
  );
}

function ButtonDemoSection(props: { title: string; children: JSX.Element }) {
  return (
    <div class="flex flex-col gap-4 items-start">
      <p class="text-lg font-bold">{props.title}</p>
      <div class="w-full rounded p-6 border border-base-content flex flex-row justify-center items-center gap-4">
        {props.children}
      </div>
    </div>
  );
}
