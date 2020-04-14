/** An action that mutates application state. */
import {ActionType} from "@titan/actions/action_types";

export interface StateAction {
    data?: {};
    type: ActionType;
}
