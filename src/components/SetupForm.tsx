import { Form, ActionPanel, Action, showToast, Toast } from "@raycast/api";
import { useLocalStorage } from "@raycast/utils";
import CommandList from "./CommandList";
import validatePath from "../utils/validatePath";

export default function SetupForm(props: { onComplete: (nextScreen: JSX.Element) => void }) {
  const { setValue: setCaddyPath } = useLocalStorage<string | null>("caddyPath", null);

  const handleSubmit = async (values: { path: string }) => {
    const validation = await validatePath(values.path);

    if (!validation.success) {
      showToast(Toast.Style.Failure, validation.message, validation.details);
      return;
    }

    await setCaddyPath(values.path);
    showToast(Toast.Style.Success, "Path Saved", "Caddy path has been saved successfully!");

    // Automatically transition to the CommandList screen
    props.onComplete(<CommandList caddyPath={values.path} />);
  };

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Validate and Save Path" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="path" title="Caddy Folder Path" placeholder="/absolute/path/to/caddy-folder" />
    </Form>
  );
}
