import { useApolloClient, useQuery } from '@apollo/client'
import Constants from 'expo-constants'
import { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { useNavigate } from 'react-router-native'
import { GET_CURRENT_USER } from '../graphql/queries'
import useAuthStorage from '../hooks/useAuthStorage'
import Text from './Text'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: 72,
    backgroundColor: '#ffffff',
    paddingLeft: 12,
    flexDirection: 'row',
  },
  Button: {
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 12,
    marginTop: 12,
  },
})

const AppBar = () => {
  const { data } = useQuery(GET_CURRENT_USER)
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const [me, setMe] = useState(null)
  const navigate = useNavigate()

  const handleSignIn = () => {
    if (me) {
      authStorage.removeAccessToken()
      apolloClient.resetStore()
    }
    navigate('/signin', { replace: true })
  }

  useEffect(() => {
    if (data) {
      setMe(data.me)
    }
  }, [data])

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable onPress={() => navigate('/', { replace: true })}>
          <View style={styles.Button}>
            <Text fontWeight='bold'>存储库</Text>
          </View>
        </Pressable>
        {me && (
          <>
            <Pressable
              onPress={() => navigate('/createreview', { replace: true })}
            >
              <View style={styles.Button}>
                <Text fontWeight='bold'>创建评论</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => navigate('/myreviews', { replace: true })}
            >
              <View style={styles.Button}>
                <Text fontWeight='bold'>我的评论</Text>
              </View>
            </Pressable>
          </>
        )}
        <Pressable onPress={handleSignIn}>
          <View style={styles.Button}>
            {me ? (
              <Text fontWeight='bold'>注销</Text>
            ) : (
              <Text fontWeight='bold'>登录</Text>
            )}
          </View>
        </Pressable>
        {!me && (
          <Pressable onPress={() => navigate('/signup', { replace: true })}>
            <View style={styles.Button}>
              <Text fontWeight='bold'>注册</Text>
            </View>
          </Pressable>
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
