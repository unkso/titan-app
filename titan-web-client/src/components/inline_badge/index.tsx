import React, {PropsWithChildren, useEffect, useState} from 'react';
import styled from 'styled-components';
import {useTheme} from "@material-ui/core";
import {Palette} from "@titan/themes/default";

type InlineBadgeType = 'neutral'|'error';

interface InlineBadgeProps {
    type: InlineBadgeType,
}

const StyledInlineBadge = styled.div`
  background-color: ${props => props.background};
  border-radius: ${props => props.shape}px;
  display: inline-block;
`;

export function InlineBadge(props: PropsWithChildren<InlineBadgeProps>) {
    const [background, setBackground] = useState();
    const theme = useTheme();

    useEffect(() => {
        if (props.type === 'error') {
            setBackground(theme.palette.error.light);
        } else {
            setBackground(Palette.background[300]);
        }
    }, [props.type]);

    return (
        <StyledInlineBadge
            background={background}
            shape={theme.shape.borderRadius}>
            {props.children}
        </StyledInlineBadge>
    );
}
