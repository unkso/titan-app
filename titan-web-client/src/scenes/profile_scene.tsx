import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {
    Grid,
    List, ListItem, ListItemIcon, ListItemText,
    ListSubheader,
    Paper,
    Tab,
    Tabs
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {
    TitanApiClient, UserEventExcuseWithAssoc,
    UserFileEntryWithAssoc,
    UserProfile
} from "@titan/http/api";
import {combineLatest} from "rxjs";
import {
    UserProfileActions,
    userProfileEventExcusesSelector,
    userProfileFileEntriesSelector,
    userProfileUserSelector
} from "@titan/store/profile";
import {AppState} from "@titan/store/root_reducer";
import {TabPanel} from "@titan/components/tabs/tab_panel";
import {FileEntryList} from "@titan/components/file_entry/file_entry_list";
import {FileEntryExpansionPanelList} from "@titan/components/list/file_entry_expansion_panel_list";

export function ProfileScene() {
    const params = useParams();
    const dispatch = useDispatch();
    const user = useSelector<AppState, UserProfile>(userProfileUserSelector);
    const excuses = useSelector<AppState, UserEventExcuseWithAssoc>(userProfileEventExcusesSelector);
    const fileEntries = useSelector<AppState, UserFileEntryWithAssoc[]>(userProfileFileEntriesSelector);
    const [tabIndex, setTabIndex] = useState(0);
    const handleTabChange = (event, index) => setTabIndex(index);

    useEffect(() => {
        combineLatest([
            TitanApiClient.getUser({userId: params.id}),
            TitanApiClient.getUserFileEntries({userId: params.id}),
        ]).subscribe(([user, fileEntries]) => {
            dispatch(UserProfileActions.setUser(user));
            dispatch(UserProfileActions.setFileEntries(fileEntries));
        });
    }, [params]);

    if (!user) {
        return null;
    }

    return (
        <div>
            <h1>{user.username}</h1>
            <Grid container spacing={3}>
                <Grid item lg={9} md={8} sm={12}>
                    <Tabs value={tabIndex} onChange={handleTabChange}>
                        <Tab label="Activity" />
                        <Tab label="Event excuses" />
                    </Tabs>
                    <TabPanel index={0} value={tabIndex}>
                        {/*<FileEntryList fileEntries={fileEntries} />*/}
                        <FileEntryExpansionPanelList fileEntries={fileEntries} />
                    </TabPanel>
                    <TabPanel index={1} value={tabIndex}>
                        <p>Goodbye world</p>
                    </TabPanel>
                </Grid>
                <Grid item lg={3} md={4} xs={12}>
                    <Paper>
                        <List subheader={
                            <ListSubheader component="div">Identities</ListSubheader>
                        }>
                            <ListItem>
                                <ListItemIcon>
                                    <i className="fab fa-discord" />
                                </ListItemIcon>
                                <ListItemText>-- username --</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <i className="fab fa-steam-square" />
                                </ListItemIcon>
                                <ListItemText>-- username --</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <i className="fab fa-battle-net" />
                                </ListItemIcon>
                                <ListItemText>-- username --</ListItemText>
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
