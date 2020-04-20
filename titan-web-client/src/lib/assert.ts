/**
 * Throws if {@param value} is null|undefined or returns the value.
 */
export function assert<T>(value: T|undefined|null, message?: string): T {
    if (value === undefined || value === null) {
        if (message) {
            throw new Error(message);
        }
        throw new Error(`Expected value "${value}" to be ` +
            `defined and non-null.`);
    }

    return value;
}
