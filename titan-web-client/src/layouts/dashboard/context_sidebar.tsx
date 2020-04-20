import React from 'react';
import {
    ContextSidebarItem,
    ContextSidebarItemProps
} from "@titan/layouts/dashboard/context_sidebar_item";
import styled from 'styled-components';

export interface ContextSidebarProps {
    items: ReadonlyArray<ContextSidebarItemProps>;
}

const StyledContextSidebar = styled.div`
  width: 70px;
`;

export function ContextSidebar(props: ContextSidebarProps) {
    return (
        <StyledContextSidebar>
            <ContextSidebarItem
                hasNotification={true}
                name="Dashboard"
                path="/dashboard"
                key="item-dashboard"
            />
            <ContextSidebarItem
                name="Profile"
                path="/dashboard/profile"
                key="item-profile"
            />
            <ContextSidebarItem
                name="Community"
                path="/dashboard/community"
                key="item-community"
            />
            {props.items.map((item, index) =>
                <ContextSidebarItem
                    name={item.name}
                    path={item.path}
                    key={index}
                />
            )}
        </StyledContextSidebar>
    );
}
