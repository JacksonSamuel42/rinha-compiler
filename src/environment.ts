import { RuntimeValue } from "./values";

export default class Environment {
    parent?: Environment;
    variable: Map<string, RuntimeValue>

    constructor(parentEnv?: Environment) {
        this.parent = parentEnv;
        this.variable = new Map()
    }

    declareVar(varname: string, value: RuntimeValue): RuntimeValue {
        if (this.variable.has(varname)) {
            throw `Cannot declare variable ${this.variable}. As it already exist`
        }
        this.variable.set(varname, value)
        return value
    }

    assignVar(varname: string, value: RuntimeValue): RuntimeValue {
        const env = this.resolve(varname)
        env.variable.set(varname, value)
        return value;
    }

    lookupVar(varname: string): RuntimeValue {
        const resolve = this.resolve(varname);
        return resolve.variable.get(varname) as RuntimeValue
    }

    resolve(varname: string): Environment {
        if (this.variable.has(varname)) {
            return this
        }

        if (this.parent == undefined) {
            throw `Cannot resolve '${varname}' as it does exist.`
        }

        return this.resolve(varname)
    }
}