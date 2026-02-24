




import { toast } from "sonner";
import { apiClient } from "./api";


import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "ky";
import type { BaseRequest, UseMutationOptions, UseMutationResponse } from "@/typescript/types/global";



export const creatorKy = async <TData>({
    method,
    url,
    body,
    header,
    query,
    reuqestType,
}: BaseRequest<unknown, unknown>): Promise<TData> => {
    const searchParams = query
        ? Object.entries(query).reduce<Record<string, string>>((acc, [key, value]) => {
            acc[key] = String(value);
            return acc;
        }, {})
        : undefined;

    const options: any = {
        method,
        headers: header,
        searchParams,
    };

    if (method !== "get" && method !== "delete") {
        if (reuqestType === "form-data") {
            options.body = body as FormData;
        } else {
            options.json = body;
        }
    }

    return apiClient(url, options).json<TData>();
};






export const useCustomMutationNormal = <
    TData = unknown,
    TBody = unknown,
    TQuery = unknown
>({
    request,
    onSuccess,
    errorHandler,
    invalidateKeys,
}: UseMutationOptions<TData, TBody, TQuery>): UseMutationResponse<TData> => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        TData,
        HTTPError,
        BaseRequest<TBody, TQuery>
    >({
        mutationKey: [request.url],
        mutationFn: (payload) => creatorKy<TData>(payload),
        onSuccess: (data) => {
            if (invalidateKeys?.length) {
                invalidateKeys.forEach((key) => {
                    queryClient.invalidateQueries({
                        queryKey: [key],
                        exact: false,
                    });
                });
            }
            onSuccess?.(data);
        },

        onError: async (error) => {
            if (error instanceof HTTPError) {
                const errorData: unknown = await error.response.json().catch(() => null);

                if (errorHandler) {
                    errorHandler(errorData);
                    return;
                }

                if (
                    errorData &&
                    typeof errorData === "object"
                ) {
                    const typedError = errorData as {
                        message?: string;
                        messageList?: { message: string }[];
                    };

                    if (typedError.messageList?.length) {
                        typedError.messageList.forEach((err) => {
                            toast.error(err.message);
                        });
                        return;
                    }

                    // ✅ بعد message اصلی
                    if (typedError.message) {
                        toast.error(typedError.message);
                        return;
                    }
                }

                toast.error(error.message);
            }
        }
    });

    const mutate = (
        body?: TBody,
        query?: TQuery,
        clearCache = false
    ) => {
        if (clearCache && invalidateKeys?.length) {
            invalidateKeys.forEach((key) => {
                queryClient.removeQueries({ queryKey: [key] });
            });
        }

        mutation.mutate({
            ...request,
            body,
            query,
        });
    };

    return {
        mutate: (body?: unknown, query?: unknown, clearCache?: boolean) => mutate(body as TBody, query as TQuery, clearCache),
        data: mutation.data,
        isLoading: mutation.isPending,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
        error: mutation.error,
        reset: mutation.reset,
    };
};