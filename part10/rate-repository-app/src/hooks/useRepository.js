import { useQuery } from '@apollo/client'
import { GET_REPOSITORY } from '../graphql/queries'

const useRepository = repositoryId => {
  const variables = {
    repositoryId,
    first: 8,
  }

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    variables: { ...variables },
    fetchPolicy: 'cache-and-network',
  })

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    })
  }

  return {
    repository: data?.repository,
    loading,
    fetchMore: handleFetchMore,
    ...result,
  }
}

export default useRepository
