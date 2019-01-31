import React from 'react';
import { getAppContext } from 'titan/titan';

export default function WithConfig(ComposedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.app = getAppContext();
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          config={this.app.getConfig()}
        />
      );
    }
  };
}
