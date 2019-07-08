import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ChronologicalItemList } from 'titan/components/List/ChronologicalItemList';
import { ReportsListItem } from 'titan/components/Reports/ReportsListItem';
import { ReportProtoType } from 'titan/models';
import OrganizationsService from 'titan/http/OrganizationsService';
import { useForceUpdate } from 'titan/hooks';

/**
 * Renders a list of reports grouped by month.
 */
export function ReportsList (props) {
  const organizationsService = new OrganizationsService();
  const [parentRoleMap] = useState(new Map());
  const forceUpdate = useForceUpdate();

  function canAckReport (report) {
    if (!parentRoleMap.has(report.id)) {
      parentRoleMap.set(report.id, false);
      loadParentRole(report);
    }

    return parentRoleMap.get(report.id);
  }

  function loadParentRole (report) {
    organizationsService.findParentRole(report.role.id).then(res => {
      parentRoleMap.set(report.id, !!res.data);
      forceUpdate();
    });
  }

  return (
    <ChronologicalItemList
      dateField="term_start_date"
      items={props.items}
      renderer={item => (
        <ReportsListItem canAck={canAckReport(item)} report={item}>
          {item.comments}
        </ReportsListItem>
      )}
    />
  );
}

ReportsList.propTypes = {
  /** A list of reports. */
  items: PropTypes.arrayOf(ReportProtoType)
};
