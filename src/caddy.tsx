import { useLocalStorage } from "@raycast/utils";
import { useState } from "react";
import SetupForm from "./components/SetupForm";
import CommandList from "./components/CommandList";

export default function Command() {
  const { value: caddyPath } = useLocalStorage<string | null>("caddyPath", null);
  const [screen, setScreen] = useState<JSX.Element | null>(null);

  if (screen) {
    return screen;
  }

  if (!caddyPath) {
    return <SetupForm onComplete={setScreen} />;
  }

  return <CommandList caddyPath={caddyPath} />;
}
