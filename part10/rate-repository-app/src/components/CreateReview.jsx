import { Formik } from 'formik'
import { Pressable, StyleSheet, ToastAndroid, View } from 'react-native'
import { useNavigate } from 'react-router-native'
import * as yup from 'yup'
import useCreateReview from '../hooks/useCreateReview'
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
  repositoryOwnerName: yup.string().required('请输入存储库所有者'),
  repositoryName: yup.string().required('请输入存储库名称'),
  rating: yup
    .number()
    .required('请输入评分')
    .min(0, '不得小于0')
    .max(100, '不得大于100')
    .integer(),
  review: yup.string(),
})

const CreateReview = () => {
  const [createReview] = useCreateReview()
  const navigate = useNavigate()

  const onSubmit = async values => {
    const { repositoryName, repositoryOwnerName, rating, review } = values

    try {
      await createReview({
        repositoryName,
        ownerName: repositoryOwnerName,
        rating,
        text: review,
      })
      navigate('/', { replace: true })
    } catch (e) {
      ToastAndroid.show('评分失败', ToastAndroid.LONG)
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
          <FormikTextInput
            name='repositoryOwnerName'
            placeholder='存储库所有者'
          />
          <FormikTextInput name='repositoryName' placeholder='存储库名称' />
          <FormikTextInput name='rating' placeholder='评分从0到100' />
          <FormikTextInput name='review' placeholder='评论' multiline />
          <Pressable onPress={handleSubmit} style={styles.Button}>
            <Text style={styles.Text} fontSize='subheading'>
              创建评论
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  )
}

export default CreateReview
