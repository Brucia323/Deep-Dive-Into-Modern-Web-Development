import { useEffect, useState } from 'react'
import { FlatList, Pressable, StyleSheet, View } from 'react-native'
import { Modal, Portal, Searchbar } from 'react-native-paper'
import { useNavigate } from 'react-router-native'
import { useDebounce } from 'use-debounce/lib'
import useRepositories from '../hooks/useRepositories'
import RepositoryItem from './RepositoryItem'
import Text from './Text'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const orders = [
  { id: 1, text: '最新' },
  { id: 2, text: '评分从高到低' },
  { id: 3, text: '评分从低到高' },
]

const RepositoryList = () => {
  const [order, setOrder] = useState('最新')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchKeyword] = useDebounce(searchQuery, 1000)
  const { repositories, refetch, fetchMore } = useRepositories(
    order,
    searchKeyword
  )
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  useEffect(() => refetch(order, searchKeyword), [searchKeyword])

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : []

  const openModal = () => setVisible(true)

  const closeModal = () => setVisible(false)

  const onChangeSearch = query => setSearchQuery(query)

  const onEndReached = () => fetchMore()

  return (
    <>
      <Searchbar
        placeholder='Search'
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{ margin: 8 }}
      />
      <Pressable onPress={openModal}>
        <View style={{ height: 48 }}>
          <Text style={{ marginTop: 15, textAlign: 'center' }}>{order} ▾</Text>
        </View>
      </Pressable>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={closeModal}
          contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}
        >
          <FlatList
            data={orders}
            ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  setOrder(item.text)
                  refetch(order, searchKeyword)
                  setVisible(false)
                }}
              >
                <Text>{item.text}</Text>
              </Pressable>
            )}
          />
        </Modal>
      </Portal>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        onEndReachedThreshold={0.5}
        onEndReached={onEndReached}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              navigate(`/${item.id}`, { replace: true })
            }}
          >
            <RepositoryItem item={item} />
          </Pressable>
        )}
      />
    </>
  )
}

export default RepositoryList
