Quick notes as I dump the design notes 2011-2014 to PDF.

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

