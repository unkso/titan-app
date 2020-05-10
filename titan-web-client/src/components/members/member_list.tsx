import React from 'react';
import styled from 'styled-components';
import {UserProfile} from "@titan/http/api";
import {
    MemberListRow,
    MemberListRowProps
} from "@titan/components/members/member_list_row";

interface MemberListProps {
    members: MemberListRowProps[];
}

const StyledMemberListRow = styled.div`
  margin-bottom: 8px;
`;

export function MemberList(props: MemberListProps) {
    return (
        <div>
            {props.members.map(member =>
                <StyledMemberListRow key={member.user.id}>
                    <MemberListRow {...member} />
                </StyledMemberListRow>
            )}
        </div>
    );
}
