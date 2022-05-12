import { Image, StyleSheet, View } from 'react-native'
import theme from '../theme'
import Text from './Text'

const style = StyleSheet.create({
  count: {
    flexDirection: 'column',
    marginTop: 12,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
  },
})

const RepositoryItem = ({ item }) => {
  return (
    <View style={{ backgroundColor: 'white', padding: 24 }}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={{ uri: item.ownerAvatarUrl }}
          style={{ height: 46, width: 46, borderRadius: 5 }}
        />
        <View
          style={{ flexDirection: 'column', paddingLeft: 12, paddingRight: 24 }}
        >
          <Text fontWeight='bold'>{item.fullName}</Text>
          <Text>{item.description}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 58 }}>
        <Text
          style={{
            backgroundColor: theme.colors.primary,
            color: 'white',
            padding: 5,
            borderRadius: 5,
          }}
        >
          {item.language}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={style.count}>
          <Text fontWeight='bold'>
            {item.stargazersCount < 1000
              ? item.stargazersCount
              : `${(item.stargazersCount / 1000).toFixed(1)}k`}
          </Text>
          <Text>Stars</Text>
        </View>
        <View style={style.count}>
          <Text fontWeight='bold'>
            {item.forksCount < 1000
              ? item.forksCount
              : `${(item.forksCount / 1000).toFixed(1)}k`}
          </Text>
          <Text>Forks</Text>
        </View>
        <View style={style.count}>
          <Text fontWeight='bold'>{item.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={style.count}>
          <Text fontWeight='bold'>{item.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  )
}

export default RepositoryItem
