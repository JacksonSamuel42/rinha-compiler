import { interpret } from "./interpreter";
import json from '../files/fib.json'

function interpreter(){
    const result = interpret(json as any);
    console.log(result)
}

interpreter()