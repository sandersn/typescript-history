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