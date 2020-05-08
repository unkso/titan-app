import React, {PropsWithChildren, useEffect, useState} from 'react';
import styled from 'styled-components';
import {Typography, useTheme} from "@material-ui/core";
import {Palette} from "@titan/themes/default";

type InlineBadgeType = 'neutral'|'error'|'info';

interface InlineBadgeProps {
    type: InlineBadgeType,
}

export const StyledInlineBadge = styled(Typography)`
  background-color: ${props => props.background};
  border-radius: 2px;
  color: ${props => props.color};
  display: inline-block;
  font-size: .8em;
  font-weight: 500;
  line-height: 18px;
  height: 18px;
  padding: 0 .2em;
`;

export function InlineBadge(props: PropsWithChildren<InlineBadgeProps>) {
    const [background, setBackground] = useState();
    const theme = useTheme();

    useEffect(() => {
        switch (props.type) {
            case "error":
                setBackground(theme.palette.error.dark);
                break;
            case "info":
                setBackground(theme.palette.info.dark);
                break;
            default:
                setBackground(Palette.background[300]);
        }
    }, [props.type, theme.palette.error.dark]);

    return (
        <StyledInlineBadge
            color={theme.palette.text.secondary}
            background={background}
            element="span"
            variant="caption">
            {props.children}
        </StyledInlineBadge>
    );
}
