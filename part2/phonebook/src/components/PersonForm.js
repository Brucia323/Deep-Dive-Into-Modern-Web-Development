const PersonForm = props => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name:
        <input value={props.nameValue} onChange={props.onChangeName} />
      </div>
      <div>
        number:
        <input value={props.numberValue} onChange={props.onChangeNumber} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

export default PersonForm
