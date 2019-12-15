import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { ChronologicalItemList } from '@titan/components/list/chronological_item_list';
import { Reports_list_item } from '@titan/components/reports/reports_list_item';
import { ReportProtoType } from '@titan/models';
import OrganizationsService from '@titan/http/OrganizationsService';
import { useForceUpdate } from '@titan/hooks';
import { useSelector } from 'react-redux';

/**
 * Renders a list of reports grouped by month.
 */
export function Reports_list (props) {
  const organizationsService = new OrganizationsService();
  const parentRoleMap = useRef(new Map());
  const authUserRoles = useSelector(
    state => state.auth.session.roles);
  const forceUpdate = useForceUpdate();

  function canAckReport (report) {
    if (!parentRoleMap.current.has(report.role.id)) {
      parentRoleMap.current.set(report.role.id, undefined);
      loadParentRole(report);
    }

    const parentRole = parentRoleMap.current.get(report.role.id);
    return !report.ack_user && parentRole && authUserRoles.some(
      role => role.id === parentRole.id);
  }

  function loadParentRole (report) {
    organizationsService.findParentRole(report.role.id).then(res => {
      parentRoleMap.current.set(report.role.id, res.data);
      forceUpdate();
    });
  }

  return (
    <ChronologicalItemList
      dateField="term_start_date"
      items={props.items}
      renderer={item => (
        <Reports_list_item canAck={canAckReport(item)} report={item}>
          {item.comments}
        </Reports_list_item>
      )}
    />
  );
}

Reports_list.propTypes = {
  /** A list of reports. */
  items: PropTypes.arrayOf(ReportProtoType)
};
