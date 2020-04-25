import {
  FILE_ENTRY_APP_DENIED,
  FILE_ENTRY_APP_WITHDRAWN,
  FILE_ENTRY_AWARD,
  FILE_ENTRY_AWOL,
  FILE_ENTRY_A15,
  FILE_ENTRY_BCT_E0_COMPLETE,
  FILE_ENTRY_BCT_E1_COMPLETE,
  FILE_ENTRY_BCT_E2_COMPLETE,
  FILE_ENTRY_BCT_E3_COMPLETE,
  FILE_ENTRY_PASS_JCS_INTERVIEW,
  FILE_ENTRY_PROMOTION,
  FILE_ENTRY_TRANSFER
} from '@titan/components/file_entry/constants';

/**
 * Returns the appropriate color and icon for the given type of file
 * entry.
 */
export function getFileEntryTheme (type, theme) {
  switch (type) {
    case FILE_ENTRY_A15:
      return {
        color: theme.palette.error.light,
        icon: 'ban'
      };
    case FILE_ENTRY_AWOL:
      return {
        color: theme.palette.error.light,
        icon: 'info'
      };
    case FILE_ENTRY_AWARD:
      return {
        color: theme.palette.warning.light,
        icon: 'award'
      };
    case FILE_ENTRY_APP_WITHDRAWN:
      return {
        color: theme.palette.info.light,
        icon: 'file-alt'
      };
    case FILE_ENTRY_APP_DENIED:
      return {
        color: theme.palette.error.light,
        icon: 'file-alt'
      };
    case FILE_ENTRY_BCT_E0_COMPLETE:
    case FILE_ENTRY_BCT_E1_COMPLETE:
    case FILE_ENTRY_BCT_E2_COMPLETE:
    case FILE_ENTRY_BCT_E3_COMPLETE:
      return {
        color: theme.palette.success.light,
        icon: 'shield-alt'
      };
    case FILE_ENTRY_PASS_JCS_INTERVIEW:
      return {
        color: theme.palette.success.light,
        icon: 'users'
      };
    case FILE_ENTRY_PROMOTION:
      return {
        color: theme.palette.warning.light,
        icon: 'star'
      };
    case FILE_ENTRY_TRANSFER:
      return {
        color: theme.palette.info.light,
        icon: 'random'
      };
    default:
      return {
        color: theme.palette.info.light,
        icon: 'info'
      };
  }
}
