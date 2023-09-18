type Event = {
  date: string
  title: string
  description: string
  group?: string
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
function merge(e1: Events, e2: Events, e3: Events): Events {
  const merge = []
  while (e1.length || e2.length || e3.length) {
    let d1 = e1.length ? new Date(e1[0].date) : new Date(10_000_000_000_000)
    let d2 = e2.length ? new Date(e2[0].date) : new Date(10_000_000_000_000)
    let d3 = e3.length ? new Date(e3[0].date) : new Date(10_000_000_000_000)
    if (d1 < d2 && d1 < d3) {
      merge.push({ ...e1[0], group: "external" })
      e1.shift()
    }
    else if (d2 < d1 && d2 < d3) {
      merge.push({ ...e2[0], group: "internal" })
      e2.shift()
    }
    else {
      merge.push({ ...e3[0], group: "release" })
      e3.shift()
    }
  }
  return merge
}
function timelinejs(
  external: Events,
  internal: Events,
  releases: Events,
  title: string,
) {
  const merged = merge(external.slice(), internal.slice(), releases.slice())
  // NOTE: As I add more items, scale_factor might need to go up again
  return `<h1>${title}</h1>
<script type="text/javascript">timeline = new TL.Timeline('timeline-embed', { eras: ${JSON.stringify(
    eras,
  )}, events: ${JSON.stringify(
    merged.filter(e => !e.skip).map(toTimelineEvent),
    undefined,
    2,
  )}}, { scale_factor: 2, timenav_height_percentage: 70, height: "1200px" }); </script>
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
    group: event.group,
    text: {
      headline: isRelease(event) ? event.version : event.title,
      text:
        event.description +
        (event.link
          ? `<br/><a href="${event.link}">${event.link}</a>`
          : ""),
    },
  }
}
export const eras = [
  {
    start_date: { year: 2011, month: 1, day: 12 },
    end_date: { year: 2012, month: 10, day: 1 },
    title: "Typescript under private development",
  },
  {
    start_date: { year: 2012, month: 10, day: 1 },
    end_date: { year: 2014, month: 7, day: 21 },
    title: "Typescript open source on Codeplex",
  },
  {
    start_date: { year: 2015, month: 1, day: 16 },
    end_date: { year: 2015, month: 9, day: 2 },
    title: "Angular adoption and JSX support",
  },
]
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
    notes: "First mention of VSCode on the blog, first mention of tsconfig.",
  },
  {
    date: "2016/03/24",
    title: "New Typescript website",
    description: "Official announcement of a new Typescript website.",
    link: "https://devblogs.microsoft.com/typescript/new-typescript-website/",
    notes: "This is the one with the Ferris wheel on the top.",
  },
  {
    date: "2018/08/27",
    title: "Babel 7 supports Typescript",
    description:
      "Official announcement that Babel 7 ships with the ability to strip Typescript types.",
    link: "https://devblogs.microsoft.com/typescript/typescript-and-babel-7/",
  },
  {
    date: "2018/12/05",
    title: "Intellicode for Typescript/Javascript",
    description: "Intellicode is AI ranking for completions.",
    link: "https://devblogs.microsoft.com/typescript/typescript-and-babel-7/",
  },
  {
    date: "2020/05/29",
    title: "Self-serve Definitely Typed",
    description:
      "Official announcement for the self-serve bot support for Definitely Typed.",
    link: "https://devblogs.microsoft.com/typescript/changes-to-how-we-manage-definitelytyped/",
  },
  {
    date: "2020/09/04",
    title: "New Typescript website",
    description: "Official announcement of a new Typescript website.",
    link: "https://devblogs.microsoft.com/typescript/announcing-the-new-typescript-website/",
    notes: "This is the one with the code sample on the top.",
  },
  {
    date: "2021/05/21",
    title: "New Typescript handbook",
    description: "Official announcement of a new Typescript handbook.",
    link: "https://devblogs.microsoft.com/typescript/announcing-the-new-typescript-handbook/",
  },
  {
    date: "2021/08/24",
    title: "New Typescript home page",
    description:
      'Official announcement of a new Typescript home page, unofficial rollout of new tagline: "Javascript with syntax for types".',
    link: "https://devblogs.microsoft.com/typescript/announcing-the-new-typescript-homepage/",
    notes:
      "'Scale' is demoted to a small mention, 2000s-era 'Any OS, Any Browser' language is removed completely.",
  },
  {
    date: "2022/03/09",
    title: "TC39 proposal for type syntax in JS",
    description: "Proposal to support type syntax as comments in JS.",
    link: "https://devblogs.microsoft.com/typescript/a-proposal-for-type-syntax-in-javascript/",
  },
]
export const internal: Events = [
  {
    date: "2011/01/21",
    title: "First design meeting notes",
    description: "\"Status: get prototype running again.\"<br/> commitment to structural typing from day 1",
    link: "design-notes/2011:01:21.pdf",
  },
  {
    date: "2011/02/26",
    title: "Plans for architecture and timeline",
    description: "<ul><li>Architecture: C++ compiler first, then add an open-source JS one</li><li>Timeline: Annoucement at MIX 2012. This would have been spring 2012, but Mix was a web-focussed developer conference that was cancelled in 2012.</li></ul>",
    link: "design-notes/2011:02:26.pdf",
  },
  {
    date: "2011/03/14",
    title: "List of types now includes <tt>any</tt>",
    description: "Probably the first mention of <tt>any</tt> in the design notes.",
    link: "design-notes/2011:03:14.pdf",
  },
  {
    date: "2011/04/11",
    title: "First mention of postfix types",
    description: "Associated with discussion of how people will want type inference.",
    link: "design-notes/2011:04:11.pdf",
  },
  {
    date: "2011/05/02",
    title: "Specific release schedule",
    description: "Finish by August 2011, announce at MIX 2012.<ul><li>self-hosted compiler</li><li>editor and debugger support</li><li>Windows 8 type definitions</li><li>Playground</li><li>Documentation</li><li>Marketing</li></ul>",
    link: "design-notes/2011:05:02.pdf",
  },
  {
    date: "2011/05/16",
    title: "First mention of noImplicitAny",
    description: "In a discussion on the details of typing.",
    link: "design-notes/2011:05:16.pdf",
  },
  {
    date: "2011/08/05",
    title: "First mention of contextual typing as well as ambient declarations",
    description: "Alongside a discussion of how generics should work.",
    link: "design-notes/2011:08:05.pdf",
  },
  {
    date: "2011/08/19",
    title: "First draft of lib.d.ts",
    description: "Attached to the notes.",
    link: "design-notes/2011:08:19.pdf",
  },
  {
    date: "2011/09/30",
    title: "First mention of variance",
    description: "Alongside an official postponing unions for later.",
    link: "design-notes/2011:09:30.pdf",
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
    description:
      "Official announcement previews a 2.0 feature, reassures people that old tools, as well Definitely Typed, will still be supported.",
    link: "https://devblogs.microsoft.com/typescript/the-future-of-declaration-files-2/",
  },
  {
    date: "2017/03/27",
    title: "Regular release cadence",
    description:
      "Full feature release every two months, synchronised with VS Code releases.",
    link: "https://devblogs.microsoft.com/typescript/typescripts-new-release-cadence/",
  },
  {
    date: "2023/03/09",
    title: "Switch from namespaces to modules",
    description:
      "Typescript is now written in terms of modules instead of namespaces.",
    link: "https://devblogs.microsoft.com/typescript/typescripts-migration-to-modules/",
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
    description:
      "ES module syntax, destructuring, more ES5 emit for ES6, decorators, Sublime Text support",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-1-5-alpha/",
    skip: true,
  },
  {
    date: "2015/04/30",
    version: "1.5 Beta",
    title: "TypeScript 1.5 Beta",
    description: "Decorator metadata",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-1-5-beta/",
    skip: true,
  },
  {
    date: "2015/07/20",
    version: "1.5",
    title: "TypeScript 1.5",
    description:
      "Modules, destructuring, spread, for..of, symbols, computed properties, let/const, tagged template literals, decorators,",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-1-5/",
    notes: "first release notes with contributor list",
  },
  {
    date: "2015/09/02",
    version: "1.6 Beta",
    title: "TypeScript 1.6 Beta",
    description:
      "JSX support, excess property errors, class expressions, generators",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-1-6-beta/",
    skip: true,
  },
  {
    date: "2015/09/16",
    version: "1.6",
    title: "TypeScript 1.6",
    description:
      "JSX support, excess property errors, class expressions, type guards, intersection types, abstract classes",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-1-6/",
  },
  {
    date: "2015/11/03",
    version: "1.7 Nightly",
    title: "TypeScript 1.7 Nightly",
    description:
      "Special announcement of async/await support without downlevel support.",
    link: "https://devblogs.microsoft.com/typescript/what-about-async-await/",
    notes:
      "Internally, I believe we decided to ship something to hurry things along, even if the feature wasn't finished yet.",
    skip: true,
  },
  {
    date: "2015/11/30",
    version: "1.7",
    title: "TypeScript 1.7",
    description:
      "async/await without downlevel, this types, ES module emit, exponentiation operator",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-1-7/",
  },
  {
    date: "2016/01/28",
    version: "1.8 Beta",
    title: "TypeScript 1.8 Beta",
    description: "allowJs, more JSX support, Typescript Nuget packages",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-1-8-beta/",
    skip: true,
  },
  {
    date: "2016/02/22",
    version: "1.8",
    title: "TypeScript 1.8",
    description:
      "Module augmentation, string literal types, control flow analysis",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-1-8-2/",
  },
  {
    date: "2016/07/11",
    version: "2.0 Beta",
    title: "TypeScript 2.0 Beta",
    description:
      "Strict null checks (called non-nullable types), type narrowing (occurrence types) (called control flow analysis for types)",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-2-0-beta-2/",
    skip: true,
  },
  {
    date: "2016/08/30",
    version: "2.0 RC",
    title: "TypeScript 2.0 RC",
    description:
      "Discriminated unions (called tagged unions), number/boolean/enum literal types, tsconfig globs",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-2-0-rc-2/",
    skip: true,
  },
  {
    date: "2016/09/22",
    version: "2.0",
    title: "TypeScript 2.0",
    description:
      "@types resolution, strict null checks, occurrence types, readonly modifier",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-2-0/",
  },
  {
    date: "2016/11/08",
    version: "2.1 RC",
    title: "TypeScript 2.1 RC",
    description: "Evolving types, async/await downlevel",
    link: "https://devblogs.microsoft.com/typescript/typescript-2-1-rc-better-inference-async-functions-and-more-2/",
    skip: true,
  },
  {
    date: "2016/12/07",
    version: "2.1",
    title: "TypeScript 2.1",
    description:
      "async/await downlevel, object rest and spread, keyof and index access types, mapped types",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-2-1-2/",
  },
  {
    date: "2017/02/02",
    version: "2.2 RC",
    title: "TypeScript 2.2 RC",
    description: "<tt>object</tt> type, mixin support",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-2-2-rc/",
    skip: true,
  },
  {
    date: "2017/02/22",
    version: "2.2",
    title: "TypeScript 2.2",
    description:
      "more quick fixes, property access to index signatures, <tt>object</tt> type, mixin support",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-2-2/",
  },
  {
    date: "2017/04/10",
    version: "2.3 RC",
    title: "TypeScript 2.3 RC",
    description: "--strict, generator downlevel, async generator/iterators",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-2-3-rc/",
    skip: true,
  },
  {
    date: "2017/04/27",
    version: "2.3",
    title: "TypeScript 2.3",
    description:
      "checkJs, tsserver plugins, default type arguments, tsc --init, strict",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-2-3/",
  },
  {
    date: "2017/06/12",
    version: "2.4 RC",
    title: "TypeScript 2.4 RC",
    description: "import expressions, weak types, string enums",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-2-4-rc/",
    skip: true,
  },
  {
    date: "2017/06/27",
    version: "2.4",
    title: "TypeScript 2.4",
    description:
      "import expressions, string enums, inference from contextual return type, weak types",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-2-4/",
  },
  {
    date: "2017/08/17",
    version: "2.5 RC",
    title: "TypeScript 2.5 RC",
    description: "optional catch binding, --preserveSymlinks",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-2-5-rc/",
    skip: true,
  },
  {
    date: "2017/08/31",
    version: "2.5",
    title: "TypeScript 2.5",
    description:
      "extract function+other quickfixes, jsdoc cast syntax, optional catch binding, --preserveSymlinks",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-2-5/",
  },
  {
    date: "2017/10/12",
    version: "2.6 RC",
    title: "TypeScript 2.6 RC",
    description:
      "correct function variance, // @ts-ignore, fix tagged template emit",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-2-6-rc/",
    skip: true,
  },
  {
    date: "2017/10/31",
    version: "2.6",
    title: "TypeScript 2.6",
    description:
      "correct function variance, --locale, faster --watch, infer types from usage, // @ts-ignore, fix tagged template emit",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-2-6/",
  },
  {
    date: "2018/01/17",
    version: "2.7 RC",
    title: "TypeScript 2.7 RC",
    description:
      "definite assignment for properties, fixed length tuples, better <tt>in</tt> narrowing",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-2-7-rc/",
    skip: true,
  },
  {
    date: "2018/01/31",
    version: "2.7",
    title: "TypeScript 2.7",
    description:
      "definite assignment for properties, --esModuleInterop, unique symbol, numeric separators, fixed length tuples, better <tt>in</tt> narrowing",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-2-7/",
  },
  {
    date: "2018/03/15",
    version: "2.8 RC",
    title: "TypeScript 2.8 RC",
    description:
      "conditional types, mapped types can remove modifiers, jsx pragmas",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-2-8-rc/",
    skip: true,
  },
  {
    date: "2018/03/27",
    version: "2.8",
    title: "TypeScript 2.8",
    description:
      "conditional types, --emitDeclarationOnly, mapped types can remove modifiers, jsx pragmas, organise imports",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-2-8-2/",
  },
  {
    date: "2018/05/16",
    version: "2.9 RC",
    title: "TypeScript 2.9 RC",
    description: "numeric and symbolic indexes, import() types",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-2-9-rc/",
    skip: true,
  },
  {
    date: "2018/05/31",
    version: "2.9",
    title: "TypeScript 2.9",
    description:
      "move declaration to file, unused code reporting, covert property to accessor, --resolveJsonModule, type arguments for tagged template literals, numeric and symbolic indexes, import() types",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-2-9-2/",
  },
  {
    date: "2018/07/12",
    version: "3.0 RC",
    title: "TypeScript 3.0 RC",
    description:
      "project references/build mode, convert signatures to tuples, variadic tuples, <tt>unknown</tt> type, defaultProps in JSX",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-3-0-rc/",
    skip: true,
  },
  {
    date: "2018/07/30",
    version: "3.0",
    title: "TypeScript 3.0",
    description:
      "project references/build mode, convert signatures to tuples, variadic tuples, related error spans, <tt>unknown</tt> type, defaultProps in JSX, converte to named import, closing JSX tag compleitions, unreachable code quickfix",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-3-0/",
  },
  {
    date: "2018/09/26",
    version: "3.1 RC",
    title: "TypeScript 3.1 RC",
    description:
      "mappable tuple and array types, expando properties on functions, typesVersions redirects, await refactor",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-3-1-rc/",
    skip: true,
  },
  {
    date: "2018/10/08",
    version: "3.1",
    title: "TypeScript 3.1",
    description:
      "mappable tuple and array types, expando properties on functions, typesVersions redirects, await refactor",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-3-1/",
  },
  {
    date: "2018/11/15",
    version: "3.2 RC",
    title: "TypeScript 3.2 RC",
    description:
      "--strictBindCallApply, object spread/rest on generic types, bigint",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-3-2-rc/",
    skip: true,
  },
  {
    date: "2018/11/29",
    version: "3.2",
    title: "TypeScript 3.2",
    description:
      "--strictBindCallApply, object spread/rest on generic types, node resolution for tsconfig inheritance, --showConfig, bigint, Object.defineProperty in JS",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-3-2/",
  },
  {
    date: "2019/01/23",
    version: "3.3 RC",
    title: "TypeScript 3.3 RC",
    description:
      "Easier calling union signatures, incremental build for build mode",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-3-3-rc/",
    skip: true,
  },
  {
    date: "2019/01/31",
    version: "3.3",
    title: "TypeScript 3.3",
    description:
      "Easier calling union signatures, incremental build for build mode, JS support for tsserver in Sublime",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-3-3/",
  },
  {
    date: "2019/03/15",
    version: "3.4 RC",
    title: "TypeScript 3.4 RC",
    description:
      "caching for incremental build, <tt>readonly</tt> array+tuple syntax, <tt>as const</tt>, globalThis type-checking, convert to named parameters",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-3-4-rc/",
    skip: true,
  },
  {
    date: "2019/03/29",
    version: "3.4",
    title: "TypeScript 3.4",
    description:
      "caching for incremental build, better inference for higher-order functions, <tt>readonly</tt> array+tuple syntax, <tt>as const</tt>, globalThis type-checking, convert to named parameters",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-3-4/",
  },
  {
    date: "2019/05/16",
    version: "3.5 RC",
    title: "TypeScript 3.5 RC",
    description:
      "speed improvements, <tt>Omit</tt>, --allowUmdGlobalAccess, many small type system improvements",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-3-5-rc/",
    skip: true,
  },
  {
    date: "2019/05/29",
    version: "3.5",
    title: "TypeScript 3.5",
    description:
      "speed improvements, <tt>Omit</tt>, --allowUmdGlobalAccess, many small type system improvements, smart select, extract type",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-3-5/",
  },
  {
    date: "2019/07/19",
    version: "3.6 Beta",
    title: "TypeScript 3.6 Beta",
    description:
      "better generator type checking, better Promise errors, fixed spread emit",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-3-6-beta/",
    skip: true,
  },
  {
    date: "2019/08/16",
    version: "3.6 RC",
    title: "TypeScript 3.6 RC",
    description:
      "better generator type checking, better Promise errors, fixed spread emit, unicode identifiers, import.meta, accessors in .d.ts, API support for build mode",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-3-6-rc/",
    skip: true,
  },
  {
    date: "2019/08/28",
    version: "3.6",
    title: "TypeScript 3.6",
    description:
      "better generator type checking, better Promise errors, fixed spread emit, unicode identifiers, import.meta, accessors in .d.ts, API support for build mode",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-3-6/",
  },
  {
    date: "2019/10/01",
    version: "3.7 Beta",
    title: "TypeScript 3.7 Beta",
    description:
      "optional chaining, nullish coalescing, assertion functions, recursive type aliases, --declaration works with --allowJs, uncalled function checks",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-3-7-beta/",
    skip: true,
  },
  {
    date: "2019/10/24",
    version: "3.7 RC",
    title: "TypeScript 3.7 RC",
    description:
      "optional chaining, nullish coalescing, assertion functions, recursive type aliases, --declaration works with --allowJs, uncalled function checks",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-3-7-rc/",
    skip: true,
  },
  {
    date: "2019/11/05",
    version: "3.7",
    title: "TypeScript 3.7",
    description:
      "optional chaining, nullish coalescing, assertion functions, recursive type aliases, --useDefineForClassFields, flatter error reporting, --declaration works with --allowJs, uncalled function checks",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-3-7/",
  },
  {
    date: "2020/01/10",
    version: "3.8 Beta",
    title: "TypeScript 3.8 Beta",
    description:
      "type-only imports, <tt>#private</tt>, <tt>export *</tt>, top-level await, <tt>@public @private @protected</tt>, <tt>watchOptions</tt>",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-3-8-beta/",
    skip: true,
  },
  {
    date: "2020/02/06",
    version: "3.8 RC",
    title: "TypeScript 3.8 RC",
    description:
      "type-only imports, <tt>#private</tt>, <tt>export *</tt>, top-level await, <tt>@public @private @protected</tt>, <tt>watchOptions</tt>",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-3-8-rc/",
    skip: true,
  },
  {
    date: "2020/02/20",
    version: "3.8",
    title: "TypeScript 3.8",
    description:
      "type-only imports, <tt>#private</tt>, <tt>export *</tt>, top-level await, <tt>@public @private @protected</tt>, <tt>watchOptions</tt>, call hierarchy",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-3-8/",
  },
  {
    date: "2020/03/27",
    version: "3.9 Beta",
    title: "TypeScript 3.9 Beta",
    description:
      "improved Promise.all inference, speed improvements, <tt>@ts-expect-error</tt>, more uncalled function checks, commonjs auto-imports, support solution-style tsconfigs",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-3.9-beta/",
    skip: true,
  },
  {
    date: "2020/04/28",
    version: "3.9 RC",
    title: "TypeScript 3.9 RC",
    description:
      "improved Promise.all inference, speed improvements, <tt>@ts-expect-error</tt>, more uncalled function checks, commonjs auto-imports, support solution-style tsconfigs, missing return quick fix",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-3.9-rc/",
    skip: true,
  },
  {
    date: "2020/05/12",
    version: "3.9",
    title: "TypeScript 3.9",
    description:
      "type-only imports, <tt>#private</tt>, <tt>export *</tt>, top-level await, <tt>@public @private @protected</tt>, <tt>watchOptions</tt>, call hierarchy",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-3.9/",
  },
  {
    date: "2020/06/26",
    version: "4.0 Beta",
    title: "TypeScript 4.0 Beta",
    description:
      "variadic tuples, labelled tuple elements, class property inference from constructors, short-circuiting assignment operators, unknown on catch clause, custom JSX factories, speed improvements, --incremental + --noEmit, <tt>@deprecated</tt>, partial editing mode at startup",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-4.0-beta/",
    skip: true,
  },
  {
    date: "2020/08/06",
    version: "4.0 RC",
    title: "TypeScript 4.0 RC",
    description:
      "variadic tuples, labelled tuple elements, class property inference from constructors, short-circuiting assignment operators, unknown on catch clause, custom JSX factories, speed improvements, --incremental + --noEmit, <tt>@deprecated</tt>, partial editing mode at startup",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-4.0-rc/",
    skip: true,
  },
  {
    date: "2020/08/20",
    version: "4.0",
    title: "TypeScript 4.0",
    description:
      "variadic tuples, labelled tuple elements, class property inference from constructors, short-circuiting assignment operators, unknown on catch clause, custom JSX factories, speed improvements, --incremental + --noEmit, <tt>@deprecated</tt>, partial editing mode at startup",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-4.0/",
  },
  {
    date: "2020/09/26",
    version: "4.1 Beta",
    title: "TypeScript 4.1 Beta",
    description:
      "template literal types, key remapping in mapped types, recursive conditional types, --noUncheckedIndexAccess, React 17 JSX factories, <tt>@see</tt>",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-4.1-beta/",
    skip: true,
  },
  {
    date: "2020/11/03",
    version: "4.1 RC",
    title: "TypeScript 4.1 RC",
    description:
      "template literal types, key remapping in mapped types, recursive conditional types, --noUncheckedIndexAccess, React 17 JSX factories, <tt>@see</tt>",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-4.1-rc/",
    skip: true,
  },
  {
    date: "2020/11/19",
    version: "4.1",
    title: "TypeScript 4.1",
    description:
      "template literal types, key remapping in mapped types, recursive conditional types, --noUncheckedIndexAccess, React 17 JSX factories, <tt>@see</tt>",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-4.1/",
  },
  {
    date: "2021/01/12",
    version: "4.2 Beta",
    title: "TypeScript 4.2 Beta",
    description:
      "non-end rest element in tuples, better type alias preservation, template literal types for template literal expressions, better <tt>in</tt> checks, --noPropertyAccessFromIndexSignature, abstruct construct signatures, --explainFiles, improved optional property assignability in index signatures, declare missing function",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-4.2-beta/",
    skip: true,
  },
  {
    date: "2021/02/11",
    version: "4.2 RC",
    title: "TypeScript 4.2 RC",
    description:
      "non-end rest element in tuples, better type alias preservation, better <tt>in</tt> checks, better uncalled function checks, --noPropertyAccessFromIndexSignature, abstruct construct signatures, --explainFiles, improved optional property assignability in index signatures, declare missing function",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-4.2-rc/",
    skip: true,
  },
  {
    date: "2021/02/23",
    version: "4.2",
    title: "TypeScript 4.2",
    description:
      "non-end rest element in tuples, better type alias preservation, better <tt>in</tt> checks, better uncalled function checks, --noPropertyAccessFromIndexSignature, abstruct construct signatures, --explainFiles, improved optional property assignability in index signatures, declare missing function",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-4.2/",
  },
  {
    date: "2021/04/01",
    version: "4.3 Beta",
    title: "TypeScript 4.3 Beta",
    description:
      "separate write types on properties, <tt>override</tt>, template literal typing improvements, <tt>#private</tt> methods and accessors, <tt>static</tt> index signatures, always-truthy promise checks, import completions, <tt>@link</tt>",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-4.3-beta/",
    skip: true,
  },
  {
    date: "2021/05/12",
    version: "4.3 RC",
    title: "TypeScript 4.3 RC",
    description:
      "separate write types on properties, <tt>override</tt>, template literal typing improvements, <tt>#private</tt> methods and accessors, <tt>static</tt> index signatures, always-truthy promise checks, import completions, <tt>@link</tt>, more efficient --incremental and --watch, goto-definition on non-JS",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-4.3-rc/",
    skip: true,
  },
  {
    date: "2021/05/26",
    version: "4.3",
    title: "TypeScript 4.3",
    description:
      "separate write types on properties, <tt>override</tt>, template literal typing improvements, <tt>#private</tt> methods and accessors, <tt>static</tt> index signatures, always-truthy promise checks, import completions, <tt>@link</tt>, more efficient --incremental and --watch, goto-definition on non-JS",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-4.3/",
  },
  {
    date: "2021/07/01",
    version: "4.4 Beta",
    title: "TypeScript 4.4 Beta",
    description:
      "control flow analysis of aliases, symbol and template literal index signatures, --useUnknownInCatchVariables, --exactOptionalPropertyTypes, --help improvements, performance improvements, spelling suggestions for JS, inlay hints",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-4.4-beta/",
    skip: true,
  },
  {
    date: "2021/08/12",
    version: "4.4 RC",
    title: "TypeScript 4.4 RC",
    description:
      "control flow analysis of aliases, symbol and template literal index signatures, --useUnknownInCatchVariables, --exactOptionalPropertyTypes, class <tt>static</tt> blocks, --help improvements, performance improvements, spelling suggestions for JS, inlay hints",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-4.4-rc/",
    skip: true,
  },
  {
    date: "2021/08/26",
    version: "4.4",
    title: "TypeScript 4.4",
    description:
      "control flow analysis of aliases, symbol and template literal index signatures, --useUnknownInCatchVariables, --exactOptionalPropertyTypes, class <tt>static</tt> blocks, --help improvements, performance improvements, spelling suggestions for JS, inlay hints",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-4.4/",
  },
  {
    date: "2021/10/01",
    version: "4.5 Beta",
    title: "TypeScript 4.5 Beta",
    description:
      "ES modules in Node, installable stdlib overrides, template literal discriminants, tail-call elimination in conditional types, disabling import elision, <tt>#private in</tt> object syntax, import assertions, faster project loading, JSX snippets",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-4.5-beta/",
    skip: true,
  },
  {
    date: "2021/11/02",
    version: "4.5 RC",
    title: "TypeScript 4.5 RC",
    description:
      "installable stdlib overrides, <tt>Awaited</tt>, template literal discriminants, tail-call elimination in conditional types, disabling import elision, <tt>#private in</tt> object syntax, import assertions, faster project loading, JSX snippets",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-4.5-rc/",
    skip: true,
  },
  {
    date: "2021/11/17",
    version: "4.5",
    title: "TypeScript 4.5",
    description:
      "installable stdlib overrides, <tt>Awaited</tt>, template literal discriminants, tail-call elimination in conditional types, disabling import elision, <tt>#private in</tt> object syntax, import assertions, faster project loading, JSX snippets, default type arguments and const contexts in JSDoc",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-4.5/",
  },
  {
    date: "2022/01/21",
    version: "4.6 Beta",
    title: "TypeScript 4.6 Beta",
    description:
      "constructor code allowed before <tt>super</tt>, control flow analysis for dependent parameters, more parser/binder errors in JS, Typescript trace analyser",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-4.6-beta/",
    skip: true,
  },
  {
    date: "2022/02/11",
    version: "4.6 RC",
    title: "TypeScript 4.6 RC",
    description:
      "constructor code allowed before <tt>super</tt>, control flow analysis for dependent parameters and destructuring, es2022 emit, more parser/binder errors in JS, Typescript trace analyser",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-4.6-rc/",
    skip: true,
  },
  {
    date: "2022/02/28",
    version: "4.6",
    title: "TypeScript 4.6",
    description:
      "constructor code allowed before <tt>super</tt>, control flow analysis for dependent parameters and destructuring, es2022 emit, more parser/binder errors in JS, Typescript trace analyser",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-4.6/",
  },
  {
    date: "2022/04/08",
    version: "4.7 Beta",
    title: "TypeScript 4.7 Beta",
    description:
      "ES modules in Node, control flow analysis for computed properties, type arguments for non-calls, constraints on <tt>infer</tt> type variables, variance annotations, <tt>typeof #private</tt>, triple-slash <tt>resolution-mode</tt>, better organise imports, object method snippets",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-4.7-beta/",
    skip: true,
  },
  {
    date: "2022/05/11",
    version: "4.7 RC",
    title: "TypeScript 4.7 RC",
    description:
      "ES modules in Node, control flow analysis for computed properties, type arguments for non-calls, constraints on <tt>infer</tt> type variables, variance annotations,  triple-slash <tt>resolution-mode</tt>, better organise imports, object method snippets, goto source definition",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-4.7-rc/",
    skip: true,
  },
  {
    date: "2022/05/24",
    version: "4.7",
    title: "TypeScript 4.7",
    description:
      "ES modules in Node, control flow analysis for computed properties, type arguments for non-calls, constraints on <tt>infer</tt> type variables, variance annotations,  triple-slash <tt>resolution-mode</tt>, better organise imports, object method snippets, goto source definition",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-4.7/",
  },
  {
    date: "2022/06/21",
    version: "4.8 Beta",
    title: "TypeScript 4.8 Beta",
    description:
      "better intersection/union behaviour, better binding pattern and <tt>infer</tt> inference, --build/--watch/--incremental performance improvements, file watching fixes, find-all-references performance improvements, error on <tt>===[]</tt> and <tt>==={}</tt>",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-4.8-beta/",
    skip: true,
  },
  {
    date: "2022/08/11",
    version: "4.8 RC",
    title: "TypeScript 4.8 RC",
    description:
      "better intersection/union behaviour, better binding pattern and <tt>infer</tt> inference, --build/--watch/--incremental performance improvements, file watching fixes, find-all-references performance improvements, error on <tt>===[]</tt> and <tt>==={}</tt>",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-4.8-rc/",
    skip: true,
  },
  {
    date: "2022/08/25",
    version: "4.8",
    title: "TypeScript 4.8",
    description:
      "ES modules in Node, control flow analysis for computed properties, type arguments for non-calls, constraints on <tt>infer</tt> type variables, variance annotations,  triple-slash <tt>resolution-mode</tt>, better organise imports, object method snippets, goto source definition",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-4.8/",
  },
  {
    date: "2022/09/23",
    version: "4.9 Beta",
    title: "TypeScript 4.9 Beta",
    description:
      "<tt>satisfies</tt>, unlisted property narrowing for <tt>in</tt>, error on <tt>===NaN</tt>, file-watching uses filesystem events",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-4.9-beta/",
    skip: true,
  },
  {
    date: "2022/11/01",
    version: "4.9 RC",
    title: "TypeScript 4.9 RC",
    description:
      "<tt>satisfies</tt>, auto accessors, unlisted property narrowing for <tt>in</tt>, error on <tt>===NaN</tt>, file-watching uses filesystem events, performance improvements",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-4.9-rc/",
    skip: true,
  },
  {
    date: "2022/11/15",
    version: "4.9",
    title: "TypeScript 4.9",
    description:
      "<tt>satisfies</tt>, auto accessors, unlisted property narrowing for <tt>in</tt>, error on <tt>===NaN</tt>, file-watching uses filesystem events, performance improvements, sort imports, remove unused imports",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-4.9/",
  },
  {
    date: "2023/01/26",
    version: "5.0 Beta",
    title: "TypeScript 5.0 Beta",
    description:
      "decorators, const type parameters, multiple configs in tsconfig extends, enum improvements, <tt>--moduleResolution bundler</tt>, --verbatimModuleSyntax, <tt>@satisfies</tt>, <tt>@overload</tt>, more emit flags allowed for --build, exhaustive switch/case completions, performance improvements",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-5.0-beta/",
    skip: true,
  },
  {
    date: "2023/03/01",
    version: "5.0 RC",
    title: "TypeScript 5.0 RC",
    description:
      "decorators, const type parameters, multiple configs in tsconfig extends, enum improvements, <tt>--moduleResolution bundler</tt>, --verbatimModuleSyntax, <tt>@satisfies</tt>, <tt>@overload</tt>, more emit flags allowed for --build, exhaustive switch/case completions, performance improvements",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-5.0-rc/",
    skip: true,
  },
  {
    date: "2023/03/16",
    version: "5.0",
    title: "TypeScript 5.0",
    description:
      "decorators, const type parameters, multiple configs in tsconfig extends, enum improvements, <tt>--moduleResolution bundler</tt>, --verbatimModuleSyntax, <tt>@satisfies</tt>, <tt>@overload</tt>, more emit flags allowed for --build, exhaustive switch/case completions, performance improvements",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-5.0/",
  },
  {
    date: "2023/04/18",
    version: "5.1 Beta",
    title: "TypeScript 5.1 Beta",
    description:
      "implicit returns for undefined-returning functions, unrelated types for accessors, JSX improvements, typeRoot consulted in module resolution, linked cursors for JSX tags, <tt>@param</tt> snippets, optimisations",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-5.1-beta/",
    skip: true,
  },
  {
    date: "2023/05/18",
    version: "5.1 RC",
    title: "TypeScript 5.1 RC",
    description:
      "implicit returns for undefined-returning functions, unrelated types for accessors, JSX improvements, typeRoot consulted in module resolution, linked cursors for JSX tags, <tt>@param</tt> snippets, optimisations",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-5.1-rc/",
    skip: true,
  },
  {
    date: "2023/06/01",
    version: "5.1",
    title: "TypeScript 5.1",
    description:
      "implicit returns for undefined-returning functions, unrelated types for accessors, JSX improvements, typeRoot consulted in module resolution, linked cursors for JSX tags, <tt>@param</tt> snippets, optimisations",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-5.1/",
  },
  {
    date: "2023/06/30",
    version: "5.2 Beta",
    title: "TypeScript 5.2 Beta",
    description:
      "<tt>using</tt>, decorator metadata, partly anonymous tuple element names, improved methods on unions of arrays, inline variable refactor",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-5.2-beta/",
    skip: true,
  },
  {
    date: "2023/08/09",
    version: "5.2 RC",
    title: "TypeScript 5.2 RC",
    description:
      "<tt>using</tt>, decorator metadata, partly anonymous tuple element names, improved methods on unions of arrays, optimisations, inline variable refactor",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-5.2-rc/",
    skip: true,
  },
  {
    date: "2023/08/24",
    version: "5.2",
    title: "TypeScript 5.2",
    description:
      "<tt>using</tt>, decorator metadata, partly anonymous tuple element names, improved methods on unions of arrays, optimisations, inline variable refactor, copying Array methods, symbols as WeakMap keys, clickable inlay parameter hints",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-5.2/",
  },
]
console.log(`<html>
    <body>
<link title="timeline-styles" rel="stylesheet" href="https://cdn.knightlab.com/libs/timeline3/latest/css/timeline.css">
<script src="https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js"></script>
<div id='timeline-embed' style="width: 100%; height: 800px"></div>
`)
console.log(timelinejs(external, internal, releases, "Typescript"))
console.log(`
    </body>
</html>`)
