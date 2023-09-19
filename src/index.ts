import { interpret } from "./interpreter";
import json from '../var/rinha/source.rinha.json'

function interpreter(){
    console.time()
    interpret(json as any);
    console.timeEnd()
}

interpreter()