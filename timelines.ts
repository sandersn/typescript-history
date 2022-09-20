type Event = {
    date: string,
    title: string,
    description: string,
    notes?: string,
    skip?: boolean,
}
type Events = Array<Event>
type Releases = Array<Event & {
    version: string,
    link: string,
}>
export const external: Events = [{
    date: "2012/10/05",
    title: "First commit in Definitely Typed",
    description: "First three types were for modernizr, underscore and jquery.",
}]
export const internal: Events = [{
    date: "before 2013/01/15",
    title: "Move build to jake",
    description: "Move build from nmake to jake.",
    notes: `Mentioned in [this blog post](https://devblogs.microsoft.com/typescript/working-on-0-8-2/).
    TODO: Find the commit after I find out where the codeplex git is mirrored.`,
}]
export const releases: Releases = [{
    date: "2012/10/01",
    version: "0.8",
    title: "TypeScript 0.8 Released",
    description: `Initial release of TypeScript`,
    link: "MSDN video is no longer available",
}, {
    date: "2012/11/15",
    version: "0.8.1",
    title: "TypeScript 0.8.1 Released",
    description: "Adds source map support.",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-0.8.1",
    notes: "Post links to Definitely Typed."
}, {
    date: "2012/12/05",
    version: "0.8.1.1",
    title: "TypeScript 0.8.1.1 Released",
    description: "Bug fixes for source map support.",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-0-8-1-1/",
    skip: true,
}]