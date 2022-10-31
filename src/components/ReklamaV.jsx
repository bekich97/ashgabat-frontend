import React from 'react';
import { useState, useEffect } from "react";
import ReklamaService from "../services/ReklamaService";
import { BACKEND_HOST } from "../consts";

const ReklamaV = () => {
    const [reklama, setReklama] = useState("");
    useEffect(() => {
        ReklamaService.getReklama().then((res) => {
            setReklama(res.data);
        })
    }, []);
    return (
        <a href={reklama.urlv ? reklama.urlv : "#"}>
            {
                reklama.filev ?
                <img src={BACKEND_HOST + reklama.filev} width="100%" alt='0' />
                :
                ""
            }
        </a>
    );
}

export default ReklamaV;
