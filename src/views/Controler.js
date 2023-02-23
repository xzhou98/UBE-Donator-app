import React from 'react';
import { View } from "react-native"

const Controler = ({children, current}) => {
    console.log(children.length);

    return children[current]
}

export default Controler