import { usePaginatedList } from '@/hooks/usePaginatedList'
import { adminsListQuery } from '@/lib/services/queries/lists'
import { keys } from '@/lib/services/keys'
import type { TAdmin } from '@/typescript'

export const useGetAdminsData = () => usePaginatedList<TAdmin>(adminsListQuery, keys.admins.lists())
