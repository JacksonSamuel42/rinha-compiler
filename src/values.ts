import { Parameter, Term } from "./ast";
import Environment from "./environment";

export type ValueTypes =
    | "Null"
    | "Int"
    | "Str"
    | "Bool"
    | "Tuple"
    | "Closure"
    | "Function"

export interface RuntimeValue {
    type: ValueTypes
    value?: any
}

export interface NullVal extends RuntimeValue {
    type: "Null",
    value: null
}

export interface IntVal extends RuntimeValue {
    type: "Int",
    value: number
}

export interface StrVal extends RuntimeValue {
    type: "Str",
    value: string
}

export interface BoolVal extends RuntimeValue {
    type: "Bool";
    value: boolean;
}

export interface TupleVal extends RuntimeValue {
    type: "Tuple";
    fst: RuntimeValue;
    snd: RuntimeValue
}

export interface ClosureVal extends RuntimeValue {
    type: "Closure";
    parameters: Parameter[];
    body: Term;
    env: Environment;
}