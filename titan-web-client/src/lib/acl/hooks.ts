import { useSelector } from 'react-redux';
import {useEffect, useState} from 'react';
import {Acl, createAclInstanceFromSession} from '@titan/lib/acl';
import {AppState} from "@titan/store/root_reducer";

/**
 * A factory function that returns a boolean value indicating
 * whether the authenticated use has permission to access a resource.
 */
type AclResultFactory = (acl: Acl) => boolean;

/**
 * A React hook that determines if the authenticated user is
 * authorized to access a resource.
 *
 * @example
 *
 * const canCreateFileEntries = useAcl(acl =>
 *      acl.hasAclPermission(PERMISSION_CAN_CREATE_FILE_ENTRIES));
 */
export function useAcl (factory: AclResultFactory) {
    const session = useSelector<AppState>(state => state.authUser);
    const [canAccess, setCanAccess] = useState(false);

    useEffect(() => {
        const acl = createAclInstanceFromSession(session);
        setCanAccess(factory(acl))
    }, [session, factory]);

    return canAccess;
}
