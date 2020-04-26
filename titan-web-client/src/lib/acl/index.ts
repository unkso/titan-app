import {AclOptionMap, AclOptionToken} from "@titan/lib/acl/types";
import {Acl} from "@titan/lib/acl/acl";
import {
    authOrganizationRolesSelector,
    AuthUserState
} from "@titan/store/auth_user";
import {assert} from "@titan/lib/assert";
import {
    OrganizationRole,
    UserOrganizationMembership
} from "@titan/http/api";

export {Acl} from '@titan/lib/acl/acl';
export {AclRuleBuilder} from '@titan/lib/acl/acl_rule_builder';
export {Permission} from '@titan/lib/acl/permissions';
export {useAcl} from '@titan/lib/acl/hooks';

export const createAclInstance =
    (authUserId, aclOptions: AclOptionToken[],
     roles: OrganizationRole[] = []) =>
        new Acl(authUserId, new Set(aclOptions), roles);

/**
 * Creates an ACL instance from a user's session.
 *
 * @param {{user: {id}, acl: {}}} authUserState
 * @returns {Acl}
 */
export const createAclInstanceFromSession = (authUserState: AuthUserState) => {
    return createAclInstance(
        assert(authUserState.user).id,
        assert(authUserState.aclOptions),
        assert(authUserState.organizations)
            .map(org => org.role)
            .filter(role => !!role) as OrganizationRole[]);
};
