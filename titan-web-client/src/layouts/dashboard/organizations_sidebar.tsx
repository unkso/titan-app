import React from 'react';
import {
    OrganizationSidebarItem,
    OrganizationSidebarItemProps
} from "@titan/layouts/dashboard/organization_sidebar_item";

export interface OrganizationsSidebarProps {
    items: ReadonlyArray<OrganizationSidebarItemProps>;
}

export function OrganizationsSidebar(props: OrganizationsSidebarProps) {
    return (
        <div>
            {props.items.map((item, index) =>
                <OrganizationSidebarItem
                    name={item.name}
                    path={item.path}
                    key={index}
                />
            )}
        </div>
    );
}
