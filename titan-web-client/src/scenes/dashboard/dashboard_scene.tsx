import React from 'react';
import {useSelector} from "react-redux";
import {authOrganizationsSelector} from "@titan/store/auth_user";
import {OrganizationsList} from "@titan/components/organizations/organizations_list";
import {DashboardSection} from "@titan/layouts/dashboard/dashboard_section";

export function DashboardScene() {
    const organizations = useSelector(authOrganizationsSelector);
    return (
        <DashboardSection>
            <OrganizationsList
                organizations={organizations.map(org => org.organization)}
            />
        </DashboardSection>
    );
}
