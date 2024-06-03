import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
const SuccessFailureModal = ({show, status, close}) => {
  return (
    <>
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>{status ? 'Payment Success' : 'Payment Failure'}</Modal.Title>
        </Modal.Header>
        {status ? (
          <Modal.Body>Thank you for buying our Subscription </Modal.Body>
        ) : (
          <Modal.Body>Your Payment was Not Succesfull</Modal.Body>
        )}
        <Modal.Footer>
          <Button variant='secondary' onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default SuccessFailureModal
