import React, { Component } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { socket } from "../../api";

class CanvasNav extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    clear() {
        alert("Not yet implemented on the server.");
        socket.emit("clearCanvas");
    }

    save() {
        //TODO
        alert("Not yet implemented on the server.");
        socket.emit("saveCanvas");
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <Button color="primary" onClick={this.clear}>
                            Clear
                        </Button>
                    </Col>
                    <Col>
                        <Button color="info" onClick={this.save}>
                            Save
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default CanvasNav;
