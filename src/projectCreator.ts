import { ProjectType } from "./projectType";
import { DotnetLanguage, RustLanguage } from "./languages";
import { ProjectLanguage } from "./projectLanguage";

export class ProjectCreator {
  private languages: ProjectLanguage[] = [
    new RustLanguage(),
    new DotnetLanguage(),
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
