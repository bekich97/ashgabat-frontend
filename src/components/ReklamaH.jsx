import React from 'react';
import { useState, useEffect } from "react";
import ReklamaService from "../services/ReklamaService";
import { BACKEND_HOST } from "../consts";

const ReklamaH = () => {
    const [reklama, setReklama] = useState("");
    useEffect(() => {
        ReklamaService.getReklama().then((res) => {
            setReklama(res.data);
        })
    }, []);
    return (
        <a href={reklama.urlh ? reklama.urlh : "#"}>
            {
                reklama.fileh ?
                <img
                src={BACKEND_HOST + reklama.fileh}
                alt="1"
                className="w-100"
                />
                :
                ""
            }
        </a>
    );
}

export default ReklamaH;
