import PropTypes from 'prop-types';

/** Shape for file entry type prop type. */
export const FileEntryTypePropType = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string
});

/** Shape for file entry prop type. */
export const FileEntryPropType = PropTypes.shape({
  id: PropTypes.number,
  file_entry_type: FileEntryTypePropType,
  user_profile: PropTypes.object,
  start_date: PropTypes.string,
  end_date: PropTypes.string,
  comments: PropTypes.string,
  date_modified: PropTypes.string,
  modified_by: PropTypes.object
});

export const ReportProtoType = PropTypes.shape({
  ack_date: PropTypes.string,
  ack_user: PropTypes.object,
  comments: PropTypes.string,
  date_created: PropTypes.string,
  date_modified: PropTypes.string,
  id: PropTypes.number,
  role: PropTypes.object,
  submission_date: PropTypes.string,
  term_start_date: PropTypes.string
});
