import * as vscode from "vscode";

// called when extension is activated
export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vsc-newproj" is now active!');

  let disposable = vscode.commands.registerCommand(
    "vsc-newproj.createNewProject",
    () => {
      vscode.window.showInformationMessage("Creating new project...!");
    }
  );

  context.subscriptions.push(disposable);
}

// called when extension is deactivated
export function deactivate() {}
