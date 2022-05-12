import { useApolloClient, useMutation } from '@apollo/client'
import { SIGN_IN, SIGN_UP } from '../graphql/mutations'
import useAuthStorage from '../hooks/useAuthStorage'

const useSignUp = () => {
  const authStorage = useAuthStorage()
  const [mutate, result] = useMutation(SIGN_IN)
  const [mutate1] = useMutation(SIGN_UP)
  const apolloClient = useApolloClient()

  const signUp = async ({ username, password }) => {
    await mutate1({
      variables: {
        user: {
          username,
          password,
        },
      },
    })
    const { data } = await mutate({
      variables: {
        credentials: {
          username,
          password,
        },
      },
    })
    await authStorage.setAccessToken(data.authenticate.accessToken)
    apolloClient.resetStore()
    return result
  }

  return [signUp, result]
}

export default useSignUp
