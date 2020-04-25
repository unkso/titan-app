import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import {
    Avatar,
    Button,
    Grid,
    List, ListItem, ListItemIcon, ListItemText,
    ListSubheader,
    Paper,
    Tab,
    Tabs, Typography
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
import {FileEntryExpansionPanelList} from "@titan/components/list/file_entry_expansion_panel_list";
import {ExcuseExpansionPanelList} from "@titan/components/list/excuse_expansion_panel_list";
import TimestampActivityBadge
    from "@titan/components/activity_badge/timestamp_activity_badge";
import {ActivityIndicator} from "@titan/components/activity/activity_indicator";

const StyledAvatar = styled(Avatar)`
    height: 56px;
    margin-right: 8px;
    width: 56px;
`;

const StyledHeadline = styled.div`
  align-items: center;
  display: flex;
`;

export function ProfileScene() {
    const params = useParams();
    const dispatch = useDispatch();
    const user = useSelector<AppState, UserProfile>(userProfileUserSelector);
    const excuses = useSelector<AppState, UserEventExcuseWithAssoc[]>(userProfileEventExcusesSelector);
    const fileEntries = useSelector<AppState, UserFileEntryWithAssoc[]>(userProfileFileEntriesSelector);
    const [tabIndex, setTabIndex] = useState(0);
    const handleTabChange = (event, index) => setTabIndex(index);

    useEffect(() => {
        combineLatest([
            TitanApiClient.getUser({userId: params.id}),
            TitanApiClient.getUserFileEntries({userId: params.id}),
            TitanApiClient.getUserExcuses({userId: params.id}),
        ]).subscribe(([user, fileEntries, excuses]) => {
            dispatch(UserProfileActions.setUser(user));
            dispatch(UserProfileActions.setFileEntries(fileEntries));
            dispatch(UserProfileActions.setEventExcuses(excuses));
        });
    }, [params]);

    if (!user) {
        return null;
    }

    return (
        <div>
            <StyledHeadline>
                <StyledAvatar
                    src={"https://clanunknownsoldiers.com/wcf/images/avatars/94/1238-949157b51dc4b03f8c95767eab5dcfc4cabd35ee.png"} />
                <div>
                    <Typography variant="h1">{user.username}</Typography>
                    <ActivityIndicator timestamp={user.wcf.lastActivityTime} />
                </div>
            </StyledHeadline>
            <Grid container spacing={3}>
                <Grid item lg={9} md={8} sm={12}>
                    <Tabs value={tabIndex} onChange={handleTabChange}>
                        <Tab label="Activity" />
                        <Tab label="Event excuses" />
                    </Tabs>
                    <TabPanel index={0} value={tabIndex}>
                        <FileEntryExpansionPanelList fileEntries={fileEntries} />
                    </TabPanel>
                    <TabPanel index={1} value={tabIndex}>
                        <ExcuseExpansionPanelList excuses={excuses} />
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

                    <Button color="secondary">Submit event excuse</Button>
                    <Button color="secondary">Add file entry</Button>
                </Grid>
            </Grid>
        </div>
    );
}
