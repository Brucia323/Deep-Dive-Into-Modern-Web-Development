import { format } from 'date-fns'
import { FlatList, Linking, Pressable, StyleSheet, View } from 'react-native'
import { useParams } from 'react-router-native'
import useRepository from '../hooks/useRepository'
import theme from '../theme'
import RepositoryItem from './RepositoryItem'
import Text from './Text'

const styles = StyleSheet.create({
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
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryInfo = ({ repository }) => {
  return (
    <View style={{ backgroundColor: 'white' }}>
      <RepositoryItem item={repository} />
      <View style={{ padding: 24, paddingTop: 0 }}>
        <Pressable
          onPress={() => {
            Linking.openURL(repository.url)
          }}
          style={styles.Button}
        >
          <Text style={styles.Text} fontSize='subheading'>
            在 Github 中打开
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

const ReviewItem = ({ review }) => {
  return (
    <View style={{ backgroundColor: 'white', padding: 24 }}>
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            borderColor: '#1890ff',
            borderRadius: 23,
            height: 46,
            width: 46,
            borderWidth: 1,
            paddingTop: 12,
            marginRight: 12,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
            }}
            color='primary'
            fontWeight='bold'
          >
            {review.rating}
          </Text>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <Text fontWeight='bold'>{review.user.username}</Text>
          <Text>{format(new Date(review.createdAt), 'yyyy-MM-dd')}</Text>
        </View>
      </View>
      <View style={{ paddingLeft: 58 }}>
        <Text>{review.text}</Text>
      </View>
    </View>
  )
}

const SingleRepository = () => {
  const { repositoryId } = useParams()
  const { repository, fetchMore } = useRepository(repositoryId)

  const reviews = repository
    ? repository.reviews.edges.map(edge => edge.node)
    : []

  const onEndReached = () => fetchMore()

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={() => (
        <RepositoryInfo repository={repository ? repository : []} />
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

export default SingleRepository
