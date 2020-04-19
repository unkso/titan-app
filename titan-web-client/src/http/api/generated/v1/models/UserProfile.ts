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

import {
    WcfUserProfile,
} from './';

/**
 * @export
 * @interface UserProfile
 */
export interface UserProfile {
    /**
     * @type {number}
     * @memberof UserProfile
     */
    id: number;
    /**
     * @type {number}
     * @memberof UserProfile
     */
    wcfId: number;
    /**
     * @type {number}
     * @memberof UserProfile
     */
    legacyPlayerId?: number;
    /**
     * @type {number}
     * @memberof UserProfile
     */
    rankId: number;
    /**
     * @type {string}
     * @memberof UserProfile
     */
    username?: string;
    /**
     * @type {number}
     * @memberof UserProfile
     */
    orientation?: number;
    /**
     * @type {number}
     * @memberof UserProfile
     */
    bctE0?: number;
    /**
     * @type {number}
     * @memberof UserProfile
     */
    bctE1?: number;
    /**
     * @type {number}
     * @memberof UserProfile
     */
    bctE2?: number;
    /**
     * @type {number}
     * @memberof UserProfile
     */
    bctE3?: number;
    /**
     * @type {number}
     * @memberof UserProfile
     */
    a15?: number;
    /**
     * @type {number}
     * @memberof UserProfile
     */
    dateJoined?: number;
    /**
     * @type {number}
     * @memberof UserProfile
     */
    lastActivity: number;
    /**
     * @type {WcfUserProfile}
     * @memberof UserProfile
     */
    wcf: WcfUserProfile;
}
