import React, {useEffect} from 'react';
import {getApiClient} from "@titan/http/api";


export function DashboardLayout(props) {
    useEffect(() => {
        getApiClient().getOrganizations().subscribe(orgs => {
            console.log('request complete:', orgs);
        });
    }, []);
    return (
        <div>
            {props.children}
        </div>
    );
}
