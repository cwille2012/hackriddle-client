import React, {Component} from 'react';
import axios from 'axios';

import {setCookie} from '../functions/cookies';
import { MainPlate, TextInput, Center, SubmitButton } from "../library";


export class Purchase extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            firstname: '',
            lastname: '',
            phone: '',
            firstnameHelp: '',
            lastnameHelp: '',
            phoneHelp: ''
        }

        if (!!props.location) {
            if (props.location.pathname.includes('logout')) {
                window.location.href = '/';
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.validateInputs = this.validateInputs.bind(this);
        this.purchase = this.purchase.bind(this);
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

        if (this.state.phone === '') {
            inputsValid = false;
            this.setState({phoneHelp: 'Please enter a valid phone number'},
                function(){this.forceUpdate()});
        } else {
            this.setState({phoneHelp: ''},
                function(){this.forceUpdate()});
        }

        return inputsValid
    }

    purchase() {
        if (this.validateInputs() !== false) {

            var bagsDropdown = document.getElementById("bags");
            var bags = bagsDropdown.options[bagsDropdown.selectedIndex].value;

            var seatDropdown = document.getElementById("seat");
            var seat = seatDropdown.options[seatDropdown.selectedIndex].value;

            var classDropdown = document.getElementById("class");
            var classValue = classDropdown.options[classDropdown.selectedIndex].value;

            if (seat === "middle" && classValue === "first") {
                seat = "aisle";
            }

            var childDropdown = document.getElementById("child");
            var childValue = childDropdown.options[childDropdown.selectedIndex].value;

            var handicapDropdown = document.getElementById("handicap");
            var handicapValue = handicapDropdown.options[handicapDropdown.selectedIndex].value;

            var priority = "no";
            if (childValue === "yes" || handicapValue === "yes") {
                priority = "yes";
            }

            var data = {
                "firstname": this.state.firstname,
                "lastname": this.state.lastname,
                "phone": this.state.phone,
                "bags": bags,
                "seat": seat,
                "class": classValue,
                "priority": priority
            }

            axios.post('http://10.33.69.132:3000/ticket', data)
            .then(res => {
                // console.log(res.data)
                if (res.data.ticketID !== undefined) {
                    setCookie('id', res.data.ticketID, 1);
                    window.location.reload();
                } else {
                    alert('Purchase failure, please try again');
                }
            }).catch(function (error) {
                alert('Purchase failure, please try again');
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
            <MainPlate title="Ticket Purchase" subTitle="All fields required." maxWidth="700px">
                <form>
                    <TextInput label="First Name" name="firstname" placeholder="First Name" helpText={this.state.firstnameHelp} autocomplete="given-name" onChange={this.handleChange} />
                    <TextInput label="Last Name" name="lastname" placeholder="Last Name" helpText={this.state.lastnameHelp} autocomplete="family-name" onChange={this.handleChange} />
                    <TextInput label="Phone Number" name="phone" placeholder="Phone Number" helpText={this.state.phoneHelp} onChange={this.handleChange} autocomplete="tel" />

                    <div className="row col-sm-12" style={{marginTop: '20px'}}>
                        <label htmlFor="bags" className="form-input-label">Carry-on bags?</label>
                        <select name="bags" id="bags" style={{width: '100%', height: '45px', background: 'white', fontSize: '16px', border: '1px solid #dddddd', color: '#666', fontWeight: '400'}}>
                            <option value="0">None</option>
                            <option value="1">One</option>
                        </select>
                    </div>

                    <div className="row col-sm-12" style={{marginTop: '20px'}}>
                        <label htmlFor="seat" className="form-input-label">Class Preference</label>
                        <select name="class" id="class" style={{width: '100%', height: '45px', background: 'white', fontSize: '16px', border: '1px solid #dddddd', color: '#666', fontWeight: '400'}}>
                            <option value="economy">No Preference</option>
                            <option value="economy">Economy</option>
                            <option value="first">First</option>
                        </select>
                    </div>

                    <div className="row col-sm-12" style={{marginTop: '20px'}}>
                        <label htmlFor="seat" className="form-input-label">Seat Preference</label>
                        <select name="seat" id="seat" style={{width: '100%', height: '45px', background: 'white', fontSize: '16px', border: '1px solid #dddddd', color: '#666', fontWeight: '400'}}>
                            <option value="middle">No Preference</option>
                            <option value="window">Window</option>
                            <option value="middle">Middle</option>
                            <option value="aisle">Aisle</option>
                        </select>
                    </div>

                    <div className="row col-sm-12" style={{marginTop: '20px'}}>
                        <label htmlFor="child" className="form-input-label">Traveling with child under 3?</label>
                        <select name="child" id="child" style={{width: '100%', height: '45px', background: 'white', fontSize: '16px', border: '1px solid #dddddd', color: '#666', fontWeight: '400'}}>
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select>
                    </div>

                    <div className="row col-sm-12" style={{marginTop: '20px'}}>
                        <label htmlFor="handicap" className="form-input-label">Need handicap assistance?</label>
                        <select name="handicap" id="handicap" style={{width: '100%', height: '45px', background: 'white', fontSize: '16px', border: '1px solid #dddddd', color: '#666', fontWeight: '400'}}>
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select>
                    </div>
                    
                    <Center>
                        <SubmitButton onClick={this.purchase}>Purchase</SubmitButton>
                        <div style={{marginTop: '25px'}}>
                            <p>Have a Ticket? <a href="/lookup" style={{color: 'blue'}}>Ticket Lookup</a></p>
                        </div>
                    </Center>
                </form>
            </MainPlate>
        )
    }
}