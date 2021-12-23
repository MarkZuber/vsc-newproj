import * as vscode from "vscode";
import { ProjectCreator, ProjectLanguage } from "./projectCreator";

// called when extension is activated
export async function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vsc-newproj" is now active!');

  let disposable = vscode.commands.registerCommand(
    "vsc-newproj.createNewProject",
    async () => {
      vscode.window.showInformationMessage("Creating new project...!");

      const creator = new ProjectCreator();
      const selectedLanguage = await vscode.window.showQuickPick(
        creator.getProjectLanguages().map((x) => x.getName()),
        { title: "Select the Language for your new project" }
      );
      if (selectedLanguage) {
        const projectLanguage =
          creator.getProjectLanguageByName(selectedLanguage);

        if (projectLanguage) {
          const selectedProjectDescription = await vscode.window.showQuickPick(
            projectLanguage.getProjectTypes().map((x) => x.getShortDesc())
          );
          if (selectedProjectDescription) {
            const projectType = projectLanguage.getProjectTypeByShortDesc(
              selectedProjectDescription
            );

            if (projectType) {
              const fileUri = await vscode.window.showOpenDialog({
                title: "Pick a folder for the root of your project",
                canSelectFiles: false,
                canSelectFolders: true,
                canSelectMany: false,
              });

              if (fileUri) {
                const projectName = await vscode.window.showInputBox({
                  title: "Enter Project Name (will be dir name)",
                  placeHolder: "mynewproject",
                });

                const dirPath = fileUri[0].path;

                if (projectName) {
                  const commandRun = await projectType.createProject(
                    dirPath,
                    projectName
                  );
                  vscode.window.showInformationMessage(
                    `We ran this command: ${commandRun}`
                  );
                }
              }
            }
          }
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}

// called when extension is deactivated
export function deactivate() {}
