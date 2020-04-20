import React, {useEffect, useState} from 'react';
import {Organization} from "@titan/http/api";
import {Avatar} from "@material-ui/core";

export interface OrganizationSidebarItemProps {
    name: string;
    path: string;
}

export function OrganizationSidebarItem(props: OrganizationSidebarItemProps) {
    const [abbr, setAbbr] = useState('');
    useEffect(() => {
        // Get the first letter of the first two words in the
        // organization name.
        const letters = props.name.split(' ', 1)
            .map(word => word[0])
            .join();
        setAbbr(letters);
    }, [props.name]);

    return (
        <a href={props.path}>
            <Avatar>{abbr}</Avatar>
        </a>
    );
}
