import React from 'react';
import Typography from '@material-ui/core/Typography';
import BorderedCard from '../Card/BorderedCard';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FileEntryPropType } from 'titan/../../../models';
import { getFileEntryTheme } from 'titan/components/FileEntry/index';

export class Detail extends React.Component {
  render () {
    const theme = getFileEntryTheme(
      this.props.entry.file_entry_type.name);
    const date = (new Date(
      this.props.entry.start_date)).toLocaleDateString();

    return (
      <BorderedCard
        highlightLeft={theme.color}
        onClick={this.openDialogHandler}>
        <ListItem>
          <Typography style={{ color: theme.color }}>
            {theme.icon}
          </Typography>
          <ListItemText>
            <Typography variant="body1" color="textSecondary">
              {date}
            </Typography>
            <Typography variant="subtitle1">
              {this.props.entry.file_entry_type.name}
            </Typography>
          </ListItemText>
        </ListItem>
      </BorderedCard>
    );
  }
}

Detail.propTypes = {
  entry: FileEntryPropType
};
