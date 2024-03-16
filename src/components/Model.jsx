import Modal from 'react-bootstrap/Modal'

export default function MyVerticallyCenteredModal({
  handleUpdate,
  setUrl,
  ...props
}) {
  function onSubmitHandler(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    console.log(formData.get('url'))
    handleUpdate(formData.get('url'))
  }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Change URL</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3">
            <label htmlFor="url" className="form-label">
              Enter your URL
            </label>
            <input
              type="text"
              className="form-control"
              id="url"
              name="url"
              placeholder="Enter URL"
              value={props.full_url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="text-end">
            <button type="submit" className="btn btn-primary w-25">
              Submit
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}
