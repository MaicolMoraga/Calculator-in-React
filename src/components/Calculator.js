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

        this.evaluateColors = this.evaluateColors.bind(this);
        this.evaluateGrid   = this.evaluateGrid.bind(this);

      }

      evaluateColors(item){
        var nameClase = '';
        var signs     = ["+", "-", "*", "/"];
        
        if(signs.indexOf(item) > -1){
            nameClase ='warning';
        }else if(item === '='){
            nameClase ='primary';
        }else if(item === 'AC'){
            nameClase ='danger';
        }else{
            nameClase ='outline-dark';
        }
        
        return nameClase;
      }
  
      evaluateGrid(item){
        var nameClase = '';
  
        if(item !== '='){
            nameClase='btn-block';
        }
  
        return nameClase;
      }

    render(){

        const arrayButtons = this.state.listButtons.map(
            (listButtons,i) => {
              return(
                <Col key={i} xs={3} sm={3} md={3} className="mb-2 p-1">
                  <Button id={listButtons.id} value={listButtons.value} size="lg" color={this.evaluateColors(listButtons.value)} className={this.evaluateGrid(listButtons.value)} >
                    {listButtons.display}
                  </Button>
                </Col>
              )
            }
          );

        return(
            <Col xs={12} sm={6} md={4}>
                <Card className="Card" body outline color="primary">
                <CardBody>
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
