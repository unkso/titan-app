import {AclOptionToken} from '@titan/lib/acl/types';
import {AclRuleBuilder} from '@titan/lib/acl';
import {OrganizationRole} from "@titan/http/api";

/**
 * A utility for checking the authenticated user's access to arbitrary
 * resources.
 */
export class Acl {
  constructor (private readonly authUserId: number,
               private readonly actionOptionsSet: Set<AclOptionToken>,
               private readonly leadershipRoles: OrganizationRole[] = []) {
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
    return this.actionOptionsSet.has(optionKey);
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
