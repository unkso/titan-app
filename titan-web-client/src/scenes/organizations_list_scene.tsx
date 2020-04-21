import React, {useEffect, useState} from 'react';
import {Organization, TitanApiClient} from "@titan/http/api";
import {OrganizationsList} from "@titan/components/organizations/organizations_list";

export function OrganizationsListScene() {
    const [organizations, setOrganizations] = useState<Organization[]>([]);

    useEffect(() => {
        TitanApiClient.getOrganizations().subscribe(orgs => {
            setOrganizations(orgs);
        });
    }, []);

    return (
        <div>
            <h1>Organizations</h1>
            <OrganizationsList organizations={organizations} />
        </div>
    );
}
