import React from 'react';
import {Organization} from "@titan/http/api";
import {OrganizationSidebarItem} from "@titan/layouts/dashboard/organization_sidebar_item";

interface OrganizationsSidebarProps {
    organizations: ReadonlyArray<Organization>;
}

export function OrganizationsSidebar(props: OrganizationsSidebarProps) {
    return (
        <div>
            {props.organizations.map((org, index) =>
                <OrganizationSidebarItem organization={org} key={index} />
            )}
        </div>
    );
}
