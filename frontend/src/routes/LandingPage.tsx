import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <>
      <Container className="vh-100">
        <Container className="vh-100 d-flex justify-content-center align-items-center text-center">
          <div className="v-stack gap-3">
            <h1 className="fs-1 fw-bold">Volunteer App</h1>
            <p>Manage events, volunteers, and more</p>
            <ButtonGroup vertical>
              <Button href="/login" variant="primary">
                Login
              </Button>
              <Button variant="primary" href="/signup">
                Register
              </Button>
            </ButtonGroup>
          </div>
        </Container>
      </Container>
    </>
  );
};

export default LandingPage;
