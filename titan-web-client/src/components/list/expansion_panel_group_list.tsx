import React, {ReactNode} from 'react';

interface ExpansionPanelGroupListProps<T> {
    /** A factory that returns the component to render each group. */
    componentFactory: (models: T[]) => ReactNode;
    /**
     * A function that returns a label for a group of items. Each item
     * will be passed through this function. Each unique value
     * returned from this function indicates where one group ends and
     * the next begins.
     */
    groupLabelStrategy: (model: T) => string;
    /** The list of items to render in each group. */
    models: T[];
}

/**
 * Renders a list of items grouped by a common label.
 *
 * @example
 *
 * const events = [
 *   {title: 'Feb Event', date: '2019-02-01'},
 *   {title: 'Jan Event', date: '2019-01-01'},
 *   ...
 * ];
 *
 * const componentFactory = events => {
 *     return (
 *         <div>{events.map(event => <p>{event.title}</p>)}</div>
 *     );
 * }
 *
 * const groupByStrategy = event => formatDate(event.date, 'MM YYYY');
 *
 * return (
 *   <ExpansionPanelGroupList
 *     componentFactory={componentFactory}
 *     groupLabelStrategy={groupByStrategy}
 *     models={events}
 *   />
 * );
 */
export function ExpansionPanelGroupList<Model>(props: ExpansionPanelGroupListProps<Model>) {
    const list: ReactNode[] = [];
    let pendingModels: Model[] = [];
    let prevGroupLabel: string|undefined = undefined;

    for(const model of props.models) {
        const label = props.groupLabelStrategy(model);
        if (label !== prevGroupLabel) {
            if (pendingModels.length) {
                list.push(props.componentFactory(pendingModels));
                pendingModels = [];
            }
            list.push(<h3 key={label}>{label}</h3>);
            prevGroupLabel = label;
        }
        pendingModels.push(model);
    }

    if (pendingModels.length) {
        list.push(props.componentFactory(pendingModels));
    }

    return (<div>{list}</div>);
}
