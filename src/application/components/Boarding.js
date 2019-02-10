import React, {Component} from 'react';
import axios from 'axios';

import { MainPlate, Center, SubmitButton, CancelButton } from "../library";


export class Boarding extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            
        }

        this.handleChange = this.handleChange.bind(this);
        this.validateInputs = this.validateInputs.bind(this);
        this.startBoarding = this.startBoarding.bind(this);
        this.clearTickets = this.clearTickets.bind(this);
    }

    validateInputs() {
        var inputsValid = true;


        return inputsValid
    }

    startBoarding() {
        if (this.validateInputs() !== false) {

            var data = {
                
            }

            axios.post('http://10.33.69.132:3000/boarding', data)
            .then(res => {
                alert('Boarding initiated')
            }).catch(function (error) {
                alert('Boarding failure, please try again');
            });
        }
    }

    clearTickets() {
        if (this.validateInputs() !== false) {

            var data = {
                
            }

            axios.post('http://10.33.69.132:3000/clear', data)
            .then(res => {
                alert('Tickets cleared')
            }).catch(function (error) {
                alert('Clear failure, please try again');
            });
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <MainPlate title="Admin Portal" subTitle="All access to boarding process." maxWidth="700px">
                <form>
                    
                    <Center>
                        <SubmitButton onClick={this.startBoarding}>Initiate Boarding</SubmitButton>
                        <CancelButton onClick={this.clearTickets}>Clear Data</CancelButton>
                    </Center>
                </form>
            </MainPlate>
        )
    }
}