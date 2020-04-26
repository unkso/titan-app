import React, {PropsWithChildren} from 'react';
import styled from 'styled-components';
import {assert} from "../../lib/assert";
import {Palette} from "@titan/themes/default";

interface HorizontalScrollViewportProps {
    spacing?: number;
}

const StyledHorizontalScrollViewportItem = styled.div`
  display: block;
`;

const StyledHorizontalScrollContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  padding: 0 32px;
  width: 100%;
  
  &::-webkit-scrollbar {
    display: none;
  }

  ${StyledHorizontalScrollViewportItem}:not(first-child) {
    margin-left: ${props => props.spacing}px;
  }
`;

const StyledHorizontalScrollViewport = styled.div`
  background-color: ${props => props.background};
  margin: 16px 0;
  padding: 16px 0;
  position: relative;
  overflow: hidden;

  &::after,
  &::before {
    content: '';
    display: block;
    height: 100%;
    position: absolute;
    top: 0;
    width: 32px;
  }

  /* Left shadow */
  &::before {
    left: -32px;
    -webkit-box-shadow: 8px 0 24px 8px rgba(0,0,0,0.8);
    -moz-box-shadow: 8px 0 24px 8px rgba(0,0,0,0.8);
    box-shadow: 8px 0 24px 8px rgba(0,0,0,0.8);
  }
  
  /* Right shadow */
  &::after {
    right: -32px;
    -webkit-box-shadow: -8px 0 24px 8px rgba(0,0,0,0.8);
    -moz-box-shadow: -8px 0 24px 8px rgba(0,0,0,0.8);
    box-shadow: -8px 0 24px 8px rgba(0,0,0,0.8);
  }
`;

export function HorizontalScrollViewport<T>(props: PropsWithChildren<HorizontalScrollViewportProps>) {
    const assertedChildren = assert(props.children,
        'Expected HorizontalScrollViewport children to be an array.');
    const children = Array.isArray(assertedChildren)
        ? assertedChildren
        : [assertedChildren];

    return (
        <StyledHorizontalScrollViewport background={Palette.background[600]}>
            <StyledHorizontalScrollContainer spacing={props.spacing || 8}>
                {children.map((child, index) => (
                    <StyledHorizontalScrollViewportItem key={index}>{child}</StyledHorizontalScrollViewportItem>
                ))}
            </StyledHorizontalScrollContainer>
        </StyledHorizontalScrollViewport>
    );
}
