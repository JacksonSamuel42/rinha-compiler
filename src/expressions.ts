import { Binary, BinaryOp } from "./ast"
import Environment from "./environment"
import { evaluate } from "./interpreter"
import { BoolVal, IntVal, NullVal, RuntimeValue } from "./values"

let isEqual = (left: RuntimeValue, right: RuntimeValue): boolean => {
    if (left.type == "Int" && right.type == "Int") {
        return left.value == right.value
    } else if (left.type == "Str" && right.type == "Str") {
        return left.value == right.value
    } if (left.type == "Bool" && right.type == "Bool") {
        return left.value == right.value
    } else {
        throw "number or string or boolean"
    }
}

function eval_numeric_binary_expr(left: IntVal, right: IntVal, operator: BinaryOp): RuntimeValue {

    switch (operator) {
        case "Add":
            return { type: "Int", value: left.value + right.value }
        case "Sub":
            return { type: "Int", value: left.value - right.value }
        case "Mul":
            return { type: "Int", value: left.value * right.value }
        case "Div":
            return { type: "Int", value: left.value / right.value }
        case "Rem":
            return { type: "Int", value: left.value % right.value }
        case "Eq":
            const eq = isEqual(left, right);
            return { type: "Bool", value: eq }
        case "Neq":
            const neq = !isEqual(left, right);
            return { type: "Bool", value: neq }
        case "Lt":
            return { type: "Bool", value: left.value < right.value }
        case "Gt":
            return { type: "Bool", value: left.value > right.value }
        case "Lte":
            return { type: "Bool", value: left.value <= right.value }
        case "Gte":
            return { type: "Bool", value: left.value >= right.value }
        default:
            throw "invalid binary expression";
    }
}

function eval_boolean_binary_expr(left: BoolVal, right: BoolVal, operator: BinaryOp): BoolVal {
    switch (operator) {
        case "And":
            return { type: "Bool", value: left.value || right.value }
        case "Or":
            return { type: "Bool", value: left.value || right.value }
        default:
            throw "invalid binary expression";
    }
}

export function eval_binary_expr(binop: Binary, env: Environment): RuntimeValue {
    const lhs = evaluate(binop.lhs, env)
    const rhs = evaluate(binop.rhs, env)

    if (lhs.type == "Int" && rhs.type == "Int") {
        return eval_numeric_binary_expr(lhs as IntVal, rhs as IntVal, binop.op);
    } else if (lhs.type == "Bool" && rhs.type == "Bool") {
        return eval_boolean_binary_expr(lhs as BoolVal, rhs as BoolVal, binop.op);
    }

    return { type: "Null", value: null } as NullVal
}