import { Store } from "./store";

export function getStoresSnapshot(__stores__: any) {
    let acc: { [key: string]: any | undefined } = {};
    const keys = Object.keys(__stores__);
    for (let i = 0; i < keys.length; i++) {
        let storeName = keys[i];
        acc[storeName] = __stores__[storeName].getValue();
    }

    return acc;
}

export function deepFreeze(o: any, excludedProps: string[] = []) {
    Object.freeze(o);

    var oIsFunction = typeof o === "function";
    var hasOwnProp = Object.prototype.hasOwnProperty;

    Object.getOwnPropertyNames(o).forEach(function (prop) {
        if (prop.startsWith('ɵ') || excludedProps.indexOf(prop) > -1) {
            return;
        }
        if (hasOwnProp.call(o, prop)
            && (oIsFunction ? prop !== 'caller' && prop !== 'callee' && prop !== 'arguments' : true)
            && o[prop] !== null
            && (typeof o[prop] === "object" || typeof o[prop] === "function")
            && !Object.isFrozen(o[prop])) {
            deepFreeze(o[prop], excludedProps);
        }
    });

    return o;
};


export function isFunction(value: any): value is Function {
    return typeof value === 'function';
}

export function isUndefined(value: any): value is undefined {
    return value === undefined;
}

export function isNil(v: any) {
    return v === null || v === undefined;
}

export function toBoolean(value: any): boolean {
    return value != null && `${value}` !== 'false';
}

export function isArray<T>(value: any): value is T[] {
    return Array.isArray(value);
}

export function coerceArray<T>(value: T | T[]): T[] {
    if (isNil(value)) {
        return [];
    }
    return Array.isArray(value) ? value : [value];
}

export function isEmpty<T>(arr: T) {
    if (isArray(arr)) {
        return arr.length === 0;
    }
    return false;
}

export function isPlainObject(value: any) {
    return toBoolean(value) && value.constructor.name === 'Object';
}

export const __stores__: { [storeName: string]: Store<any> } = {};

export type UpdateStateCallback<State> = (state: State) => Partial<State> | void;

export type UpdateEntityPredicate<E> = (entity: E) => boolean;

export type OrArray<Type> = Type | Type[];

export type UpdateEntitiesParams<State, Entity> = {
    state: State;
    ids: any[];
    idKey: string;
    newStateOrFn: UpdateStateCallback<Entity> | Partial<Entity> | Partial<State>;
};

