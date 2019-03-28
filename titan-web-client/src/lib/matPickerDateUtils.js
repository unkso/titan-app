import DateFnsUtils from '@date-io/date-fns';
import { format as formatDate } from 'date-fns';

/**
 * The date-io library pushed a backwards breaking change. This
 * extended util class is a temporary solution until that material
 * pickers team releases a fix.
 *
 * https://github.com/mui-org/material-ui-pickers/issues/864
 */
export class MatPickerDateUtils extends DateFnsUtils {
  startOfMonth (date) {
    return this.getStartOfMonth(date);
  }
  getDatePickerHeaderText (date) {
    return formatDate(date, 'd MMMM', { locale: this.locale });
  }
}
