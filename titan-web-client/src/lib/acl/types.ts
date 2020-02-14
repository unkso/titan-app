export interface AclOption {
    /** Unique numeric Id. */
    optionId: number;
    /** A unique name for the option. */
    optionName: string;
    /** WCF category name. For now, this will always be "titan". */
    categoryName: string;
}

/**
 * A key value map where the value is an AclOption and the key is
 * a representation of the value in the form:
 *
 *    mod.{OPTION_CATEGORY_NAME}:{OPTION_NAME}
 */
export interface AclMap {
    [key: string]: AclOption;
}
