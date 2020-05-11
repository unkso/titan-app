import {PropsWithChildren, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {DashboardLayoutActions} from "@titan/store/dashboard_layout";

export function CommunityContainer(props: PropsWithChildren<any>) {
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
        }));

        return () => {
            dispatch(DashboardLayoutActions.setPageMenu(undefined));
        }
    }, [dispatch]);

    return props.children;
}
