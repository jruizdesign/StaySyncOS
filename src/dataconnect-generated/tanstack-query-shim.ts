import { inject } from '@angular/core';
import { DataConnect } from '@angular/fire/data-connect';
import { injectQuery, injectMutation } from '@tanstack/angular-query-experimental';
import { executeQuery, executeMutation } from 'firebase/data-connect';

export function injectDataConnectQuery(optionsFactory: any, injector: any, caller?: any) {
    return injectQuery(() => {
        const opts = optionsFactory();
        const ref = opts.queryFn();
        // ref is { dataConnect, queryName, variables, ... } (DataConnect QueryRef)

        return {
            queryKey: [ref.name, ref.variables],
            queryFn: () => executeQuery(ref),
            ...opts
        };
    });
}

export function injectDataConnectMutation(refFn: any, args: any, injector: any, caller?: any) {
    const dc = inject(DataConnect);

    return injectMutation(() => ({
        mutationFn: (variables: any) => {
            const ref = refFn(dc, variables);
            return executeMutation(ref);
        }
    }));
}
