Quick notes as I dump the design notes 2011-2014 to PDF.

- Items frequently say 'attached', and sometimes there is an associated text box to the side, but many times there isn't.

## 2011/01/21

- First design meeting note was 2011/01/21.
- "Status: get prototype running again"
- Structural typing from day 1
- "Interface erases to var at runtime (in the perf box)" &mdash; I guess this means that types erase?

## 2011/01/26

- Use same class model as C#


## 2011/01/31

- Primary goal statement is same as today.
- Secondary goal is "be faster than JS on IE".
- Fourth goal is "all JS code is legal Strada code".
- `var` was going to be the `Dynamic` type -- the checked entrypoint to the typed world.
- initialiser inference was mentioned as future work along with generics.
- object literal types were also future work.

## 2011/02/07

- designing namespaces and class emit
- mention of getting special optimisation from IE10 for class emit
- another mention of 'the box' which I don't understand
- oh, it's the typed world in classic gradual typing
- staying in the the typed world is important when you have to add checks at all boundaries

## 2011/02/11

- mostly emit plus reflection
- Anders says if we special case `List<T>` then we don't need generics
- considering F#-style constructors

## 2011/02/14

- first mention of mixins, opposed to multiple inheritance or extension methods

## 2011/02/16

- discussing a demo on 02/23, includes an example codebase (for performance?)
  - still pushing dual goals of typed JS and improved emit
- first time writing down plans for
  - architecture (C++ now, open source JS later)
  - timeline (Mix 2012?)
- mention that 'reach' platforms might not emit runtime type checks

## 2011/02/25

- discussed Why Classes (we really do think they are valuable)
- but just started discussing typing object literals

## 2011/03/14

- list of types now includes `any`

## 2011/03/28

- discusses perf of gradual typing, and implementation
- might be edging closer to present-day unchecked system

## 2011/04/11

- discussion of how much type inference will be wanted
- first indication that type syntax might differ from C++/C#
- clearer statement of open source + TS-written-in-TS

## 2011/04/15

- no higher-order modules
- first mention of 'clodule'

## 2011/05/02

- At this point, sounds like Steve Lucco was writing the compiler.
- type inference and class emit
- second example of postfix types and `any`
- spotty notes indicating that runtime type checks might no longer be in scope
- plan for MIX 2012 and first release
  - self-hosted compiler
  - editor+debugger support
  - Windows 8 type definitions
  - playground
  - documentation
  - marketing
- aim to finish design by August 2011

## 2011/05/09

- status of new implementation

## 2011/05/16

- details of typing
  - subtype reduction
  - type hierarchy ({}, string, object)
  - [no]implicitAny
- proposed cast syntax was postfix `as`

## 2011/05/20

- mixins

## 2011/06/03

- looks like a discussion of class syntax, possibly in comparison to ES classes

## 2011/06/06

- parameter properties
- semantics of `public` and `private`

## 2011/06/15

- self-hosted implementation is nearly complete
- want to handle evolving mutations of `{}` -- ended up doing nothing
- call signatures for object literal types
  - they were leaning toward removing the arrow shorthand!
- started writing lib.d.ts

## 2011/07/08

- decided to remove arrow types(!)
- types for object and array literals -- objects were still `any`

## 2011/07/15

- discussion of merging, sounds more limited than today; centred around modules
- usable version features
  - colourisation
  - errors
  - no completions (but should by August)
  - not the whole design (but should by July)
  - playground

## 2011/07/22

- arrow types are back in! (with parameter names)
- some principles of inference which would carry over to control flow
- merge types, which seem to be unions: Steve claimed that in 40,000 lines of code he didn't find any need for them.

## 2011/08/05

- still no generics, but discussion about them
- first mention of contextual typing, for arrows

## 2011/08/12

- first mention of ambient declarations with `extern` keyword

## 2011/08/19

- first drafts of lib.d.ts attached

## 2011/09/21

- discussion of modules, building on commonjs it appears

## 2011/09/30

- more modules, lib
- unions officially shelved for later
- first mention of variance: "covariant subtyping"

## 2011/10/07

- just a lot of code. syntax for index signatures shows up for the first time.

## 2011/10/14

- scope and visibility of F#-style class members

## 2011/10/24

- first mention of brands; enums will be branded internally
- more scope and visibility of F#-style classes

## 2011/10/28

- first mention of exact types, but mostly means unit types

## 2011/11/07

