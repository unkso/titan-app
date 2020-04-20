import {
    Configuration as TitanApiConfig,
    DefaultApi as TitanApi,
    RequestArgs, ResponseArgs
} from '@titan/http/api/generated/v1';
import {config} from '@titan/lib/config';
import {AuthActions} from "@titan/actions/auth_actions";
import {AppStore} from "@titan/store"

export * from './generated/v1/models';

export const TitanApiClient = new TitanApi(new TitanApiConfig({
    apiKey: () => AppStore.getState().authUser.credentials!.token,
    basePath: config.get('api.baseUrl'),
    middleware: [
        {
            pre: (request: RequestArgs) => {
                return request;
            },
            post: (response: ResponseArgs) => {
                if (response.status) {
                    AppStore.dispatch(AuthActions.logout());
                }
                return response;
            }
        }
    ]
}));
