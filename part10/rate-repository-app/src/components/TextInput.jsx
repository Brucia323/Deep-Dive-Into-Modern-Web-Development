import { TextInput as NativeTextInput, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  Input: {
    borderColor: '#bfbfbf',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 4,
    marginBottom: 4,
    padding: 8,
  },
  InputError: {
    borderColor: '#f5222d',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 4,
    marginBottom: 4,
    padding: 8,
  },
})

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style, error ? styles.InputError : styles.Input]

  return <NativeTextInput style={textInputStyle} {...props} />
}

export default TextInput
