import * as vscode from "vscode";
import * as util from "util";
import * as cp from "child_process";
const exec = util.promisify(cp.exec);

export abstract class ProjectType {
  constructor(private shortDesc: string) {}

  public getShortDesc(): string {
    return this.shortDesc;
  }

  public abstract createProject(
    directoryPath: string,
    projectName: string
  ): Promise<void>;

  protected async executeCommandAndOpenProject(
    command: string,
    projectDir: string
  ): Promise<void> {
    try {
      const { stdout, stderr } = await exec(command);
      console.log("stdout: " + stdout);
      console.log("stderr: " + stderr);

      vscode.commands.executeCommand(
        "vscode.openFolder",
        vscode.Uri.parse(projectDir),
        {
          forceNewWindow: true,
        }
      );
    } catch (error) {
      console.log("error: " + error);
    }
  }
}
