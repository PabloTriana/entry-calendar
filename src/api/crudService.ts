import { apiClient } from './client';

export interface CrudService<TEntity, TInput> {
    readonly list: () => Promise<readonly TEntity[]>;
    readonly get: (id: number) => Promise<TEntity>;
    readonly create: (input: TInput) => Promise<TEntity>;
    readonly update: (id: number, input: Partial<TInput>) => Promise<TEntity>;
    readonly remove: (id: number) => Promise<void>;
}

export const createCrudService = <TEntity, TInput>(
    resourcePath: string,
    paramKey: string,
): CrudService<TEntity, TInput> => {
    const memberPath = (id: number): string => `${resourcePath}/${id}`;

    return {
        list: async () => (await apiClient.get<TEntity[]>(resourcePath)).data,
        get: async (id) => (await apiClient.get<TEntity>(memberPath(id))).data,
        create: async (input) => (await apiClient.post<TEntity>(resourcePath, { [paramKey]: input })).data,
        update: async (id, input) => (await apiClient.patch<TEntity>(memberPath(id), { [paramKey]: input })).data,
        remove: async (id) => { await apiClient.delete(memberPath(id)); },
    };
};