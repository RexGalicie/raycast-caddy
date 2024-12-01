# Caddy Manager Raycast Extension

A Raycast extension to simplify working with the Caddy server. It provides an intuitive way to manage configurations and perform common server actions like enabling configurations, reloading, starting, stopping all from your Raycast interface.

---

## Features

- **Enable Configuration**: Quickly create symbolic links to enable Caddy configuration files.
- **Reload Configuration**: Reload the Caddy server to apply changes.
- **Start Server**: Start the Caddy server in the background.
- **Stop Server**: Stop the running Caddy server.

---

## How to Use

1. **Set up paths**:

   - The first time you use the extension, you need to provide the following:
     - The path to the Caddy binary.
     - The path to the folder where your `enabled-sites` are located.
   - These paths are required for the extension to function correctly.

2. **Run the main command**:

   - Use the single main command: `Manage Caddy Server`.
   - This command acts as your central tool for all server management actions.
   - Depending on the context, it can:
     - Enable configuration files by creating symbolic links.
     - Reload the server configuration.
     - Start or stop the server.

3. **Create symbolic links**:
   - To enable a configuration file:
     - Place your Caddy configuration file in the appropriate directory.
     - Use the `Manage Caddy Server` command to create a symbolic link automatically in the `enabled-sites` directory.
   - The extension takes care of creating the necessary symbolic link and updating the server configuration.

---

## Commands

### `Manage Caddy Server`

- **Description**: A single command that handles all key server management actions, including enabling configurations, reloading, starting, stopping, and checking the status of the server.
- **Usage**: Simply trigger this command from Raycast. Follow any prompts to perform the desired action.

---

## Getting Started

1. Install the extension via Raycast.
2. Open Raycast and search for the `Manage Caddy Server` command.
3. On first use, provide the required paths for the Caddy binary and the `enabled-sites` folder.
4. Start managing your Caddy server with ease.

---

## Notes

- Ensure that the provided paths are valid and accessible.
- The extension automates common tasks, but you must have appropriate permissions to manage Caddy files and processes.

---
