import React from 'react';
import styled from 'styled-components';
import {
    List,
    ListItem,
    ListItemText,
    ListSubheader
} from "@material-ui/core";
import {DashboardLayoutPageMenu} from "@titan/store/dashboard_layout";
import {RouteLink} from "@titan/components/routes";

const StyledPageSidebar = styled.div`
  width: 240px;
`;

interface PageSidebarProps {
    menu: DashboardLayoutPageMenu;
}

export function PageSidebar(props: PageSidebarProps) {
    return (
        <StyledPageSidebar component="nav">
            <List subheader={
                <ListSubheader component="div">{props.menu.subheaderLabel}</ListSubheader>
            }>
                {props.menu.items.map((item, index) => (
                    <ListItem button component={RouteLink} to={item.path} key={index}>
                        <ListItemText>{item.label}</ListItemText>
                    </ListItem>
                ))}
            </List>
        </StyledPageSidebar>
    );
}
