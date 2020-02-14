import {Acl} from "@titan/lib/acl/acl";

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
