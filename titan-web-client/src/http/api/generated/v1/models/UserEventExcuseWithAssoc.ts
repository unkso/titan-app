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
    EventType,
    UserProfile,
} from './';

/**
 * @export
 * @interface UserEventExcuseWithAssoc
 */
export interface UserEventExcuseWithAssoc {
    /**
     * @type {number}
     * @memberof UserEventExcuseWithAssoc
     */
    id: number;
    /**
     * @type {number}
     * @memberof UserEventExcuseWithAssoc
     */
    dateModified: number;
    /**
     * @type {number}
     * @memberof UserEventExcuseWithAssoc
     */
    dateCreated: number;
    /**
     * @type {string}
     * @memberof UserEventExcuseWithAssoc
     */
    ackComments?: string;
    /**
     * @type {number}
     * @memberof UserEventExcuseWithAssoc
     */
    ackDate?: number;
    /**
     * @type {number}
     * @memberof UserEventExcuseWithAssoc
     */
    ackUserId?: number;
    /**
     * @type {string}
     * @memberof UserEventExcuseWithAssoc
     */
    comments: string;
    /**
     * @type {number}
     * @memberof UserEventExcuseWithAssoc
     */
    eventDate: number;
    /**
     * @type {EventType}
     * @memberof UserEventExcuseWithAssoc
     */
    eventType: EventType;
    /**
     * @type {UserProfile}
     * @memberof UserEventExcuseWithAssoc
     */
    userProfile: UserProfile;
}
