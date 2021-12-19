# Importing packages
`import { Tuple } from "js-ds"`
# Tuple
`const tuple = new Tuple(1, 2, 3)`

`tuple[0] = 2`

`console.log(tuple[0]) //-> 2`

`tuple[4] = 3; //-> RangeError: The last index of the tuple is 2`

`tuple[4]; //-> RangeError: The last index of the tuple is 2`

`tuple.push(3) //-> TypeError: Invalid method. Tuple can't change its length`
