import React, { Component } from 'react';
import {listButtons} from '../json/Buttons.json';
import { Col, Card, CardBody, Row, Button } from 'reactstrap';

class Calculator extends Component{
    constructor(props){
        super();
        this.state = {
            display: props.initialValue.length>0?props.initialValue:0,
            equation:"",
            listButtons
        }

      }

    render(){

        const arrayButtons = this.state.listButtons.map(
            (listButtons,i) => {
              return(
                <Col key={i} xs={3} sm={3} md={3} className="mb-2 p-1">
                  <Button size="lg" >
                    {listButtons.display}
                  </Button>
                </Col>
              )
            }
          );

        return(
            <Col xs={12} sm={6} md={4}>
                <Card>
                    <CardBody className="Card" body outline color="primary">
                        <Col id="view" xs={12} sm={12} md={12} className="mb-2">
                            <span id="eq">
                            {this.state.equation}
                            </span>
                            <span id="dis">
                            {this.state.display}
                            </span>
                        </Col>
                        <Row className="m-0">
                            {arrayButtons}
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        );
    }

}

export default Calculator;
