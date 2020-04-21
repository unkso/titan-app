import React from 'react';
import {
    ContextSidebarItem,
    ContextSidebarItemProps
} from "@titan/layouts/dashboard/context_sidebar_item";
import styled from 'styled-components';
import {Palette} from "@titan/themes/default";

export interface ContextSidebarProps {
    items: ReadonlyArray<ContextSidebarItemProps>;
}

const StyledContextSidebar = styled.div`
  background-color: ${props => props.background};
  height: 100%;
  width: 70px;
`;

export function ContextSidebar(props: ContextSidebarProps) {
    return (
        <StyledContextSidebar background={Palette.background[700]}>
            <ContextSidebarItem
                icon={<i className="fal fa-home" />}
                key="item-dashboard"
                name="Dashboard"
                path="/dashboard"
            />
            <ContextSidebarItem
                icon={<i className="fal fa-user" />}
                key="item-profile"
                name="Profile"
                path="/dashboard/profile"
            />
            <ContextSidebarItem
                hasNotification={true}
                icon={<i className="fal fa-users" />}
                key="item-community"
                name="Community"
                path="/dashboard/community/organizations"
            />
            {props.items.map((item, index) =>
                <ContextSidebarItem
                    imageUrl={item.imageUrl}
                    key={index}
                    name={item.name}
                    path={item.path}
                />
            )}
        </StyledContextSidebar>
    );
}
