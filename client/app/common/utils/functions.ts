export function isPresent(obj: any): boolean {
    return obj !== undefined && obj !== null;
}

export function isBlank(obj: any): boolean {
    return obj === undefined || obj === null;
}

export function isBoolean(obj: any): boolean {
    return typeof obj === 'boolean';
}

export function isNumber(obj: any): boolean {
    return typeof obj === 'number';
}

export function isString(obj: any): obj is String {
    return typeof obj === 'string';
}

export function isFunction(obj: any): boolean {
    return typeof obj === 'function';
}

export function isType(obj: any): boolean {
    return isFunction(obj);
}

export function isArray(obj: any): boolean {
    return (obj && Array.isArray(obj));
}

export function isObject(obj: any): boolean {
    return (obj && !isArray(obj) && (typeof obj === 'object') );
}