import {applyMiddleware, createStore, Store, StoreEnhancer} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import {Environment} from "@titan/lib/config/types";
import {AppState} from "@titan/reducers/types";

type StoreStateTransformer = (state: AppState) => AppState;

export class AppStateStore {
    private store?: Store;
    private readonly stateTransformers: Array<StoreStateTransformer> = [];

    constructor(private readonly rootReducer, private readonly environment: Environment) {
    }

    getStore() {
        if (!this.store) {
            this.store = this.setupStore();
        }
        return this.store;
    }

    addInitHandler(handler: StoreStateTransformer) {
        this.stateTransformers.push(handler);
    }

    private setupStore(): Store {
        const middleware = this.environment === Environment.PRODUCTION
            ? this.initProdMiddleware()
            : this.initNonProdMiddleware();
        return createStore(
            this.rootReducer,
            this.stateTransformers.reduce<AppState>(
                (state, transformer) => transformer(state), {}),
            middleware);
    }

    private initProdMiddleware(): StoreEnhancer {
        return applyMiddleware(reduxImmutableStateInvariant());
    }

    private initNonProdMiddleware(): StoreEnhancer {
        return composeWithDevTools(this.initProdMiddleware());
    }
}