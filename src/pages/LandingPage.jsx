import { Container, Row, Col } from "react-bootstrap";
import bankingImage from "../assets/banking.jpg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const signIn = sessionStorage.getItem("email") !== null;
    if (signIn) {
      navigate("/home");
    }
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col>
          <img
            src={bankingImage}
            alt="Banking"
            style={{ width: "100%", height: "auto" }}
          />
        </Col>

        <Col>
          <div className="d-flex flex-column align-items-center justify-content-center h-100">
            <h1>Welcome to Our Banking App</h1>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod eros ac dolor eleifend, sit amet fringilla odio ultricies.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
