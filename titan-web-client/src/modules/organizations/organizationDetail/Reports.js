import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ReportsList } from 'titan/components/Reports/ReportsList';
import { ContentBlock } from 'titan/components/block/ContentBlock';
import Typography from '@material-ui/core/Typography';
import { CreateReportButton } from 'titan/modules/organizations/components/CreateReportButton';
import {
  ListOrganizationReportsRequest,
  makeTitanApiRequest
} from 'titan/http/ApiClient';
import { useSnackbar } from 'notistack';

export function Reports (props) {
  const [reports, setReports] = useState([]);
  const snackbar = useSnackbar();

  useEffect(() => {
    makeTitanApiRequest(ListOrganizationReportsRequest,
      { orgId: props.organization.id })
      .then(res => {
        setReports(res.data);
      })
      .catch(() => {
        snackbar.enqueueSnackbar('Unable to load reports', {
          variant: 'error'
        });
      });
  }, [props.organization.id]);

  function addReport (report) {
    const updatedReports = [...reports, report];
    reports.sort((x, y) =>
      x.term_start_date < y.term_start_date ? 1 : -1);
    setReports(updatedReports);
  }

  return (
    <ContentBlock>
      <Typography align="right">
        {props.canCreateReport &&
        <CreateReportButton
          onReportSaved={report => addReport(report)}
          organization={props.organization}
        />
        }
      </Typography>
      <ReportsList items={reports} />
    </ContentBlock>
  );
}

Reports.propTypes = {
  canCreateReport: PropTypes.bool.isRequired,
  organization: PropTypes.object.isRequired
};
