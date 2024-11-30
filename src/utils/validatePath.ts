import fs from "fs";
import path from "path";

export default async function validatePath(userPath: string) {
  if (!fs.existsSync(userPath)) {
    return { success: false, message: "Invalid Path", details: "The provided path does not exist." };
  }

  const caddyFilePath = path.join(userPath, "Caddyfile");
  const sitesEnabledPath = path.join(userPath, "sites-enabled");

  if (!fs.existsSync(caddyFilePath)) {
    return { success: false, message: "Caddyfile Missing", details: "No Caddyfile found in the specified path." };
  }

  if (!fs.existsSync(sitesEnabledPath)) {
    return { success: false, message: "Sites-Enabled Missing", details: "No sites-enabled folder found." };
  }

  return { success: true };
}
