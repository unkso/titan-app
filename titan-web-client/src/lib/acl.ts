interface AclOption {
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

/**
 * A builder utility to assist in constructing complex ACL conditions.
 */
export class AclRuleBuilder {
  private result = true;

  constructor(private readonly acl: Acl) {}

  isAuthenticatedUser (userId): AclRuleBuilder {
    this.and(this.acl.isAuthenticatedUser(userId));
    return this;
  }

  hasAclPermission (option: string): AclRuleBuilder {
    this.and(this.acl.hasAclPermission(option));
    return this;
  }

  hasAnyAclPermission (options: string[]): AclRuleBuilder {
    this.and(this.acl.hasAnyAclPermission(options));
    return this;
  }

  hasAclPermissions (options: string[]): AclRuleBuilder {
    this.and(this.acl.hasAclPermissions(options));
    return this;
  }

  or(canAccess: boolean): AclRuleBuilder {
    this.result = this.result || canAccess;
    return this;
  }

  and(canAccess: boolean): AclRuleBuilder {
    this.result = this.result && canAccess;
    return this;
  }

  build(): boolean {
    return this.result;
  }
}

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
