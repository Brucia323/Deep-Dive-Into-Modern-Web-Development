import { Formik } from 'formik'
import { Pressable, StyleSheet, ToastAndroid, View } from 'react-native'
import { useNavigate } from 'react-router-native'
import * as yup from 'yup'
import useSignUp from '../hooks/useSignup'
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
  username: yup
    .string()
    .required('请输入用户名')
    .min(1, '不得少于1个字符')
    .max(30, '不得超过30个字符')
    .trim(),
  password: yup
    .string()
    .required('请输入密码')
    .min(5, '不得少于5个字符')
    .max(50, '不得超过50个字符')
    .trim(),
  passwordConfirmation: yup
    .string()
    .required('请确认密码')
    .oneOf([yup.ref('password'), null], '两次输入的密码不一致'),
})

const SignUp = () => {
  const [signUp] = useSignUp()
  const navigate = useNavigate()

  const onSubmit = async values => {
    const { username, password } = values

    try {
      await signUp({ username, password })
      navigate('/', { replace: true })
    } catch (e) {
      ToastAndroid.show('注册失败', ToastAndroid.LONG)
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
          <FormikTextInput
            name='passwordConfirmation'
            placeholder='确认密码'
            secureTextEntry
          />
          <Pressable onPress={handleSubmit} style={styles.Button}>
            <Text style={styles.Text} fontSize='subheading'>
              注册
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  )
}

export default SignUp
