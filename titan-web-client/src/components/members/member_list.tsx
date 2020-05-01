import React from 'react';
import styled from 'styled-components';
import {UserProfile} from "@titan/http/api";
import {MemberListRow} from "@titan/components/members/member_list_row";

interface MemberListProps {
    users: UserProfile[];
}

const StyledMemberListRow = styled.div`
  margin-bottom: 8px;
`;

export function MemberList(props: MemberListProps) {
    return (
        <div>
            {props.users.map(user =>
                <StyledMemberListRow key={user.id}>
                    <MemberListRow user={user} />
                </StyledMemberListRow>
            )}
        </div>
    );
}
