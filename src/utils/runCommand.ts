import { exec } from "child_process";
import { showToast, Toast } from "@raycast/api";

export default function runCommand(command: string, contextPath: string) {
  // Define a proper PATH explicitly
  const env = {
    ...process.env,
    PATH: "/usr/local/bin:/opt/homebrew/bin:/bin:/usr/bin:/usr/sbin:/sbin",
  };

  exec("which caddy", { env }, (whichError, caddyPath) => {
    if (whichError) {
      showToast(Toast.Style.Failure, "Caddy Not Found", "Ensure Caddy is installed and in your PATH.");
      return;
    }

    caddyPath = caddyPath.trim();

    const fullCommand = `cd ${contextPath} && ${caddyPath} ${command}`;
    console.log(fullCommand);
    exec(fullCommand, { env }, (error) => {
      if (error) {
        showToast(Toast.Style.Failure, "Error", error.message);
      } else {
        showToast(Toast.Style.Success, "Success", "Command executed successfully.");
      }
    });
  });
}