- suggesting a keyword like `extends` or `implements`: `requires`
- seems to be a function, or to connect constructor functions with interfaces
- this would allow getting rid of construct signatures?
- somehow this would help mixins?

## 2011/11/14

- first mention of ES6 classes
- construct signatures are back in
- mixins are now supported! (?)

## 2011/12/02

- discussing hiring, branding, website, copyright
- explanation of mixins; seems to be when a class uses `requires`

## 2011/12/06

- first mention of optional parmaeters
- more mixins, ES conformance like accessors and destructuring

## 2011/12/09

- Mads wrote a whole bunch on generics, treating them as overloads, ending up by recommending unions and intersections
- Luke had an in-depth spec comparison of accessors
- `requires` is out again
- more discussion of modules, ending with recommendation to add `references`

## 2011/12/14

- first triple-slash references
- global vs module code

## 2011/12/16

- type hierarchy with `any` as top
- ambient+module problems
- at this point, they wanted to remove `extern class` (`declare class`), which might explain why it's rarely used in the lib

## 2011/12/19

- proposal for optional parameters
- class+module problems
- decided to remove mixins and keep classes and interfaces
- interface files now end in .i.str; example of .str emitting .js and .i.str

## 2012/01/06

- recap of December decisions
  - align with ES modules
  - remove requires+multiple inheritance (for now)
  - add optional parameters, ES5 accessors, interface merging
  - remove ambient classes from our lib files
- January decisions
  - implement ES6 arrow functions
  - add ASI (*ed:* this was missing before?)
  - skip overloading in classes, recursive types, ES class expressions
  - remove enums if possible, based on the compiler code itself (!)
- Anders proposed a minimal d.ts subset
  - It converted everything to only interfaces and ambient functions/vars.
  - Strada had top-level `property`? I guess it was a `var`.
  - Steve didn't like throwing out everything else.
- first mention of contextual-typing of `this` from property assignments.
- Anders proposed ambient class declarations added to constructor functions in the same file
- Anders proposed an algorithm for contextual typing (called 'target typing')
  - it was sensitive to parentheses
  - an ambient declaration in the same compilation was part of the context
  - it also included excess property checks

## 2012/01/13

- JoshWil (?) feedback
  - didn't like casting `x as any as Target`
- partner feedback
  - minification
  - asked for noImplicitAny, basically

## 2012/02/10

- properties

## 2012/03/23

- files' relation to modules

## 2012/03/26

- clear distinction between web (global) and module files
- distinction between 'internal' and 'loadable' modules
- mentions of literal types and string enums

## 2012/04/06

- feedback from Mankala app
  - textual include OK
  - module merging was order-sensitive
- feedback from Backbone app
  - wanted forwarding constructors, prototype properties
  - problem with base call ordering and property shadowing
- need to align with ES6 arrow functions
  - drop `self`
  - drop `this` parameters
  - loosen void `return` rules (to present-day state?)
- Luke proposed looser && and || rules

## 2012/04/09

