import { StyleSheet, View } from 'react-native'
import { Navigate, Route, Routes } from 'react-router-native'
import AppBar from './AppBar'
import CreateReview from './CreateReview'
import MyReviews from './MyReviews'
import RepositoryList from './RepositoryList'
import SignIn from './SignIn'
import SignUp from './SignUp'
import SingleRepository from './SingleRepository'

const styles = StyleSheet.create({
  container: {
    // marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#fafafa',
  },
})

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} exact />
        <Route path='/:repositoryId' element={<SingleRepository />} exact />
        <Route path='/signin' element={<SignIn />} exact />
        <Route path='/createreview' element={<CreateReview />} exact />
        <Route path='/signup' element={<SignUp />} exact />
        <Route path='/myreviews' element={<MyReviews />} exact />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </View>
  )
}

export default Main
