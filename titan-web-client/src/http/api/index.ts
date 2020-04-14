import {
    Configuration as TitanApiConfig,
    DefaultApi as TitanApi,
    RequestArgs, ResponseArgs
} from '@titan/http/api/generated/v1';
import { getStoreInstance } from '@titan/lib/redux';
import {config} from '@titan/lib/config';
import {AuthActions} from "@titan/actions/auth_actions";

export * from './generated/v1/models';

/** Returns a cached instance of {@link TitanApi} */
export function getApiClient(): TitanApi {
    let apiClient: TitanApi|undefined = undefined;
    return (() => {
        if (!apiClient) {
            apiClient = createApiClient();
        }
        return apiClient;
    })();
}

/** Initializes a new instance of {@link TitanApi}. */
function createApiClient(): TitanApi {
    const store = getStoreInstance().getStore();
    return new TitanApi(new TitanApiConfig({
        apiKey: () => store.getState().auth.session.token,
        basePath: config.get('api.baseUrl'),
        middleware: [
            {
                pre: (request: RequestArgs) => {
                    return request;
                },
                post: (response: ResponseArgs) => {
                    if (response.status) {
                        store.dispatch(AuthActions.logout());
                    }
                    return response;
                }
            }
        ]
    }));
}
