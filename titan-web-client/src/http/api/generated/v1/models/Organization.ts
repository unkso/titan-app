// tslint:disable
/**
 * Titan
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 * @export
 * @interface Organization
 */
export interface Organization {
    /**
     * @type {string}
     * @memberof Organization
     */
    id: string;
    /**
     * @type {string}
     * @memberof Organization
     */
    name: string;
    /**
     * @type {string}
     * @memberof Organization
     */
    slug: string;
    /**
     * @type {string}
     * @memberof Organization
     */
    avatarUrl: string;
    /**
     * @type {string}
     * @memberof Organization
     */
    groupType: string;
    /**
     * @type {number}
     * @memberof Organization
     */
    wcfUserGroupId: number;
    /**
     * @type {boolean}
     * @memberof Organization
     */
    isEnabled: boolean;
    /**
     * @type {number}
     * @memberof Organization
     */
    parentId?: number;
}
