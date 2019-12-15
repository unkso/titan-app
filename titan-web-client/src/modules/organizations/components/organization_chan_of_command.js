import React, { useEffect, useState } from 'react';
import { Chain_of_command } from '@titan/modules/organizations/components/chain_of_command';
import { Icon_empty_state } from '@titan/components/empty_state/icon_empty_state';

export function Organization_chan_of_command (props) {
  const [extendedCoc, setExtendedCoc] = useState([]);
  const [localCoc, setLocalCoc] = useState([]);

  useEffect(() => {
    setExtendedCoc([...props.orgCoc.extended_coc.reverse()]);
    setLocalCoc([...props.orgCoc.local_coc.reverse()]);
  }, [props.orgCoc]);

  return (
    <React.Fragment>
      {extendedCoc.length || localCoc.length ? (
        <Chain_of_command
          extendedCoc={extendedCoc}
          localCoc={localCoc}
        />
      ) : (
        <Icon_empty_state
          icon="users"
          primaryText="There are no members in this organization's Chain of Command."
        />
      )}
    </React.Fragment>
  );
}
