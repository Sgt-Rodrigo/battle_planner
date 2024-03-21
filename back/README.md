## packet.json

*** type: module >

indicates the use of ECMASCRIPT syntax for modules.

## tsconfig.json

*** module && moduleResolution = NodeNext >

indicates the generation and resolution of modules is compatible with both CommonJs and ECMAScript syntax

*** sourceMap: true >

to map the ts code with the js code, useful to trace errors when debugging.

*** noEmitOnError: true > prevents compilation if any type error is found.


## Services

-I use a class to encapsulate services and use them as instance methods. > 
-to avoid cluttering the code with all imported services declarations