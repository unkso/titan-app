import React, {useEffect, useState} from 'react';
import {Organization, TitanApiClient} from "@titan/http/api";
import {OrganizationsList} from "@titan/components/organizations/organizations_list";
import {DashboardSection} from "@titan/layouts/dashboard/dashboard_section";

export function OrganizationsListScene() {
    const [organizations, setOrganizations] = useState<Organization[]>([]);

    useEffect(() => {
        TitanApiClient.getOrganizations().subscribe(orgs => {
            setOrganizations(orgs);
        });
    }, []);

    return (
        <DashboardSection>
            <h1>Organizations</h1>
            <OrganizationsList organizations={organizations} />
        </DashboardSection>
    );
}
