import * as path from "path";
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
  ): Promise<string>;
}

class RustProjectType extends ProjectType {
  constructor(shortDesc: string) {
    super(shortDesc);
  }

  public async createProject(
    directoryPath: string,
    projectName: string
  ): Promise<string> {
    const targetDir = path.join(directoryPath, projectName.replace(" ", ""));
    const command = `cargo new --${this.getShortDesc()} ${targetDir}`;

    try {
      const { stdout, stderr } = await exec(command);
      console.log("stdout: " + stdout);
      console.log("stderr: " + stderr);

      vscode.commands.executeCommand(
        "vscode.openFolder",
        vscode.Uri.parse(targetDir),
        {
          forceNewWindow: true,
        }
      );
    } catch (error) {
      console.log("error: " + error);
    }

    return command;
  }
}

export class ProjectLanguage {
  constructor(private name: string, private projectTypes: ProjectType[]) {}
  public getName(): string {
    return this.name;
  }

  public getProjectTypes(): ProjectType[] {
    return this.projectTypes;
  }

  public getProjectTypeByShortDesc(shortDesc: string): ProjectType | undefined {
    const filtered = this.projectTypes.filter(
      (x) => x.getShortDesc() === shortDesc
    );
    return filtered.length === 1 ? filtered[0] : undefined;
  }
}

export class ProjectCreator {
  private languages = [
    new ProjectLanguage("Rust", [
      new RustProjectType("lib"),
      new RustProjectType("bin"),
    ]),
  ];

  public getProjectLanguages(): ProjectLanguage[] {
    return this.languages;
  }

  public getProjectLanguageByName(
    languageName: string
  ): ProjectLanguage | undefined {
    const filtered = this.languages.filter((x) => x.getName() === languageName);
    if (filtered.length === 1) {
      return filtered[0];
    }
    return undefined;
  }
}
