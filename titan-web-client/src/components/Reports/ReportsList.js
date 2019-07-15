import React, { useRef } from 'react';
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
  const parentRoleMap = useRef(new Map());
  const forceUpdate = useForceUpdate();

  function canAckReport (report) {
    if (!parentRoleMap.current.has(report.role.id)) {
      parentRoleMap.current.set(report.role.id, false);
      loadParentRole(report);
    }

    return parentRoleMap.current.get(report.role.id);
  }

  function loadParentRole (report) {
    organizationsService.findParentRole(report.role.id).then(res => {
      parentRoleMap.current.set(report.role.id, !!res.data);
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
