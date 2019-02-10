import React from "react";
import { MainPlate, Center } from "../library";

const NotFound = () => (
    <MainPlate title="Not Found" subTitle="The page you are trying to access could not be found.">
        <Center>
            <img src="/404.jpg" alt="" style={{width: '50%'}} />
        </Center>
    </MainPlate>
);
  
export {NotFound};