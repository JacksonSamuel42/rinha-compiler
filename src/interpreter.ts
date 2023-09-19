import { File, Term } from "./ast";
import Environment from "./environment";
import { eval_binary_expr } from "./expressions";
import { BoolVal, ClosureVal, IntVal, RuntimeValue, StrVal, TupleVal } from "./values";

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
            return evaluate(node.next, env)
        case "If":
            const condition = evaluate(node.condition, env)
            if (condition.value == true)
                return evaluate(node.then, env)
            else
                return evaluate(node.otherwise, env)
        case "Binary":
            return eval_binary_expr(node, env)
        case "Print":
            const printedValue = evaluate(node.value, env);
            console.log(printedValue.value);
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
        case "Call":
            const calleeValue = evaluate(node.callee, env)
            const callee = calleeValue as ClosureVal

            if (callee.type !== "Closure") throw new Error("Attempting to call a non-function value.");

            // Check if the number of arguments matches the number of parameters
            if (node.arguments.length !== callee.parameters.length) {
                throw new Error("Number of arguments does not match the number of parameters.");
            }

            // Create a new environment for the function call with the parameters bound to the arguments
            const callEnv = new Environment(callee.env);

            for (let i = 0; i < node.arguments.length; i++) {
                const argValue = evaluate(node.arguments[i], env);
                const parameter = callee.parameters[i];
                callEnv.declareVar(parameter.text, argValue);
            }

            // Evaluate the function body in the new environment
            return evaluate(callee.body, callEnv);

        case "Function":
            return {
                type: "Closure",
                parameters: node.parameters,
                body: node.value,
                env: env,
            } as ClosureVal;

        default:
            throw new Error(`Unsupported node : ${node}`);
    }
}