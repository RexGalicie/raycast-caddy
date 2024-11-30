import { Detail, ActionPanel, Action } from "@raycast/api";
import CreateSymlinkForm from "./CreateSymlinkForm";
import runCommand from "../utils/runCommand";

export default function CommandList({ caddyPath }: Readonly<{ caddyPath: string }>) {
  return (
    <Detail
      markdown={`
# Setup Complete

### Details
The path "${caddyPath}" has been successfully validated and saved. Ensure Caddy is installed on your system.

### Available Commands
- **Create Symlink**
- **Reload Caddy**
- **Start Caddy**
- **Stop Caddy**

You are all set to use the Caddy commands!
`}
      actions={
        <ActionPanel>
          <Action.Push title="Create Symlink" target={<CreateSymlinkForm caddyPath={caddyPath} />} />
          <Action title="Reload Caddy" onAction={() => runCommand(`reload`, caddyPath)} />
          <Action title="Start Caddy" onAction={() => runCommand(`start`, caddyPath)} />
          <Action title="Stop Caddy" onAction={() => runCommand(`stop`, caddyPath)} />
        </ActionPanel>
      }
    />
  );
}
