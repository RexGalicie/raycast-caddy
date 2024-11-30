import { Form, ActionPanel, Action, showToast, Toast, useNavigation } from "@raycast/api";
import { useState } from "react";
import { exec } from "child_process";
import path from "path";
import fs from "fs";

export default function CreateSymlinkForm({ caddyPath }: Readonly<{ caddyPath: string }>) {
  const [values, setValues] = useState({ targetPath: "", configName: "" });
  const [targetPathError, setTargetPathError] = useState<string | undefined>(undefined);
  const [configNameError, setConfigNameError] = useState<string | undefined>(undefined);

  const { pop } = useNavigation();

  const validateTargetPath = (filePath: string) => {
    if (!filePath || filePath.trim() === "") {
      setTargetPathError("Path is required.");
      return false;
    }

    if (!fs.existsSync(filePath)) {
      setTargetPathError("The specified path does not exist.");
      return false;
    }

    if (!fs.statSync(filePath).isFile()) {
      setTargetPathError("The specified path is not a file.");
      return false;
    }

    setTargetPathError(undefined);
    return true;
  };

  const validateConfigName = (name: string) => {
    if (!name || name.trim() === "") {
      setConfigNameError("Config name is required.");
      return false;
    }

    setConfigNameError(undefined);
    return true;
  };

  const handleSubmit = () => {
    const isTargetPathValid = validateTargetPath(values.targetPath);
    const isConfigNameValid = validateConfigName(values.configName);

    if (!isTargetPathValid || !isConfigNameValid) {
      return;
    }

    const symlinkPath = path.join(caddyPath, "sites-enabled", values.configName);
    const command = `ln -s ${values.targetPath} ${symlinkPath}`;

    exec(command, (error) => {
      if (error) {
        showToast(Toast.Style.Failure, "Error", error.message);
      } else {
        showToast(Toast.Style.Success, "Symlink Created", `Symlink created for ${values.configName}`);
        // Reset form and navigate back to the main screen
        setValues({ targetPath: "", configName: "" });
        pop();
      }
    });
  };

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Create Symlink" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField
        id="targetPath"
        title="Target Path"
        placeholder="Absolute path to the target file"
        value={values.targetPath}
        error={targetPathError}
        onChange={(newValue) => {
          setValues((prev) => ({ ...prev, targetPath: newValue }));
          if (targetPathError) validateTargetPath(newValue); // Revalidate on change
        }}
        onBlur={() => validateTargetPath(values.targetPath)} // Validate on blur
      />
      <Form.TextField
        id="configName"
        title="Config Name"
        placeholder="Name of the symlink config"
        value={values.configName}
        error={configNameError}
        onChange={(newValue) => {
          setValues((prev) => ({ ...prev, configName: newValue }));
          if (configNameError) validateConfigName(newValue); // Revalidate on change
        }}
        onBlur={() => validateConfigName(values.configName)} // Validate on blur
      />
    </Form>
  );
}
