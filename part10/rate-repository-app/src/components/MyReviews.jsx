import { format } from 'date-fns'
import { Alert, FlatList, Pressable, StyleSheet, View } from 'react-native'
import { useNavigate } from 'react-router-native'
import useDeleteReview from '../hooks/useDeleteReview'
import useMyReviews from '../hooks/useMyReviews'
import Text from './Text'

const styles = StyleSheet.create({
  Button: {
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

const ReviewItem = ({ review, refetch }) => {
  const navigate = useNavigate()
  const mutate = useDeleteReview()

  const handleDelete = () => {
    Alert.alert('删除评论', '你确定要删除这条评论吗？', [
      { text: '取消', style: 'cancel' },
      {
        text: '确定',
        onPress: () => {
          mutate(review.id)
          refetch()
        },
      },
    ])
  }

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
          <Text fontWeight='bold'>{review.repository.fullName}</Text>
          <Text>{format(new Date(review.createdAt), 'yyyy-MM-dd')}</Text>
        </View>
      </View>
      <View style={{ paddingLeft: 58 }}>
        <Text>{review.text}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{ marginTop: 12, marginLeft: 'auto', marginRight: 'auto' }}
        >
          <Pressable
            onPress={() => {
              navigate(`/${review.repository.id}`, { replace: true })
            }}
          >
            <View
              style={{
                backgroundColor: '#1890ff',
                borderRadius: 5,
                paddingVertical: 12,
                paddingHorizontal: 48,
              }}
            >
              <Text style={{ color: '#ffffff' }}>查看仓库</Text>
            </View>
          </Pressable>
        </View>
        <View
          style={{ marginTop: 12, marginLeft: 'auto', marginRight: 'auto' }}
        >
          <Pressable onPress={handleDelete}>
            <View
              style={{
                backgroundColor: '#f5222d',
                borderRadius: 5,
                paddingVertical: 12,
                paddingHorizontal: 62,
              }}
            >
              <Text style={{ color: '#ffffff' }}>删除</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const MyReviews = () => {
  const { reviews, fetchMore, refetch } = useMyReviews()

  const reviewNode = reviews ? reviews.edges.map(edge => edge.node) : []

  const onEndReached = () => fetchMore()

  return (
    <FlatList
      data={reviewNode}
      renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
      keyExtractor={({ id }) => id}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

export default MyReviews
