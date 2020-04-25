import React from 'react';
import { FileEntryListItem } from './list_item';
import { ChronologicalItemList } from '../list/chronological_item_list';
import {UserFileEntryWithAssoc} from "@titan/http/api";

/** A list of file entries. */
interface FileEntryListProps {
  fileEntries: UserFileEntryWithAssoc[];
}

/**
 * A list of file entries grouped by month.
 */
export function FileEntryList(props: FileEntryListProps) {
  return (
      <ChronologicalItemList
          dateField="startDate"
          items={props.fileEntries}
          renderer={fileEntry => (
              <FileEntryListItem fileEntry={fileEntry} />
          )}
      />
  );
}
