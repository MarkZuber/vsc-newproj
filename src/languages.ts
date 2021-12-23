import * as path from "path";
import { ProjectLanguage } from "./projectLanguage";
import { ProjectType } from "./projectType";

export class RustProjectType extends ProjectType {
  constructor(shortDesc: string) {
    super(shortDesc);
  }

  public async createProject(
    directoryPath: string,
    projectName: string
  ): Promise<void> {
    const projectDir = path.join(directoryPath, projectName.replace(" ", ""));
    const command = `cargo new --${this.getShortDesc()} ${projectDir}`;
    await this.executeCommandAndOpenProject(command, projectDir);
  }
}

export class RustLanguage extends ProjectLanguage {
  constructor() {
    super("Rust", [new RustProjectType("lib"), new RustProjectType("bin")]);
  }
}

export class DotnetProjectType extends ProjectType {
  constructor(shortDesc: string) {
    super(shortDesc);
  }

  public async createProject(
    directoryPath: string,
    projectName: string
  ): Promise<void> {
    const projectDir = path.join(directoryPath, projectName.replace(" ", ""));
    const command = `dotnet new --${this.getShortDesc()} --output ${projectDir}`;
    await this.executeCommandAndOpenProject(command, projectDir);
  }
}

export class DotnetLanguage extends ProjectLanguage {
  constructor() {
    super("Dotnet", [
      new DotnetProjectType("console"),
      new DotnetProjectType("classlib"),
    ]);
  }
}
