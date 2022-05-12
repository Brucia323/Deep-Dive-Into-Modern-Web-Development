import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (order, searchKeyword) => {
  let orderDirection = 'DESC'
  let orderBy = 'CREATED_AT'
  if (order === '最新') {
    orderBy = 'CREATED_AT'
  } else {
    orderBy = 'RATING_AVERAGE'
    if (order === '评分从低到高') {
      orderDirection = 'ASC'
    } else {
      orderDirection = 'DESC'
    }
  }

  const variables = {
    orderBy,
    orderDirection,
    searchKeyword,
    first: 8,
  }

  const { data, loading, fetchMore, refetch, ...result } = useQuery(
    GET_REPOSITORIES,
    {
      fetchPolicy: 'cache-and-network',
      variables: { ...variables },
    }
  )

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    })
  }

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    refetch,
    ...result,
  }
}

export default useRepositories
