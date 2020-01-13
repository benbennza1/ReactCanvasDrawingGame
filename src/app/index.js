import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../home';
import Canvas from '../canvas';
import Chat from '../chat';
import Room from '../room';
import Header from '../header';
import { Container, Row, Col } from 'reactstrap';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <Header />
                    <Home />
                </Route>
                <Route exact path='/play'>
                    <Header />
                    <Container fluid={true}>
                        <Row>
                            <Col>
                                <Room />
                            </Col>
                            <Col>
                                <Canvas />
                            </Col>
                            <Col>
                                <Chat />
                            </Col>
                        </Row>
                    </Container>
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
