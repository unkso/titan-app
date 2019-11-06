import React, { useMemo, useState } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { isKeyHotkey } from 'is-hotkey';
import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components';

export const StyledToolbar = styled.div`
  display: flex;
`;

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            text: 'A line of text in a paragraph.'
          }
        ]
      }
    ]
  }
});

function toMap (entities) {
  return entities.reduce((map, mark) => {
    map[mark.type] = mark.render;
    return map;
  }, {});
}

export function SlateEditor (props) {
  const [value, setValue] = useState(initialValue);
  const renderMark = useMemo(() => {
    const marks = toMap(props.marks || []);
    return (props, editor, next) => {
      const { children, mark, attributes } = props;
      return marks[mark.type]
        ? marks[mark.type](attributes, children)
        : next();
    };
  }, [props.marks]);
  const renderInline = useMemo(() => {
    const inline = toMap(props.inline || []);
    return (props, editor, next) => {
      const { children, node, attributes } = props;
      return inline[node.type]
        ? inline[node.type](attributes, node.data, children)
        : next();
    };
  }, [props.marks]);

  function hasMark (type) {
    return value.activeMarks.some(mark => mark.type === type);
  }

  function handleMarkClick (event, type) {

  }

  function renderMarkButton (type, icon, index) {
    return (
      <IconButton
        key={index}
        active={String(hasMark(type))}
        onClick={event => handleMarkClick(event, type)}>
        {icon}
      </IconButton>
    );
  }

  function onKeyDown (event, editor, next) {
    for (const mark of props.marks) {
      if (isKeyHotkey(mark.hotKey)(event)) {
        event.preventDefault();
        editor.toggleMark(mark.type);
        return;
      }
    }

    return next();
  }

  function renderControl (control) {
    return control.icon;
  }

  return (
    <React.Fragment>
      <StyledToolbar>
        {props.marks.map((mark, i) => renderMarkButton(mark.type, mark.icon, i))}
        {props.inline.map((inline, i) => renderControl(inline, index))}
      </StyledToolbar>
      <Editor
        onChange={res => setValue(res.value)}
        onKeyDown={(event, editor, next) => onKeyDown(event, editor, next)}
        renderMark={renderMark}
        renderInline={renderInline}
        value={value}
      />
    </React.Fragment>
  );
}
