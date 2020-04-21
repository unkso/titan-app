import React from 'react';
import {useSelector} from "react-redux";
import {authOrganizationsSelector} from "@titan/store/auth_user";
import {OrganizationsList} from "@titan/components/organizations/organizations_list";

export function DashboardScene() {
    const organizations = useSelector(authOrganizationsSelector);
    return (
        <OrganizationsList
            organizations={organizations.map(org => org.organization)}
        />
    );
}
