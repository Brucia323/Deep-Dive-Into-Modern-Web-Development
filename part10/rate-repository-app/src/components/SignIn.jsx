import { Formik } from 'formik'
import { Pressable, StyleSheet, ToastAndroid, View } from 'react-native'
import { useNavigate } from 'react-router-native'
import * as yup from 'yup'
import useSignIn from '../hooks/useSignIn'
import theme from '../theme'
import FormikTextInput from './FormikTextInput'
import Text from './Text'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 12,
  },
  Button: {
    backgroundColor: theme.colors.primary,
    height: 48,
    borderRadius: 5,
    marginTop: 8,
  },
  Text: {
    color: 'white',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
})

const validationSchema = yup.object().shape({
  username: yup.string().required('请输入用户名'),
  password: yup.string().required('请输入密码'),
})

const SignIn = () => {
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async values => {
    const { username, password } = values

    try {
      await signIn({ username, password })
      navigate('/', { replace: true })
    } catch (e) {
      ToastAndroid.show('登录失败', ToastAndroid.LONG)
      console.log(e)
    }
  }

  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      initialValues={{}}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput name='username' placeholder='用户名' />
          <FormikTextInput name='password' placeholder='密码' secureTextEntry />
          <Pressable onPress={handleSubmit} style={styles.Button}>
            <Text style={styles.Text} fontSize='subheading'>
              登录
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  )
}

export default SignIn
