import { BehaviorSubject, Observable } from "rxjs";
import { __stores__, deepFreeze, isFunction, UpdateStateCallback, getStoresSnapshot } from "./store.utils";
import { map, distinctUntilChanged } from "rxjs/operators";
// import { environment } from 'src/environments/environment';
import { produce } from 'immer';
import { Optional } from '@angular/core';
import { StoreConfig } from './store-config.model';

export let devtools: any = null;

export class Store<S = any> {
    private store!: BehaviorSubject<Readonly<S>>;
    private storeValue!: S;
    private _initialState!: S;

    producerFn?: (state: any, fn: any) => any = produce;

    constructor(private storeName: string, initialState: Partial<S>, @Optional() private storeConfig: StoreConfig | null = null) {
        this.onInit(initialState as S);
        if (!devtools && (window as { [key: string]: any })['__REDUX_DEVTOOLS_EXTENSION__']) {
            // this.devtools = window['devToolsExtension'].connect();
            devtools = (window as { [key: string]: any })['__REDUX_DEVTOOLS_EXTENSION__'].connect();
        }
    }

    //public functions

    getValue() {
        return this.storeValue;
    }

    reset() {
        this._setState(() => Object.assign({}, this._initialState));
    }

    updateState(stateCallback: UpdateStateCallback<S>): void;
    updateState(state: Partial<S>): void;
    updateState(stateOrCallback: Partial<S> | UpdateStateCallback<S>) {
        let newState;
        const currentState = this._value();
        if (isFunction(stateOrCallback)) {
            newState = isFunction(this.producerFn) ? this.producerFn(currentState, stateOrCallback) : stateOrCallback(currentState);
            //newState = produce(currentState, stateOrCallback);
        } else {
            //newState = stateOrCallback;
            newState = { ...currentState, ...stateOrCallback };
        }

        //newState = { ...currentState, ...stateOrCallback };
        this._setState(newState);
    }

    setLoading(loading = false) {
        if (loading !== (this._value() as S & { loading: boolean }).loading) {
            this._setState(state => ({ ...state, loading } as S & { loading: boolean }));
        }
    }

    setError<T>(error: T) {
        if (error !== (this._value() as S & { error: any }).error) {
            this._setState(state => ({ ...state, error } as S & { error: any }));
        }
    }

    destroy() {
        if (this === __stores__[this.storeName]) {
            delete __stores__[this.storeName];
        }
    }

    select<R>(project?: (store: S) => R): Observable<R>;
    select(): Observable<S>;
    select<R>(project?: (store: S) => R): Observable<R | S> {
        let state = project ? project : (state: any) => state;
        return this._select(state);
    }



    //private functions

    private onInit(initialState: S) {
        __stores__[this.storeName] = this;
        this._setState(() => initialState);
        this._initialState = initialState;
    }

    protected _setState(newState: ((state: Readonly<S>) => S) | S) {
        if (isFunction(newState)) {
            const _newState = newState(this._value());
            if (this.isFreezeObject())
                this.storeValue = deepFreeze(_newState, this.storeConfig ? this.storeConfig.excludedFreezePropertyNames : []);
            else
                this.storeValue = _newState
        } else {
            if (this.isFreezeObject())
                this.storeValue = deepFreeze(newState, this.storeConfig ? this.storeConfig.excludedFreezePropertyNames : []);
            else
                this.storeValue = newState;
        }

        if (!this.store) {
            this.store = new BehaviorSubject(this.storeValue);
            return;
        }

        this.dispatch(this.storeValue);
    }

    private isFreezeObject() {
        return (!this.storeConfig || !this.storeConfig.preventFreeze) && (!this.storeConfig || !this.storeConfig.prod);
    }

    private _select<R>(project: (store: S) => R): Observable<R> {
        return this.store.asObservable().pipe(
            map(project),
            distinctUntilChanged()
        );
    }

    protected _value(): S {
        return this.storeValue;
    }

    private dispatch(state: S) {
        this.store.next(state);
        if (devtools && this.storeConfig && this.storeConfig.prod === false) {
            devtools.send({ type: "action", payload: state }, getStoresSnapshot(__stores__));
        }
    }
}