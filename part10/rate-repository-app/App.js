import { ApolloProvider } from '@apollo/client'
import { StatusBar } from 'expo-status-bar'
import { Provider as PaperProvider } from 'react-native-paper'
import { NativeRouter } from 'react-router-native'
import Main from './src/components/Main'
import AuthStorageContext from './src/contexts/AuthStorageContext'
import createApolloClient from './src/utils/apolloClient'
import AuthStorage from './src/utils/authStorage'

const authStorage = new AuthStorage()
const apolloClient = createApolloClient(authStorage)

const App = () => {
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <StatusBar style='auto' />
          <PaperProvider>
            <Main />
          </PaperProvider>
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  )
}

export default App
