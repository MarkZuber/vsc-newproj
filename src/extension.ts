import * as vscode from "vscode";
import { ProjectCreator } from "./projectCreator";

export async function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vsc-newproj" is now active!');

  let disposable = vscode.commands.registerCommand(
    "vsc-newproj.createNewProject",
    async () => {
      const workspaceConfig = vscode.workspace.getConfiguration("vsc-newproj");
      const defaultLanguageConfig: string | undefined =
        workspaceConfig.get("defaultLanguage");
      const defaultProjectType: string | undefined = workspaceConfig.get("defaultProjectType");
      const defaultProjectRootConfig: string | undefined =
        workspaceConfig.get("defaultProjectRoot");

      const creator = new ProjectCreator();
      const selectedLanguage =
        defaultLanguageConfig ||
        (await vscode.window.showQuickPick(
          creator
            .getProjectLanguages()
            .map((x) => x.getName())
            .sort(),
          { title: "Select the Language for your new project" }
        ));
      if (selectedLanguage) {
        const projectLanguage =
          creator.getProjectLanguageByName(selectedLanguage);

        if (projectLanguage) {
          const selectedProjectDescription = defaultProjectType || await vscode.window.showQuickPick(
            projectLanguage.getProjectTypes().map((x) => x.getShortDesc()),
            { title: `Select project type for your ${projectLanguage.getName()} project` }
          );
          if (selectedProjectDescription) {
            const projectType = projectLanguage.getProjectTypeByShortDesc(
              selectedProjectDescription
            );

            if (projectType) {
              let dirPath = defaultProjectRootConfig;
              if (!dirPath) {
                const fileUri = await vscode.window.showOpenDialog({
                  title: `Pick a root folder for your ${projectLanguage.getName()}/${projectType.getShortDesc()} project`,
                  canSelectFiles: false,
                  canSelectFolders: true,
                  canSelectMany: false,
                });

                if (fileUri) {
                  dirPath = fileUri[0].path;
                }
              }

              if (dirPath) {
                const projectName = await vscode.window.showInputBox({
                  title: `Enter Project/Dir Name for project lang/type: ${projectLanguage.getName()}/${projectType.getShortDesc()}`,
                  placeHolder: "mynewproject",
                });

                if (projectName) {
                  await projectType.createProject(dirPath, projectName);
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

export function deactivate() { }
