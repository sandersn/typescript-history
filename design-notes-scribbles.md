Quick notes as I dump the design notes 2011-2014 to PDF.

- Items frequently say 'attached', but I don't see any attachments, even in the desktop onenote app.

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