import React, {PropsWithChildren, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {useDispatch} from "react-redux";
import {
    TitanApiClient,
} from "@titan/http/api";
import {
    UserProfileActions,
} from "@titan/store/profile";
import {combineLatest} from "rxjs";

export function UserProfileContainer(props) {
    const params = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        combineLatest([
            TitanApiClient.getUser({userId: params.id}),
            TitanApiClient.getUserFileEntries({userId: params.id}),
            TitanApiClient.getUserExcuses({userId: params.id}),
            TitanApiClient.getUserOrganizations({userId: params.id, member: true, role: true})
        ]).subscribe(([user, fileEntries, excuses, memberships]) => {
            dispatch(UserProfileActions.setUser(user));
            dispatch(UserProfileActions.setEventExcuses(excuses));
            dispatch(UserProfileActions.setFileEntries(fileEntries));
            dispatch(UserProfileActions.setOrganizationMemberships(memberships));
            setLoading(false);
        });
    }, [params]);

    if (loading) {
        return null;
    }

    return props.children;
}
