import type { Signal } from "@angular/core";
import type {
    CreateMutationResult,
    CreateQueryResult,
} from "@tanstack/angular-query-experimental";
import type { FirebaseError } from "firebase/app";
import type { MutationResult, QueryResult } from "firebase/data-connect";

export type CreateDataConnectQueryResult<Data, Variables> = CreateQueryResult<
    Data,
    FirebaseError
> & {
    dataConnectResult: Signal<any>;
};

export type CreateDataConnectMutationResult<Data, Variables, Arguments> =
    CreateMutationResult<Data, FirebaseError, Arguments> & {
        dataConnectResult: Signal<any>;
    };
