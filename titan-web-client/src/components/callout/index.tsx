import React, {PropsWithChildren, ReactNode} from 'react';
import styled from 'styled-components';
import {useTheme} from "@material-ui/core";
import {Palette} from "@titan/themes/default";

type CalloutType = 'warning';

const CalloutWrapper = styled.div`
  align-items: center;
  background-color: ${props => props.background};
  border-radius: 4px;
  display: flex;
  padding: 16px;
  text-align: left;

  svg {
    color: ${props => props.foreground};
    font-size: 1.2rem;
  }

  .callout-section {
    margin-left: 8px;
  }
`;

interface CalloutProps {
    background?: 'filled|neutral';
    title?: string;
    description: string|ReactNode;
    type: CalloutType;
}

const IconClassMap = new Map<CalloutType, string>([
    ['warning', 'far fa-exclamation-triangle']
]);

export function Callout(props: PropsWithChildren<CalloutProps>) {
    const theme = useTheme();
    return (
        <CalloutWrapper
            foreground={theme.palette.warning.light}
            background={Palette.background[400]}>
            <i className={IconClassMap.get(props.type)} />
            <div className="callout-section">
                {props.title &&
                <div>
                  <strong>{props.title}</strong>
                </div>
                }
                <div>{props.description}</div>
            </div>
            <div className="callout-section">{props.children}</div>
        </CalloutWrapper>
    );
}
