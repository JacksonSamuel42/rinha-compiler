import { interpret } from "./interpreter";
import json from '../var/rinha/source.rinha.json'

function interpreter(){
    const result = interpret(json as any);
    console.log(result)
}

interpreter()