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
 * @interface OrganizationRole
 */
export interface OrganizationRole {
    /**
     * @type {number}
     * @memberof OrganizationRole
     */
    id?: number;
    /**
     * @type {number}
     * @memberof OrganizationRole
     */
    organizationId?: number;
    /**
     * @type {number}
     * @memberof OrganizationRole
     */
    userId?: number;
    /**
     * @type {string}
     * @memberof OrganizationRole
     */
    role?: string;
    /**
     * @type {string}
     * @memberof OrganizationRole
     */
    rank?: string;
}
