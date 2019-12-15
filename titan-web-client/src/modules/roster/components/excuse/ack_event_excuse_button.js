import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import UsersService from '@titan/http/UsersService';
import { withSnackbar } from 'notistack';

class AckEventExcuseButtonComponent extends React.Component {
  constructor (props) {
    super(props);

    this.usersService = new UsersService();
    this.state = {
      loading: false
    };
  }

  acknowledgeExcuse () {
    this.setState({ loading: true });
    this.usersService.acknowledgeEventExcuse(this.props.excuseId).then((res) => {
      this.setState({ loading: false });
      this.props.enqueueSnackbar('Marked as excused', {
        variant: 'success'
      });

      this.props.onAck(res.data);
    }).catch(() => {
      this.setState({ loading: false });
      this.props.enqueueSnackbar('Unable to ack excuse', {
        variant: 'error',
        action: (<Button size="small">Dismiss</Button>)
      });
    });
  }

  render () {
    return (
      <Button
        color="primary"
        disabled={this.state.loading}
        onClick={() => this.acknowledgeExcuse()}>Ack</Button>
    );
  }
}

AckEventExcuseButtonComponent.propTypes = {
  excuseId: PropTypes.number.isRequired,
  onAck: PropTypes.func.isRequired
};

export const AckEventExcuseButton =
    withSnackbar(AckEventExcuseButtonComponent);
