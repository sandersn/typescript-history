type Event = {
  date: string
  title: string
  description: string
  notes?: string
  skip?: boolean
  link?: string
}
type Release = Event & {
  version: string
  link: string
}
type Events = Array<Event>
type Releases = Array<Release>
function isRelease(e: Event): e is Release {
  return "version" in e && "link" in e
}
function mermaid(events: Events, title: string) {
  let s = "```mermaid\ntimeline\n    title " + title + "\n"
  for (const event of events) {
    if (event.skip) {
      continue
    }
    const d = new Date(event.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    if (isRelease(event)) {
      s += `    ${d}: ${event.version} -- ${event.description.replace(
        ";",
        ".",
      )} ${event.link.replace("https://", "")}\n`
    } else {
      s += `    ${d}: ${event.title} -- ${event.description.replace(
        ";",
        ".",
      )}\n`
    }
  }
  s += "```"
  return s
}
function timelinejs(events: Events, title: string) {
    // NOTE: As I add more items, scale_factor might need to go up again
  return `<h1>${title}</h1>
<script type="text/javascript">timeline = new TL.Timeline('timeline-embed', { events: ${JSON.stringify(
    events.filter(e => !e.skip).map(toTimelineEvent),
    undefined,
    2,
  )}}, { scale_factor: 1 }); </script>
`
}
function toTimelineEvent(event: Event) {
  const d = new Date(event.date)
  return {
    start_date: {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate(),
    },
    text: {
      headline: isRelease(event) ? event.version : event.title,
      text: event.description + (isRelease(event) ? `<br/><a href="${event.link}">${event.link}</a>` : ""),
    },
  }
}
export const external: Events = [
  {
    date: "2012/10/05",
    title: "First commit in Definitely Typed",
    description: "First three types were for modernizr, underscore and jquery.",
  },
  {
    date: "2015/01/16",
    title: "Angular 2 built on Typescript",
    description: "Official announcement that Angular 2 uses Typescript.",
    link: "https://devblogs.microsoft.com/typescript/angular-2-built-on-typescript/",
  },
  {
    date: "2015/04/30",
    title: "VSCode announced with Typescript support",
    description: "Official announcement VSCode supports Typescript.",
    link: "https://devblogs.microsoft.com/typescript/using-typescript-in-visual-studio-code/",
    notes: "First mention of VSCode on the blog, first mention of tsconfig."
  },
  {
    date: "2016/03/24",
    title: "New Typescript website",
    description: "Official announcement of a new Typescript website.",
    link: "https://devblogs.microsoft.com/typescript/new-typescript-website/",
    notes: "This is the one with the Ferris wheel on the top."
  },
]
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
  {
    date: "2016/06/15",
    title: "Announce @types resolution for .d.ts files",
    description: "Official announcement previews a 2.0 feature, reassures people that old tools, as well Definitely Typed, will still be supported.",
    link: "https://devblogs.microsoft.com/typescript/the-future-of-declaration-files-2/",
  },
]
export const releases: Releases = [
  {
    date: "2012/10/01",
    version: "0.8",
    title: "TypeScript 0.8 Released",
    description: `The beta version of Typescript is released for public consumption.`,
    link: "https://www.youtube.com/watch?v=g48K9LEhHWs",
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
  {
    date: "2015/01/16",
    version: "1.4",
    title: "TypeScript 1.4",
    description: "union types, type aliases, let/const, template literals",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-1-4/",
  },
  {
    date: "2015/03/27",
    version: "1.5 Alpha",
    title: "TypeScript 1.5 Alpha",
    description: "ES module syntax, destructuring, more ES5 emit for ES6, decorators, Sublime Text support",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-1-5-alpha/",
  },
  {
    date: "2015/04/30",
    version: "1.5 Beta",
    title: "TypeScript 1.5 Beta",
    description: "Decorator metadata",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-1-5-beta/",
  },
  {
    date: "2015/07/20",
    version: "1.5",
    title: "TypeScript 1.5",
    description: "Modules, destructuring, spread, for..of, symbols, computed properties, let/const, tagged template literals, decorators,",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-1-5/",
    notes: "first release notes with contributor list"
  },
  {
    date: "2015/09/02",
    version: "1.6 Beta",
    title: "TypeScript 1.6 Beta",
    description: "JSX support, excess property errors, class expressions, generators",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-1-6-beta/",
  },
  {
    date: "2015/09/16",
    version: "1.6",
    title: "TypeScript 1.6",
    description: "JSX support, excess property errors, class expressions, type guards, intersection types, abstract classes",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-1-6/",
  },
  {
    date: "2015/11/03",
    version: "1.7 Nightly",
    title: "TypeScript 1.7 Nightly",
    description: "Special announcement of async/await support without downlevel support.",
    link: "https://devblogs.microsoft.com/typescript/what-about-async-await/",
    notes: "Internally, I believe we decided to ship something to hurry things along, even if the feature wasn't finished yet."
  },
  {
    date: "2015/11/30",
    version: "1.7",
    title: "TypeScript 1.7",
    description: "async/await without downlevel, this types, ES module emit, exponentiation operator",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-1-7/",
  },
  {
    date: "2016/01/28",
    version: "1.8 Beta",
    title: "TypeScript 1.8 Beta",
    description: "allowJs, more JSX support, Typescript Nuget packages",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-1-8-beta/",
  },
  {
    date: "2016/02/22",
    version: "1.8",
    title: "TypeScript 1.8",
    description: "Module augmentation, string literal types, control flow analysis",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-1-8-2/",
  },
  {
    date: "2016/07/11",
    version: "2.0 Beta",
    title: "TypeScript 2.0 Beta",
    description: "Strict null checks (called non-nullable types), type narrowing (occurrence types) (called control flow analysis for types)",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-2-0-beta-2/",
  },
  {
    date: "2016/08/30",
    version: "2.0 RC",
    title: "TypeScript 2.0 RC",
    description: "Discriminated unions (called tagged unions), number/boolean/enum literal types, tsconfig globs",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-2-0-rc-2/",
  },
  {
    date: "2016/09/22",
    version: "2.0",
    title: "TypeScript 2.0",
    description: "@types resolution, strict null checks, occurrence types, readonly modifier",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-2-0/",
  },
  {
    date: "2016/11/08",
    version: "2.1 RC",
    title: "TypeScript 2.1 RC",
    description: "Evolving types, async/await downlevel",
    link: "https://devblogs.microsoft.com/typescript/typescript-2-1-rc-better-inference-async-functions-and-more-2/",
  },
  {
    date: "2016/12/07",
    version: "2.1",
    title: "TypeScript 2.1",
    description: "async/await downlevel, object rest and spread, keyof and index access types, mapped types",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-2-1-2/",
  },
  {
    date: "2017/02/02",
    version: "2.2 RC",
    title: "TypeScript 2.2 RC",
    description: "<tt>object</tt> type, mixin support",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-2-2-rc/",
  },
  {
    date: "2017/02/22",
    version: "2.2",
    title: "TypeScript 2.2",
    description: "more quick fixes, property access to index signatures, <tt>object</tt> type, mixin support",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-2-2/",
  },
]
console.log(`<html>
    <body>
<link title="timeline-styles" rel="stylesheet" href="https://cdn.knightlab.com/libs/timeline3/latest/css/timeline.css">
<script src="https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js"></script>
<div id='timeline-embed' style="width: 100%; height: 600px"></div>
`)
console.log(timelinejs(releases, "Typescript releases"))
console.log(`
    </body>
</html>`)
