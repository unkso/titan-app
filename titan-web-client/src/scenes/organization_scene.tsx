import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {Organization, TitanApiClient} from "@titan/http/api";

export function OrganizationScene() {
    const params = useParams();
    const [organization, setOrganization] = useState<Organization>();

    useEffect(() => {
        TitanApiClient.getOrganization({id: params.id}).subscribe(org => {
            setOrganization(org);
        });
    }, [params]);

    if (!organization) {
        return null;
    }

    return (
        <h1>{organization.name}</h1>
    );
}
