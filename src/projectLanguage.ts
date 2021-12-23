import { ProjectType } from "./projectType";

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
