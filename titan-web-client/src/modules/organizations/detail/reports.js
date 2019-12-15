import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Reports_list } from '@titan/components/reports/reports_list';
import { ContentBlock } from '@titan/components/block/content_block';
import Typography from '@material-ui/core/Typography';
import { CreateReportButton } from '@titan/modules/organizations/components/create_report_button';
import {
  ListOrganizationReportsRequest,
  makeTitanApiRequest
} from '@titan/http/api_client';
import { useSnackbar } from 'notistack';
import { Icon_empty_state } from '@titan/components/empty_state/icon_empty_state';
import { useDispatch, useSelector } from 'react-redux';
import * as orgActions from '@titan/actions/organization_actions';

export function Reports (props) {
  const dispatch = useDispatch();
  const reports = useSelector(
    state => state.organization.reports);
  const snackbar = useSnackbar();

  useEffect(() => {
    makeTitanApiRequest(ListOrganizationReportsRequest,
      { orgId: props.organization.id })
      .then(res => {
        dispatch(orgActions.setReports(res.data));
      })
      .catch(() => {
        snackbar.enqueueSnackbar('Unable to load reports', {
          variant: 'error'
        });
      });
  }, [props.organization.id]);

  function addReport (report) {
    const updatedReports = [...reports, report];
    updatedReports.sort((x, y) =>
      x.term_start_date < y.term_start_date ? 1 : -1);
    dispatch(orgActions.setReports(updatedReports));
  }

  if (!reports) {
    return null;
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
      {reports.length > 0 ? (
        <Reports_list items={reports} />
      ) : (
        <Icon_empty_state
          icon="file-alt"
          primaryText="No reports have been created"
          verticalMargin={64}
        />
      )}
    </ContentBlock>
  );
}

Reports.propTypes = {
  canCreateReport: PropTypes.bool.isRequired,
  organization: PropTypes.object.isRequired
};
