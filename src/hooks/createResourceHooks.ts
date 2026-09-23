import {
  skipToken,
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import type { CrudService } from "../api/crudService";
import type { ApiError } from "../api/errors";

export interface UpdateVariables<TInput> {
  readonly id: number;
  readonly input: Partial<TInput>;
}

export interface ResourceHooks<TEntity, TInput> {
  readonly useList: () => UseQueryResult<readonly TEntity[]>;
  readonly useDetail: (id: number | undefined) => UseQueryResult<TEntity>;
  readonly useCreate: () => UseMutationResult<TEntity, ApiError, TInput>;
  readonly useUpdate: () => UseMutationResult<TEntity, ApiError, UpdateVariables<TInput>>;
  readonly useDelete: () => UseMutationResult<void, ApiError, number>;
}

export const createResourceHooks = <TEntity, TInput>(
  resource: string,
  service: CrudService<TEntity, TInput>,
): ResourceHooks<TEntity, TInput> => {
  const keys = {
    all: [resource] as const,
    list: [resource, 'list'] as const,
    detail: (id: number | undefined) => [resource, 'detail', id] as const,
  };

  const useInvalidateAll = (): (() => Promise<void>) => {
    const queryClient = useQueryClient();
    return () => queryClient.invalidateQueries({ queryKey: keys.all });
  };

  return {
    useList: () => useQuery({ queryKey: keys.list, queryFn: service.list }),

    useDetail: (id) =>
      useQuery({
        queryKey: keys.detail(id),
        queryFn: id === undefined ? skipToken : () => service.get(id),
      }),

    useCreate: () => {
      const invalidateAll = useInvalidateAll();
      return useMutation({ mutationFn: service.create, onSuccess: invalidateAll });
    },

    useUpdate: () => {
      const invalidateAll = useInvalidateAll();
      return useMutation({
        mutationFn: ({ id, input }: UpdateVariables<TInput>) => service.update(id, input),
        onSuccess: invalidateAll,
      });
    },

    useDelete: () => {
      const invalidateAll = useInvalidateAll();
      return useMutation({ mutationFn: service.remove, onSuccess: invalidateAll });
    },
  };
};