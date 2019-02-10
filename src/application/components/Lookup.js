import React, {Component} from 'react';
import axios from 'axios';

import {setCookie} from '../functions/cookies';
import { MainPlate, TextInput, Center, SubmitButton } from "../library";


export class Lookup extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            firstname: '',
            firstnameHelp: '',
            lastname: '',
            lastnameHelp: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.validateInputs = this.validateInputs.bind(this);
        this.lookup = this.lookup.bind(this);
    }

    validateInputs() {
        var inputsValid = true;

        if (this.state.firstname === '') {
            inputsValid = false;
            this.setState({firstnameHelp: 'Please enter a valid first name'},
                function(){this.forceUpdate()});
        } else {
            this.setState({firstnameHelp: ''},
                function(){this.forceUpdate()});
        }

        if (this.state.lastname === '') {
            inputsValid = false;
            this.setState({lastnameHelp: 'Please enter a valid last name'},
                function(){this.forceUpdate()});
        } else {
            this.setState({lastnameHelp: ''},
                function(){this.forceUpdate()});
        }

        return inputsValid
    }

    lookup() {
        if (this.validateInputs() !== false) {

            axios.get('http://10.33.69.132:3000/ticket?firstname=' + this.state.firstname + '&lastname=' + this.state.lastname, {withCredentials: false})
            .then(res => {
                console.log(res.data)
                if (res.status === 200 && !!res.data.ticketID) {
                    setCookie('id', res.data.ticketID, 1);
                    window.location.reload();
                } else {
                    alert('Ticket lookup failed!');
                    window.location.href='/logout';
                }
            })
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
            <MainPlate title="Ticket Lookup" subTitle="All fields required." maxWidth="700px">
                <form>
                    <TextInput label="First Name" name="firstname" placeholder="First Name" helpText={this.state.firstnameHelp} autocomplete="given-name" onChange={this.handleChange} />
                    <TextInput label="Last Name" name="lastname" placeholder="Last Name" helpText={this.state.lastnameHelp} autocomplete="family-name" onChange={this.handleChange} />

                    <Center>
                        <SubmitButton onClick={this.lookup}>Lookup</SubmitButton>
                    </Center>
                </form>
            </MainPlate>
        )
    }
}