import React from 'react';

export const BOLD_MARK = {
  action: 'bold',
  type: 'mark',
  hotKey: 'mod+b',
  icon: () => <span className="fas fa-bold" />,
  render: (attributes, children) => (
    <strong {...attributes}>{children}</strong>)
};

export const ITALIC_MARK = {
  action: 'italic',
  type: 'mark',
  hotKey: 'mod+i',
  icon: () => <span className="fas fa-italic" />,
  render: (attributes, children) => (
    <em {...attributes}>{children}</em>)
};
