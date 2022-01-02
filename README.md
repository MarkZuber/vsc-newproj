# vsc-newproj README

This is a VSCode Extension to enable quick creation of new projects in a variety of languages. It will create the project type you wish in the language you select and then open a new workspace window in that project directory to get working right away.

I always found it to be too many steps have to go out to the command line and create a project in the right spot and then open it in VSCode. So this lets you do it right from with VSCode itself.

## Features

Using the command palette:

- Run the "Create New Project" command.
- Then pick your language (e.g. Rust, Dotnet)
- Then pick the subtype of the project (e.g lib/bin for Rust or console/classlib for Dotnet)
- Then pick the parent directory of the project
- Then type in a name for the project itself. This will also be the child directory from the parent where the project code will end up.

After this is done, the extension will generate your code, for example using cargo or the dotnet command line) and open a new workspace for VSCode in your target directory so you can immediately get to work.

## Requirements

For any languages you wish to use (e.g. Rust, Dotnet) you will need the appropriate tools already installed.

For Rust, it runs "cargo new" so you'll need to follow the instructions to install Rust/Cargo on your machine.

Similar for Dotnet.

Other languages coming later as there is need/demand.

## Extension Settings

The extension currently does not have any settings. Open to ideas if configuration options for the extension would make sense.

## Known Issues

None yet, brand new extension.

## Release Notes

### 0.0.2

Add --vcs git to cargo new to ensure .gitignore is created.

### 0.0.1

Initial release of vsc-newproj

---
