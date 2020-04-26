import React from 'react';
import {UserProfile} from "@titan/http/api";
import {InlineBadge} from "@titan/components/inline_badge";
import {
    Avatar,
    Card,
    ListItem, ListItemAvatar,
    ListItemText
} from "@material-ui/core";
import {RouteLink} from "@titan/components/routes";

interface MemberListRowProps {
    user: UserProfile;
}

export function MemberListRow(props: MemberListRowProps) {
    return (
        <RouteLink to={`/dashboard/members/${props.user.id}`}>
            <Card elevation={0}>
                <ListItem component="div">
                    <ListItemAvatar>
                        <Avatar src={props.user.wcf.avatarUrl} />
                    </ListItemAvatar>
                    <ListItemText>{props.user.username}</ListItemText>
                    <span>{props.user.a15 && <InlineBadge type='error'>A-15</InlineBadge>}</span>
                </ListItem>
            </Card>
        </RouteLink>
    );
}
