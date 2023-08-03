import { Modal, Button, Form } from "react-bootstrap";
import FormInput from "../components/FormInput";
import FormTextArea from "../components/FormTextArea";

const EditProfileModal = ({
  show,
  handleClose,
  formData,
  handleInputChange,
  handleUpdateProfile,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleUpdateProfile}>
          <FormInput
            label="Name"
            name="name"
            value={formData.name || ""}
            onChange={(value) => handleInputChange("name", value)}
          />
          <FormInput
            label="Email"
            name="email"
            value={formData.email || ""}
            onChange={(value) => handleInputChange("email", value)}
          />
          <FormInput
            label="Gender"
            name="gender"
            type="radio"
            value={formData.gender || "male"}
            onChange={(value) => handleInputChange("gender", value)}
          />
          <FormInput
            label="Phone"
            name="phone"
            value={formData.phone || ""}
            onChange={(value) => handleInputChange("phone", value)}
          />
          <FormTextArea
            label="Address"
            name="address"
            value={formData.address || ""}
            onChange={(value) => handleInputChange("address", value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateProfile}>
          Update Profile
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfileModal;
