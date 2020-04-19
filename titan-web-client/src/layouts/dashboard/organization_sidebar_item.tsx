import React, {useEffect, useState} from 'react';
import {Organization} from "@titan/http/api";
import {Avatar} from "@material-ui/core";

interface OrganizationSidebarItemProps {
    organization: Organization;
}

export function OrganizationSidebarItem(props: OrganizationSidebarItemProps) {
    const [abbr, setAbbr] = useState('');
    useEffect(() => {
        // Get the first letter of the first two words in the
        // organization name.
        const letters = props.organization.slug.split(' ', 1)
            .map(word => word[0])
            .join();
        setAbbr(letters);
    }, [props.organization.slug]);

    return (
        <a href={props.organization.slug}>
            <Avatar>{abbr}</Avatar>
        </a>
    );
}
