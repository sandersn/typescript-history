type Event = {
  date: string;
  title: string;
  description: string;
  notes?: string;
  skip?: boolean;
};
type Release = Event & {
  version: string;
  link: string;
};
type Events = Array<Event>;
type Releases = Array<Release>;
function isRelease(e: Event): e is Release {
  return "version" in e && "link" in e;
}
function mermaid(events: Events, title: string) {
  let s = "```mermaid\ntimeline\n    title " + title + "\n";
  for (const event of events) {
    if (event.skip) {
      continue;
    }
    const d = new Date(event.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    if (isRelease(event)) {
      s += `    ${d}: ${event.version} -- ${event.description} ${event.link.replace("https://", "")}\n`;
    } else {
      s += `    ${d}: ${event.title} -- ${event.description}\n`;
    }
  }
  s += "```";
  return s;
}
export const external: Events = [
  {
    date: "2012/10/05",
    title: "First commit in Definitely Typed",
    description: "First three types were for modernizr, underscore and jquery.",
  },
];
export const internal: Events = [
  {
    date: "2012/12/18",
    title: "Move build to jake",
    description: "Move build from nmake to jake.",
    notes: `Mentioned in [this blog post](https://devblogs.microsoft.com/typescript/working-on-0-8-2/).
    Initial commit is https://github.com/sandersn/typescript-codeplex/commit/09e212f08fcbd6b767994d0f1fd30562eaae0640`,
  },
  {
    date: "2014/07/21",
    title: "Move source to github and announce new compiler.",
    description: "Move source to github and announce 3rd compiler.",
    notes: `Mentioned in [this blog post](https://devblogs.microsoft.com/typescript/new-compiler-and-moving-to-github/).
    The new compiler is not done at the time of the post.`,
  },
];
export const releases: Releases = [
  {
    date: "2012/10/01",
    version: "0.8",
    title: "TypeScript 0.8 Released",
    description: `The beta version of Typescript is released for public consumption.`,
    // TODO: This HAS to be on youtube somewhere
    link: "MSDN video is no longer available",
  },
  {
    date: "2012/11/15",
    version: "0.8.1",
    title: "TypeScript 0.8.1 Released",
    description:
      "This is the first update to Typescript. It introduced source map support (called Source Level Debugging).",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-0.8.1",
    notes: "Post links to Definitely Typed.",
  },
  {
    date: "2012/12/05",
    version: "0.8.1.1",
    title: "TypeScript 0.8.1.1 Released",
    description: "Performance fixes and bug fixes for source map support.",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-0-8-1-1/",
    skip: true,
  },
  {
    date: "2013/01/21",
    version: "0.8.2",
    title: "TypeScript 0.8.2 Released",
    description: "JSDoc support, compile-on-save, more configurability.",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-0-8-2/",
  },
  {
    date: "2013/02/27",
    version: "0.8.3",
    title: "TypeScript 0.8.3 Released",
    description:
      "improved quick info; other improvements in the type system and debugger",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-0-8-3/",
  },
  {
    date: "2013/04/01",
    version: "0.8.3.1",
    title: "TypeScript 0.8.3.1 Released",
    description: "hotfix for editor bug",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-0-8-3-1/",
    skip: true,
  },
  {
    date: "2013/06/18",
    version: "0.9",
    title: "TypeScript 0.9 Released",
    description:
      "Generics, overloading on string literals, export=, enums, namespace merging, re-engineered compiler.",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-0-9/",
  },
  {
    date: "2013/06/28",
    version: "0.9.0.1",
    title: "TypeScript 0.9.0.1 Released",
    description: "fix accessor codegen and bad type inference",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-0-9-0-1/",
    skip: true,
  },
  {
    date: "2013/08/06",
    version: "0.9.1",
    title: "TypeScript 0.9.1 Released",
    description: "Improved performance, `typeof`, noImplicitAny",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-0-9-1/",
    notes:
      "noImplicitAny is introduced as if it were a secret option that was productised because people started using it.",
  },
  {
    date: "2013/08/21",
    version: "0.9.1.1",
    title: "TypeScript 0.9.1.1 Released",
    description:
      "bug fixes and backward compatibility flags for `bool` and `import x = module(...)`",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-0-9-1-1/",
    skip: true,
  },
  {
    date: "2013/09/09",
    version: "Visual Studio 2013 RC",
    title: "Visual Studio 2013 RC",
    description: "Visual Studio 2013 RC includes TypeScript 0.9.1.1",
    link: "https://devblogs.microsoft.com/typescript/visual-studio-2013-rc/",
    skip: true,
  },
  {
    date: "2013/12/05",
    version: "0.9.5",
    title: "TypeScript 0.9.5 Released",
    description: "Improved performance, VS project settings, _references.ts",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-0-9-5/",
    notes:
      "Over 200 .d.ts files in Definitely Typed; VS Code was recently announced. _references.ts was a proto-tsconfig.json",
  },
  {
    date: "2014/02/25",
    version: "1.0 RC",
    title: "TypeScript 1.0 RC",
    description:
      "Simplified generic assignability, better overload merging, updated lib.d.ts",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-1-0rc/",
    notes:
      "Simultaneous with VS 2013 Update 2 CTP 2. Also known as 0.9.7. First announcement with long descriptions of features.",
  },
  {
    date: "2014/04/02",
    version: "1.0",
    title: "TypeScript 1.0",
    description: "Started accepting PRs after this release.",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-1-0/",
    notes: "The two editors mentioned were VS and Eclipse.",
  },
  {
    date: "2014/05/13",
    version: "1.0.1",
    title: "TypeScript 1.0.1",
    description: "Fixes for performance and crashes, and lib.d.ts types",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-1-0-1/",
    skip: true,
  },
  {
    date: "2014/10/06",
    version: "1.1 CTP",
    title: "TypeScript 1.1 CTP",
    description: "New compiler, but language service uses old compiler.",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-1-1-ctp/",
  },
  {
    date: "2014/11/12",
    version: "1.3",
    title: "TypeScript 1.3",
    description: "`protected`, tuple types, new language service.",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-1-3/",
    notes:
      "The new language service works better with nested functions, referred to as 'support for functional programming style'.",
  },
];
console.log("## Timeline of Typescript releases\n");
console.log(mermaid(releases, "Typescript releases"));
console.log("\n## Timeline of Internal Typescript discussions\n");
console.log("\n### Timeline of External Events Relevant to Typescript\n");
