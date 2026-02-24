import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/dashboard/')({
  component: RouteComponent,
})



function RouteComponent() {
  // const {
  //   data,
  //   fetchNextPage,
  //   fetchPreviousPage,
  //   hasNextPage,
  //   hasPreviousPage,
  //   isFetchingNextPage,
  //   isFetchingPreviousPage,
  //   isFetching,
  // } = useCustomInfiniteQuery<Post[]>({
  //   url: (pageParam) => {
  //     console.log(pageParam, 'pageParam')
  //     const page = pageParam as number
  //     return endpoints.posts.list(page)
  //   },
  //   key: ['dashboard', 'posts'],
  //   getNextPageParam: (lastPage, allPages) => {
  //     if (lastPage.data && lastPage.data.length === 10) {
  //       return allPages.length
  //     }
  //     return undefined
  //   },
  //   getPreviousPageParam: (_firstPage, allPages) => {
  //     if (allPages.length > 1) {
  //       return allPages.length - 2
  //     }
  //     return undefined
  //   },
  // })

  // const { data, isFetching, page, setPage } = useCustomPaginationQuery<Post[]>({
  //   url: (page: number) => endpoints.posts.list(page),
  //   key: ['dashboard', 'posts'],
  // })

  return (
    <div className="p-2">
      {/* <div className="mt-4 space-y-4">
        {data?.data?.map((post) => (
          <div key={post.id} className="rounded border p-4">
            <h2 className="font-bold">{post.title}</h2>
            <p className="text-sm text-gray-600">{post.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </Button>

        <Button onClick={() => setPage(page + 1)}>Next</Button>
      </div>

      {isFetching && <div className="mt-2 text-sm text-gray-500">Refreshing...</div>} */}
      
    </div>
  )
}
