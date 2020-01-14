import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { socket } from "../api";
import "./home.css";
import { Button, Container, Col, Input } from "reactstrap";

const Home = ({ history }) => {
    const [val, setVal] = useState("");

    const onChange = e => {
        setVal(e.target.value);
    };

    const globalClick = e => {
        e.preventDefault();
        socket.emit("join global", { room: "global", name: val });
        history.push("/play");
    };

    return (
        <div className="container">
            <Input
                className="name-input"
                type="text"
                value={val}
                onChange={e => onChange(e)}
                placeholder="Display Name"
            />
            <Container fluid={true}>
                <row>
                    <Col>
                        <Button
                            color="primary"
                            className="join-global"
                            type="submit"
                            onClick={e => globalClick(e)}
                        >
                            Play
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            color="info"
                            className="join-private"
                            type="submit"
                        >
                            Create Private Room
                        </Button>
                    </Col>
                </row>
            </Container>
        </div>
    );
};

export default withRouter(Home);
