/*eslint-disable no-eval */

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
        this.buttonClick    = this.buttonClick.bind(this);

      }

      /*Function that is executed when pressing a button, 
      which evaluates whether to add a value to the equation, clean the display or deliver the result. */
      buttonClick(item){
        /*The initial value and equation are declared, in addition to the signs that allow an equation to be made, 
        in case of pressing "AC" the states are updated by the declared initial values.*/
        var signs       = ['+', '-', '*', '/','.'];
        var valDisplay  = 0;
        var valEquation = '';
        var last        = this.state.equation.substr(-1);

        if(item === '='){
            /*In case of pressing the equal button, it is evaluated that an equation equals and 
            that the equation is written correctly.*/
            if((this.state.equation.length > 0) && (signs.indexOf(last) === -1)){
                valDisplay  = eval(this.state.equation);
                valEquation = this.state.equation;
                /*If the result contains too large a decimal number, they are limited of characters.*/
                var str = valDisplay.toString();

                if((valDisplay%1 > 0) && (str.length >= 10 )){
                    var result  =  (Math.round( valDisplay * 100 ) / 100).toString();
                    var array   = result.split('.');
                    var fix     = array[0].length>8?(array[0].length):(9-array[0].length)
                    valDisplay  = valDisplay.toFixed(fix);
                }
            }
        }else{
            /*The initial value is evaluated as zero and there is no generated equation.*/
            if((this.state.display === 0) && (this.state.equation.length === 0)){
                /*It is evaluated that the pressed button corresponds to a number or to the operator "minus" to enter a negative number, 
                otherwise it does not allow starting an equation with an operator.*/
                if(!isNaN(item) || item === '-'){
                    valEquation = this.state.equation+item
                }
            }else{
                /*The pressed button is evaluated as an operator.*/
                if(signs.indexOf(item) > -1){
                    /*It is evaluated that the last character of the equation is not an operator, 
                    otherwise it replaces it with the new operator.*/
                    if(signs.indexOf(last) > -1){
                        var minusLast = this.state.equation.substring(0, this.state.equation.length -1);
                        valEquation = minusLast+item
                    }else{
                        /*If there is an initial number, it is generated with an equation with said value plus the pressed operator, otherwise, 
                        the operator is added to the existing equation.*/
                        if(this.state.display > 0){
                            valEquation = this.state.display+item
                        }else{
                            valEquation = this.state.equation+item
                        }
                    }

                }else{
                    /*It is evaluated that the button pressed is a number, in case there is an initial number.*/
                    if(!isNaN(item)){
                        /*In case there is an initial number, the number pressed is added to it, 
                        otherwise it is added to the number already existing in the equation.*/
                        if(this.state.display > 0){
                            valEquation = this.state.display+item
                        }else{
                            valEquation = this.state.equation+item
                        }
                    }
                }
            } 
        }

        /*Once the action performed by the pressed button is evaluated, the equation and the result are shown in the views.*/
        this.setState({
            display: valDisplay,
            equation: valEquation
        });
        
      }

      /*Returns the color according to the type of button to use.*/
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
      
      /*Returns the bootstrap class of the style you want to use according to the button.*/
      evaluateGrid(item){
        var nameClase = 'btn-block';
  
        if(item !== '='){
            nameClase='btn-block';
        }
  
        return nameClase;
      }

    render(){
        /*Generate the buttons to use (numbers and operators) based on the Buttons.json file.*/
        const arrayButtons = this.state.listButtons.map(
            (listButtons,i) => {
              return(
                <Col key={i} xs={3} sm={3} md={3} className="mb-2 p-1">
                  <Button id={listButtons.id} value={listButtons.value} size="lg" color={this.evaluateColors(listButtons.value)} className={this.evaluateGrid(listButtons.value)} onClick={this.buttonClick.bind(this,listButtons.value)}>
                    {listButtons.display}
                  </Button>
                </Col>
              )
            }
          );
        /*Col id="View": Section where the equation made and its result are shown.*/
        /*Row: Section where the equation made and its result are shown.*/
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
