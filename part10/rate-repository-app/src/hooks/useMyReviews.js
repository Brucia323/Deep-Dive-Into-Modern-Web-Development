import { useQuery } from '@apollo/client'
import { GET_CURRENT_USER } from '../graphql/queries'

const useMyReviews = () => {
  const variables = {
    first: 8,
    includeReviews: true,
  }

  const { data, loading, fetchMore, refetch, ...result } = useQuery(
    GET_CURRENT_USER,
    {
      variables: { ...variables },
      fetchPolicy: 'cache-and-network',
    }
  )

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.me.reviews.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.me.reviews.pageInfo.endCursor,
        ...variables,
      },
    })
  }

  return {
    reviews: data?.me.reviews,
    loading,
    fetchMore: handleFetchMore,
    refetch,
    ...result,
  }
}

export default useMyReviews
