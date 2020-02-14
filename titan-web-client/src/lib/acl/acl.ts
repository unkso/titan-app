import {AclMap} from '@titan/lib/acl/types';
import {AclRuleBuilder} from '@titan/lib/acl';

/**
 * A utility for checking the authenticated user's access to arbitrary
 * resources.
 */
export class Acl {
  // TODO replace 'any' type with OrganizationRole entity struct
  //  once API codegen is complete.
  constructor (private readonly authUserId: number,
               private readonly aclMap: AclMap,
               private readonly leadershipRoles: any[] = []) {
  }

  /** Returns a new ACL rule builder. */
  newBuilder () {
    return new AclRuleBuilder(this);
  }

  /**
   * Returns true if the given user id matches the authenticated user.
   */
  isAuthenticatedUser (userId) {
    return userId === this.authUserId;
  }

  /**
   * Returns true if the authenticated user has permission to access
   * the given resource.
   */
  hasAclPermission (optionKey: string): boolean {
    return !!this.aclMap[optionKey];
  }

  /**
   * Returns true if the authenticated user has permission to access
   * at least one of the given resources.
   */
  hasAnyAclPermission (optionKeys: string[]): boolean {
    return optionKeys.some(key => this.hasAclPermission(key));
  }

  /**
   * Returns true if the authenticated user has permission to access
   * all of the given resources.
   */
  hasAclPermissions (optionKeys) {
    return optionKeys.every(optionKey =>
        this.hasAclPermission(optionKey));
  }

  /**
   * Returns true if the authenticated user has at least one
   * leadership role in any organization.
   */
  hasLeadershipRole (): boolean {
    return this.leadershipRoles.length > 0;
  }
}
