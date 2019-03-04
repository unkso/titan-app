class Acl {
  constructor (authUserId, options = []) {
    this.authUserId = authUserId;
    this.authUserAclOptions = options;
  }

  canAccess (expectedAclOptions = [], authUserOptions,
    mustHaveAllOptions = true) {
    if (authUserOptions) {
      if (authUserOptions.mustHaveOptions) {
        return this.isAuthenticatedUser(authUserOptions.userId) &&
            this.hasAclPermissions(
              expectedAclOptions, mustHaveAllOptions);
      }

      return this.isAuthenticatedUser(authUserOptions.userId) ||
          this.hasAclPermissions(
            expectedAclOptions, mustHaveAllOptions);
    }

    return this.hasAclPermissions(
      expectedAclOptions, mustHaveAllOptions);
  }

  isAuthenticatedUser (currentUserId) {
    return currentUserId === this.authUserId;
  }

  hasAclPermissions (expectedAclOptions, mustHaveAllOptions) {
    if (mustHaveAllOptions) {
      return expectedAclOptions.every((optionKey) =>
        this.authUserAclOptions.hasOwnProperty(optionKey));
    }

    return expectedAclOptions.some((optionKey) =>
      this.authUserAclOptions.hasOwnProperty(optionKey));
  }
}

export const createAclInstance = (authUserId, options = []) => {
  return new Acl(authUserId, options);
};

/**
 * Creates an ACL instance from a user's session.
 *
 * @param {{user: {id}, acl: {}}} authSession
 * @returns {Acl}
 */
export const createAclInstanceFromSession = (authSession) => {
  return createAclInstance(authSession.user.id, authSession.acl);
};
