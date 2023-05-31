import React from 'react';
import { View } from "react-native"

const Controler = ({ children, current }) => {
    // console.log(current);
    let idx = '0'
    switch (current) {
        case 'Home':
            idx = '0'
            break;
        case 'Contact Resource':
            idx = '1'
            break;
        case 'Help':
            idx = '2'
            break;
        case 'Donation':
            idx = '3'
            break;
        case 'Review':
            idx = '4'
            break;
        default:
            break;
    }
    return children[idx]
}

export default Controler