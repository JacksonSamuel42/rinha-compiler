import { BinaryOp, File, Term } from "./ast";
import Environment from "./environment";
import { BoolVal, ClosureVal, IntVal, RuntimeValue, StrVal, TupleVal } from "./values";

interface NewEnvironment {
    [key: string]: Term;
}

function evaluate_binary_expr(left: IntVal, right: IntVal, operator: BinaryOp): RuntimeValue {
    switch (operator) {
        case "Add":
            return { type: "Int", value: left.value + right.value } as IntVal;
        case "Div":
            return { type: "Int", value: left.value / right.value } as IntVal;
        case "Sub":
            return { type: "Int", value: left.value - right.value } as IntVal;
        case "Mul":
            return { type: "Int", value: left.value * right.value } as IntVal;
        case "Rem":
            return { type: "Int", value: left.value % right.value } as IntVal;
        case "And":
            return { type: "Int", value: left.value && right.value } as IntVal;
        case "Or":
            return { type: "Int", value: left.value || right.value } as IntVal;
        case "Gt":
            return { type: "Bool", value: left.value > right.value } as BoolVal;
        case "And":
            return { type: "Int", value: left.value && right.value } as IntVal;
        case "Lt":
            return { type: "Bool", value: left.value < right.value } as BoolVal;
        case "Gte":
            return { type: "Bool", value: left.value >= right.value } as BoolVal;
        case "Lte":
            return { type: "Bool", value: left.value <= right.value } as BoolVal;
        case "Neq":
            return { type: "Bool", value: left.value != right.value } as BoolVal;
        case "Eq":
            return { type: "Bool", value: left.value == right.value } as BoolVal;
        default:
            throw new Error(`Unsupported binary operator: ${operator}`);
    }
}

export let interpret = (file: File) => {
    const env = new Environment()
    return evaluate(file.expression, env)
}

export function evaluate(node: Term, env: Environment): RuntimeValue {
    switch (node.kind) {
        case "Str":
            return { type: "Str", value: node.value } as StrVal
        case "Bool":
            return { type: "Bool", value: node.value } as BoolVal
        case "Int":
            return { type: "Int", value: node.value } as IntVal
        case "Var":
            if (env.lookupVar(node.text))
                return env.lookupVar(node.text)
            else
                throw new Error(`Variable ${node.text} not found`);
        case "Let":
            const value = evaluate(node.value, env)
            env.declareVar(node.name.text, value)
            return evaluate(node.value, env)
        case "If":
            if (node.condition)
                return evaluate(node.then, env)
            else
                return evaluate(node.otherwise, env)
        case "Binary":
            const lhs = evaluate(node.lhs, env)
            const rhs = evaluate(node.rhs, env)
            return evaluate_binary_expr(lhs as IntVal, rhs as IntVal, node.op)
        case "Print":
            const printedValue = evaluate(node.value, env);
            console.log(printedValue);
            return printedValue;
        case "Tuple":
            const firstValue = evaluate(node.first, env);
            const secondValue = evaluate(node.second, env);
            return { type: "Tuple", fst: firstValue, snd: secondValue } as TupleVal
        case "First":
            const tupleFirstVal = evaluate(node.value, env) as TupleVal
            if (tupleFirstVal.type == "Tuple")
                return tupleFirstVal.fst
            else
                throw new Error("Trying to access 'second' of a non-tuple");
        case "Second":
            const tupleSecondVal = evaluate(node.value, env) as TupleVal
            if (tupleSecondVal.type == "Tuple")
                return tupleSecondVal.snd
            else
                throw new Error("Trying to access 'second' of a non-tuple");
        // case "Call":
        //     const callee = evaluate(node.callee, env);
        //     if (typeof callee === "function") {
        //         const args = node.arguments.map(arg => evaluate(arg, env));
        //         const newEnv: NewEnvironment = {};
        //         for (let i = 0; i < node.arguments.length; i++) {
        //             if (node.callee.kind === "Function" && node.callee.parameters[i]) {
        //                 newEnv[node.callee.parameters[i].text] = args[i];
        //             }
        //         }
        //         return evaluate(node.callee.body, { ...env, ...newEnv });
        //     } else {
        //         throw new Error("Trying to call a non-function");
        //     }
        // case "Function":
        //     return {
        //         type: "Function",
        //         value: {
        //             parameters: node.parameters,
        //             body: node.value,
        //             env
        //         } 
        //     };
        default:
            throw new Error(`Unsupported node kind: ${node.kind}`);
    }
}