import React from 'react';
import PropTypes from 'prop-types';
import { format as formatDate } from 'date-fns';
import ListItem from '@material-ui/core/ListItem/ListItem';
import Typography from '@material-ui/core/Typography/Typography';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import BorderedCard from 'titan/components/Card/BorderedCard';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Button from '@material-ui/core/Button/Button';
import { withTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { Avatar } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import Row from 'titan/components/Grid/Row';
import Column from 'titan/components/Grid/Column';
import { AckReportButton } from 'titan/components/Reports/AckReportButton';

/**
 * List item for an organization's weekly report. Includes a dialog
 * to display the details of the report.
 */
class ReportsListItemComponent extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      dialogOpen: false,
      ack_user: null,
      ack_date: null
    };

    this.closeDialogHandler = this.closeDialog.bind(this);
    this.openDialogHandler = this.openDialog.bind(this);
  }

  componentDidMount () {
    if (this.props.report.ack_user) {
      this.setState({
        ack_date: new Date(this.props.report.ack_date).toLocaleDateString(),
        ack_user: this.props.report.ack_user
      });
    }
  }

  openDialog () {
    this.setState({ dialogOpen: true });
  }

  closeDialog () {
    this.setState({ dialogOpen: false });
  }

  onAck (report) {
    this.closeDialogHandler();
    this.setState({
      ack_date: new Date(report.ack_date).toLocaleDateString(),
      ack_user: report.ack_user
    });
  }

  render () {
    const roleName = this.props.report.role.role;
    const unitName = this.props.report.role.organization.name;
    const termStartDate = formatDate(
      new Date(this.props.report.term_start_date), 'MMMM dd, yyyy');
    const submissionDate = formatDate(
      new Date(this.props.report.submission_date), 'MMMM dd, yyyy');
    const theme = {
      color: this.props.theme.palette.secondary.light,
      icon: <span className="fas fa-file-alt" />
    };

    return (
      <React.Fragment>
        <BorderedCard
          onClick={this.openDialogHandler}>
          <List>
            <ListItem>
              <Typography style={{ color: theme.color, marginRight: 16 }}>
                {theme.icon}
              </Typography>
              <ListItemText>
                {formatDate(new Date(this.props.report.term_start_date), 'MM/dd')}
              </ListItemText>
              <ListItemText>
                submitted {submissionDate}
              </ListItemText>
              <ListItemText>
                <Chip
                  label={`${unitName} - ${roleName}`}
                  variant="outlined"
                />
              </ListItemText>
              <ListItemText>
                {this.state.ack_user && (
                  <Typography align="right">
                    <Tooltip title={`Ack by ${this.state.ack_user.username}`}>
                      <span
                        className="fal fa-check"
                        style={{ color: this.props.theme.palette.success }}
                      />
                    </Tooltip>
                  </Typography>
                )}
              </ListItemText>
            </ListItem>
          </List>
        </BorderedCard>
        <Dialog open={this.state.dialogOpen} maxWidth="md" fullWidth>
          <DialogTitle>
            <Row>
              <Column>
                <span>{this.props.report.role.organization.name} Weekly Report</span>
                <Typography variant="body1" color="textSecondary">
                  Week of {termStartDate}
                </Typography>
              </Column>
              <Column grow={1}>
                <Typography
                  align="right"
                  component="div"
                  variant="body1">
                  <Chip
                    avatar={(
                      <Avatar src={this.props.report.role.user_profile.wcf.avatar_url} />
                    )}
                    clickable
                    component="a"
                    href={`/roster/${this.props.report.role.user_profile.id}`}
                    label={`${this.props.report.role.user_profile.username}`}
                  />
                </Typography>
              </Column>
            </Row>
          </DialogTitle>
          <DialogContent>
            <Typography gutterBottom variant="body2">{this.props.children}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialogHandler}>Close</Button>
            {this.props.canAck &&
            <AckReportButton
              organizationId={this.props.report.role.organization.id}
              reportId={this.props.report.id}
              onAck={report => this.onAck(report)}
            />
            }
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

ReportsListItemComponent.propTypes = {
  canAck: PropTypes.bool,
  report: PropTypes.shape({
    ack_date: PropTypes.string,
    ack_user: PropTypes.object,
    comments: PropTypes.string,
    date_created: PropTypes.string,
    date_modified: PropTypes.string,
    id: PropTypes.number,
    role: PropTypes.object,
    submission_date: PropTypes.string,
    term_start_date: PropTypes.string
  })
};

export const ReportsListItem = withTheme(ReportsListItemComponent);
