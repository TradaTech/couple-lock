import React, { Component } from 'react';
import CoverImage from './components/CoverImage';

class User extends Component {

    constructor(props) {
        super(props)

        this.state ={
            
        }
    }

    changeSender = () => {
        localStorage.setItem("sender", 'tradatech');
    }

    render() {
        return (
            <div>
                <CoverImage />
            </div>
        )
    }
}

export default User;