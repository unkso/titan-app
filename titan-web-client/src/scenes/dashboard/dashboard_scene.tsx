import React from 'react';
import {OrganizationCard} from "@titan/components/organizations/organization_card";
import {useSelector} from "react-redux";
import {authOrganizationsSelector} from "@titan/store/auth_user";

export function DashboardScene() {
    const organizations = useSelector(authOrganizationsSelector);
    return (
        <div>
            {organizations.map(org =>
                <OrganizationCard organization={org.organization} />
            )}
        </div>
    );
}
