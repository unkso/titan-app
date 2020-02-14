import {AclMap} from "@titan/lib/acl/types";
import {Acl} from "@titan/lib/acl/acl";

export {Acl} from '@titan/lib/acl/acl';
export {AclRuleBuilder} from '@titan/lib/acl/acl_rule_builder';
export {Permission} from '@titan/lib/acl/permissions';
export {useAcl} from '@titan/lib/acl/hooks';

export const createAclInstance =
    (authUserId, aclMap: AclMap, roles = []) => {
        return new Acl(authUserId, aclMap, roles);
    };

/**
 * Creates an ACL instance from a user's session.
 *
 * @param {{user: {id}, acl: {}}} authSession
 * @returns {Acl}
 */
export const createAclInstanceFromSession = (authSession) => {
    return createAclInstance(
        authSession.user.id, authSession.acl, authSession.roles);
};