- enum design
  - included number and string enums
  - switch to `:` to imitate object literal syntax (this didn't happen)

## 2012/04/13

- anonymous modules
- "should number errors/warnings so we can later turn on/off."

## 2012/04/20

- mail from Dirk about Monaco switching to Strada
  - AMD emit fixes
  - want real modules, not triple-slash references
  - want to have a syntax service first, then real language service
- `object` keyword, looks a bit like namespaces
- first mention of separating `module` and `namespace`

## 2012/04/27

- modules demo + confirm design
- "modules as types is back!" (??)
- first (?) mention that module is anything with import/export

## 2012/05/25

- module accessibility rules
- circular imports

## 2012/05/30

- TC39 "maximally minimal" classes, and arrows
- housekeeping: release details, quality/completeness, windows 8 build
- includes a writeup from Anders on the TC39 proposal, extended with
  - this-property assignments (cut, but eventually included in 2019 (?))
  - property declarations (eventually in ES too)
  - parameter property declarations (but with different `this.x: number` syntax)
  - `public`/`private` (no `protected` yet)
  - `static` (I thought this made it into ES2015, actually)

## 2012/06/04

- more discussion about TC39 classes: headed toward requiring declarations in TS

## 2012/06/18

- more discussion about TC39 classes: prototype properties
- Monaco wanted more triple-slash directives for AMD and compiler config
- more enum design, with more detail
  - still includes strings and numbers
  - completely assignable to string or number (?)
  - still intend to inline the emit by default

## 2012/07/11

- optional properties: first mention of weak types as "disabling implicit downcasts"
- first (?) mention of `<Type>` cast syntax
- first mention of noImplicitAny, envisioned with triple-slash syntax `<style no-any="true" />`

## 2012/07/16

- class feedback from Monaco and others

## 2012/07/20

- classes: no initialisers on inherited property (why not??)
- optional properties started implementation
- more discussion of module import/export

## 2012/08/10

- many small class/optional property/module items

## 2012/08/17

- many small class/optional property/module items
- restrict top-level `this: any` to global files

## 2012/08/22

- still syncing between spec and implementation at this point
- ES5 vs ES3 as default --target
- improve namespace merge code emit so that single-file emit can work (guess it didn't at this point)

## 2012/09/07

- spec type relationships of `void`
- disallow `declare` in d.ts files (??? stupid!?)
- sticking with `bool` despite liking `boolean`
- don't use `I`- prefix for interfaces

## 2012/09/12

- `{}` and `IMap` interfaces from Monaco (I couldn't guess what this was about)
  - should `{}` be `any`
- should have a working nightly build from 09/13 onward
- want to work on overloads and typing Function.bind/call/apply in the future

## 2012/10/19

- Demo of source-map debugging
- Steve gave overview of Closure type system
  - add minification to the feature list (!)
- Namespace-function and namespace-class merges, aka fundules and clodules
  - Notes include background and proposal
- discussion of codeplex issues with *two-digit* IDs

## 2012/10/26

- More namespace merge discussion
  - Proposed `var foo.bar = ...` syntax for implicitly declaring a merged namespace on classes/functions/vars.

## 2012/10/29

- Review current status of thinking on generics
- Notes include quite a few examples
- Initial version will not include constraints
- One open question: can unprovided `T` default to `any`?
- Proposal of type compatibility via instantiating all parameters with `any`

## 2012/11/02

- More generics
  - "Dig out mail on `this` types" in example with a `this` type
  - Want to infer type arguments in most cases
  - Proposal of interaction between inference and contextual typing of lambdas.
  - Documented suspicion of return-only type parameters.

## 2012/11/09

- More generics
  - inference, especially interaction with contextual typing
  - examples of Promise.then, WinRT, Knockout, Underscore
  - overloads and generics, specifically "overloading on constants"

## 2012/11/14

- More generics: inference only happens when no type parameters are provided.
  - Does inference report errors?
  - Does an empty constraint set produce `{}` or `any`? (Initially going with `{}`)
- Lots of examples to spec enums.

## 2012/11/30

- Generics, TC39, implementation progress

## 2012/12/05

- compile-on-save and compiler configuration (link to onenote page on sharepoint is dead)
- switch design of enums to generate runtime code
  - elaborate our philosophy of Typescript-as-compiler: only emit ts to js. No constant folding or minification.
  - specifically, a reverse mapping
  - so no string enums

## 2012/12/07

- How do private members relate to brands? Are they brands?
- Overloads on string literals
  - Notes include a long email discussion about how to type DOM events using type parameters using string literal arguments.
- Proposal for `readonly`
- Rethinking `var foo.bar = ...` for declaring implicit namespaces -- why not allow assignment declarations? (this is exactly what we did in 2017 or so)

## 2012/12/14

- Generics: Anders argued that constraints were needed after all, for implementations
- Modules
  - Anders argued that namespaces should not declare a type
  - And that ambient namespaces (as we call them in the compiler today) should not declare or emit a variable.
  - and proposed `export = ` *expression* to support Commonjs and AMD.
  - and that namespaces should be able to implement interfaces (this didn't happen)
  - therefore, dynamically-loaded JS that creates a namespace would be declared to implement a namespace instead of having its down type

## 2013/01/11

- implementation
  - "pull model in progress" (first mention of lazy compiler?)
  - generics prototyping to start soon
- recap of remaining language topics for 1.0
  - lots of previously discussed things
  - bool -> boolean
  - readonly and this types were still discussed for 1.0
  - unions, generators and mixins were on the post-1.0 wishlist

## 2013/01/23

- computed property syntax support
- readonly spec (labelled as "off the shelf" and "on the shelf" in different places which I interpret to mean "shelved" and "off the table")
- this types also delayed past 1.0
- discussion of `export=` type export semantics

## 2013/02/01

- TC39 updates -- modules, statics, classes
- structural comparison of generic types
- still more discussion of `export=`

## 2013/02/08

- `export` keyword to be optional in d.ts modules (and other ambient)
- more on `export=` and private statics

## 2013/03/01

- Cut for 1.0:
  - namespaces implementing interfaces
  - `this` type
  - `this` parameters for functions (although marked as "on backlog, not ready", and it wasn't finished until late 2015)
- 0.9 design questions (not sure if these were intended to be implemented during 0.9 as well):
  - `super` and `this` in static: `super` disallowed, `this` allowed
  - tuple types
  - static initialiser

## 2013/03/06

- type-only imports still make the file amodule

## 2013/03/22

- self-hosting compiler on 0.9+generics
- lots of small spec questions

## 2013/03/29

- Xbox Music team feedback
- lots of small spec questions

## 2013/04/29

- many small spec questions
  - return to 0.8 best-common-type semantics
  - implemented more lenient rule for re-declaration: type must be identical
- first (serious?) mention of `protected`
- no implicit any mentioned again

## 2013/05/03

- implementation:
  - enums are done
  - another pass on generics
  - next: `export=`, namespace-function and namespace-class merges
- modules. many small questions, including: 
  - align with ES6 syntax? No (I think this refers to namespaces, not ES modules)

## 2013/05/10

- implementation: `export=`, `require`
- `protected` is cut for 1.0
- noImplicitAny (says "decision in notes" but these are the notes???)

## 2013/06/07

- implementation: language service robustness
- 0.9/1.0/1.1 ship decisions for various features
- proposal to allow dotted names in `typeof`

## 2013/07/29

- implementation: `typeof`, `--noImplicitAny`, performance
- TC39 update: need to support `export default` eventually
- noImplicitAny should error on undeclared property names in index access expressions

## 2013/08/02

- rules for name visibility in d.ts generation

## 2013/09/11

New notetaker: Jonathan Turner!

- small spec questions
- enums are *still* inlined by default

## 2013/10/09

- small spec questions

## 2013/10/14

- d.ts generation discussion led to some principles:
  - "if the user types `typeof A`, we should emit `typeof A`"
  - "The .d.ts file should not generate new names"

## 2013/10/21

- `enum` and `super` questions

## 2013/11/04

- type parameters:
  - should an inference with no candidates be an error? No, current situation is fine.
  - Should type parameters be all covariant? No, the constraint checks in contextual signature instantiation should allow both co- and contra-variance (I don't know what this means exactly and have no idea if it happened.)
- d.ts generation:
  - error when a in-.ts type annotation copied to .d.ts would be an error

## 2013/11/13

- 0.9.5/1.0 release schedule
- many small design questions

## 2013/11/18

- modelling static `this` where JS libraries make it different from the class itself
- other spec/implementation bugs

## 2013/11/22

- update from engineering **strongly** implies that type parameters are covariant-only because it's easier to implement quickly
- same bugs as last time, but with more detail

## 2013/12/02

- many small spec questions

## 2013/12/09

- same spec questions as last week

## 2013/12/16

- 0.9.5 feedback

## 2014/01/06

- several small 1.0 design proposals

## 2014/02/28

This must have been a planning and scheduling meeting for implementing ES2015.

## 2014/03/28

- Summary of ES6 modules
  - conclusion: we can support the syntax, but the semantics differ from CommonJS.

## 2014/04/18

- update on ES6 modules
  - semantics+syntax of `export default`
  - module resolution algorithm
- ES6 symbols, especially iterator protocol and index access types

## 2014/04/25

- `protected` noted as the top-voted issue.
- destructuring mentioned, but the notes then cover tuple and symbol type issues.

## 2014/05/23

- design questions around inference and type parameters
- depth limiter for assignability (is this the first depth limiter?)
- "protected: what does it really mean?" -- along with some example usage

## 2014/06/06

- "Update on compiler adoption" (?)
- ES6 features, including where to put type annotations on destructuring

## 2014/07/11

Another planning and scheduling meeting for implementing ES2015.

- noted that downlevel emit for for-of on arrays is easy and cheap, unlike general for-of iteration.
- lots of notes on ES2015 features:
  - array spread elements
  - spread arguments
  - class expressions
  - mixins (not really ES2015)
  - metaclasses (this seems to mean a class factory, which is now possible in restricted cases)
  - destructuring
- also notes on namespace emit, return type widening, and errors on calling a constructor

## 2014/07/18

- regression from inference change proposed on 05/23
- when to give `{}` value an index signature

## 2014/09/05

- recursive type literals, interface type literals
- `this` types
- class expressions
- first github link! #522

## 2014/09/12 Bonus

A letter from Brian Terlson to TC39 commitee members about types in Javascript.