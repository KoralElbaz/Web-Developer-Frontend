import { Dictionary } from "./dictionary";
import { cloneDeep } from 'lodash';

export interface IStore<T> {
    repository: Dictionary<IState<T>>;
}

export interface IState<T> {
    data: T;
    originalData: T;
    isEditMode: boolean;
    isProcessing: boolean;
    isDirty: boolean;
    errors: string[];
    refData: any;
    // ui data
    hasPersistentSaveError: boolean;
    showSaveCancel: boolean;
    additionalData: any;
}

export class State<T> implements IState<T>{

    constructor(object: T) {
        this._originalData = object;
        this.data = cloneDeep(object);
    }

    data: T;
    private _originalData: T;
    public get originalData(): T {
        return this._originalData;
    }
    isEditMode: boolean = true;
    isProcessing: boolean = false;
    isDirty: boolean = false;
    hasPersistentSaveError: boolean = false;
    errors: string[] = [];
    showSaveCancel: boolean = true;
    additionalData: object = {};
    refData: any;

}