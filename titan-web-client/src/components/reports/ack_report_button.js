import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';
import OrganizationsService from '@titan/http/OrganizationsService';

export function Ack_report_button (props) {
  const snackbar = useSnackbar();
  const [loading, setLoading] = useState(false);
  const organizationsService = new OrganizationsService();

  function acknowledgeReport () {
    setLoading(true);
    organizationsService.acknowledgeReport(props.organizationId, props.reportId)
      .then(res => {
        setLoading(false);
        snackbar.enqueueSnackbar('Report acknowledged', {
          variant: 'success'
        });

        props.onAck(res.data);
      })
      .catch(() => {
        setLoading(false);
        snackbar.enqueueSnackbar('Unable to ack report', {
          variant: 'error'
        });
      });
  }

  return (
    <Button
      color="primary"
      disabled={loading}
      onClick={() => acknowledgeReport()}>Ack</Button>
  );
}

Ack_report_button.propTypes = {
  reportId: PropTypes.number.isRequired,
  onAck: PropTypes.func.isRequired
};
