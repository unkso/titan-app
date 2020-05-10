import React, {useEffect, useState} from 'react';
import {useThrottle} from "@titan/hooks";
import InputAdornment from "@material-ui/core/InputAdornment";
import {
    Box,
    TextField,
    Typography,
    useTheme
} from "@material-ui/core";
import {TitanApiClient, UserProfile} from "@titan/http/api";
import {MemberList} from "@titan/components/members/member_list";
import {IconEmptyState} from "@titan/components/empty_state/icon_empty_state";
import {DashboardSection} from "@titan/layouts/dashboard/dashboard_section";

const DEFAULT_SEARCH_DESCRIPTION = 'Showing newest members';
const MAX_RESULTS_PER_PAGE = 15;

export function MembersScene() {
    const theme = useTheme();
    const [username, setUsername] = useThrottle('', 300);
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [description, setDescription] = useState(DEFAULT_SEARCH_DESCRIPTION);

    useEffect(() => {
        TitanApiClient.getUsers({username, limit: MAX_RESULTS_PER_PAGE}).subscribe(users => {
            setUsers(users);

            if (username.length === 0) {
                setDescription(DEFAULT_SEARCH_DESCRIPTION);
            }else if (!users.length) {
                setDescription('');
            } else if (users.length < MAX_RESULTS_PER_PAGE) {
                setDescription(`Found ${users.length} matches`);
            } else {
                setDescription(`Showing first ${MAX_RESULTS_PER_PAGE} matches`);
            }
        });
    }, [username]);

    return (
        <DashboardSection>
            <h1>Members</h1>
            <TextField
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <span className="fas fa-search" />
                        </InputAdornment>
                    )
                }}
                placeholder="Search by username"
                onChange={e => setUsername(e.target.value)}
                fullWidth
            />
            <Box marginTop={theme.spacing(.25)}
                 marginBottom={theme.spacing(.25)}>
                <Typography align="right">{description}</Typography>
            </Box>
            {users.length ? (
                <Box marginTop={theme.spacing(.25)}
                     marginBottom={theme.spacing(.25)}>
                    <MemberList members={users.map(user => ({user}))} />
                </Box>
            ) : (
                <IconEmptyState
                    icon="search"
                    primaryText="No matches found"
                    verticalMargin={64}
                />
            )}
        </DashboardSection>
    );
}
