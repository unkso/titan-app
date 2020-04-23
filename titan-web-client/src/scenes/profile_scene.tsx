import React, {useEffect} from 'react';
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

export function ProfileScene() {
    const params = useParams();
    const dispatch = useDispatch();
    const user = useSelector<AppState, UserProfile>(userProfileUserSelector);
    const excuses = useSelector<AppState, UserEventExcuseWithAssoc>(userProfileEventExcusesSelector);
    const fileEntries = useSelector<AppState, UserFileEntryWithAssoc>(userProfileFileEntriesSelector);

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
            <Grid container>
                <Grid item lg={9} md={8} xs={12} spacing={3}>
                    <Tabs value={0}>
                        <Tab label="File entries" />
                        <Tab label="Event excuses" />
                    </Tabs>
                </Grid>
                <Grid item lg={3} sm={4} xs={12} spacing={3}>
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
