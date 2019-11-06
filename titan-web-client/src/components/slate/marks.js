import React from 'react';

export const BOLD_MARK = {
  type: 'bold',
  hotKey: 'mod+b',
  icon: <span className="fas fa-bold" />,
  render: (attributes, children) => (
    <strong {...attributes}>{children}</strong>)
};

export const ITALIC_MARK = {
  type: 'italic',
  hotKey: 'mod+i',
  icon: <span className="fas fa-italic" />,
  render: (attributes, children) => (
    <em {...attributes}>{children}</em>)
};
