import React, { useEffect, useState } from 'react';
import { ChainOfCommand } from '@titan/modules/organizations/components/ChainOfCommand';
import { IconEmptyState } from '@titan/components/EmptyStates/IconEmptyState';

export function OrganizationChainOfCommand (props) {
  const [extendedCoc, setExtendedCoc] = useState([]);
  const [localCoc, setLocalCoc] = useState([]);

  useEffect(() => {
    setExtendedCoc([...props.orgCoc.extended_coc.reverse()]);
    setLocalCoc([...props.orgCoc.local_coc.reverse()]);
  }, [props.orgCoc]);

  return (
    <React.Fragment>
      {extendedCoc.length || localCoc.length ? (
        <ChainOfCommand
          extendedCoc={extendedCoc}
          localCoc={localCoc}
        />
      ) : (
        <IconEmptyState
          icon="users"
          primaryText="There are no members in this organization's Chain of Command."
        />
      )}
    </React.Fragment>
  );
}
