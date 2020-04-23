import {PropsWithChildren, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {DashboardLayoutActions} from "@titan/store/dashboard_layout";

export function CommunityScene(props: PropsWithChildren<any>) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(DashboardLayoutActions.setPageMenu({
            subheaderLabel: 'Community',
            items: [
                {
                    label: 'Organizations',
                    path: '/dashboard/community/organizations',
                },
                {
                    label: 'Members',
                    path: '/dashboard/community/members',
                }
            ]
        }))
    }, [dispatch]);

    return props.children;
}
