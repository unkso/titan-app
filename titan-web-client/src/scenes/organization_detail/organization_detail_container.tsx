import React, {useEffect} from 'react';
import {combineLatest} from "rxjs";
import { useParams } from 'react-router-dom';
import {Organization, TitanApiClient} from "@titan/http/api";
import {
    OrganizationActions,
    organizationModelSelector
} from "@titan/store/organization";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "@titan/store/root_reducer";

export function OrganizationDetailContainer(props) {
    const params = useParams();
    const dispatch = useDispatch();
    const organization = useSelector<AppState, Organization>(organizationModelSelector);

    useEffect(() => {
        combineLatest([
            TitanApiClient.getOrganization({id: params.id}),
            TitanApiClient.getOrganizationRoles({orgId: params.id}),
            TitanApiClient.getOrganizationChildren({orgId: params.id}),
            TitanApiClient.getOrganizationUsers({orgId: params.id}),
            TitanApiClient.getOrganizationChainOfCommand({orgId: params.id}),
        ]).subscribe(([org, roles, children, users, coc]) => {
            dispatch(OrganizationActions.setOrganization(org));
            dispatch(OrganizationActions.setChildren(children));
            dispatch(OrganizationActions.setRoles(roles));
            dispatch(OrganizationActions.setMembers(users));
            dispatch(OrganizationActions.setChainOfCommand(coc));
        });
        return () => {
            dispatch(OrganizationActions.setOrganization(undefined));
            dispatch(OrganizationActions.setRoles([]));
            dispatch(OrganizationActions.setChildren([]));
            dispatch(OrganizationActions.setMembers([]));
        }
    }, [params]);

    return organization ? props.children : null;
}
