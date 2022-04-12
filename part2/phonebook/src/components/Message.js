const SuccessMessage = ({ successMessage, errorMessage }) => {
  return (
    <div>
      {successMessage !== null && (
        <div className='successMessage'>{successMessage}</div>
      )}
      {errorMessage !== null && (
        <div className='errorMessage'>{errorMessage}</div>
      )}
    </div>
  )
}

export default SuccessMessage
