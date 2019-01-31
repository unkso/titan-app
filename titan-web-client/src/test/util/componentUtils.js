import React from 'react';

export async function buildFake() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const id = (new Date()).getMilliseconds();
      const FakeComponent = (props) => {
        return null;
      };

      const props = {};
      props['fake' + id] = true;
      resolve(React.createElement(FakeComponent, props));
    }, 100);
  });
}
