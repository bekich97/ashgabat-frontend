import React from 'react';
import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import { langs } from '../langs/langs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setVerified } from '../stores/mainSlice';
import ApiService from '../services/ApiService';
import { Helmet } from 'react-helmet';

export default function Otp() {
    const otp = useSelector(state => state.mainSlice.otp);
    const navigate = useNavigate();
    useEffect(() => {
        if (!otp) {
            navigate('/verify');
        }
    }, [navigate, otp]);
    const [answer, setAnswer] = useState("");
    const [answerError, setAnswerError] = useState("");
    const lang = useSelector(state => state.mainSlice.lang);
    const nextpath = useSelector(state => state.mainSlice.nextpath);
    const dispatch = useDispatch();
    // document.title = langs["Application formalize"][lang] + " - " + langs["Ashgabat city municipality"][lang];

    const handleSubmit = () => {
        ApiService.checkOtp({"otp": answer}).then((res) => {
            if (res.data["answer"]) {
                dispatch(setVerified(true));
                if (nextpath === 'check'){
                    navigate('/check-voucher');
                } else {
                    navigate('/voucher');
                }
            } else {
                setAnswerError(langs["The OTP code is invalid!"][lang]);
                window.location.href = '/verify'
            }
        });
    }

  return (
    <div className='verify-page page-wrapper container shadowly-border'>
        <Helmet>
            <meta charSet="utf-8" />
            <title>{langs["Application formalize"][lang] + " - " + langs["Ashgabat city municipality"][lang]}</title>
            <meta name="description" content={langs["Ashgabat city municipality"][lang]} />
            <link rel="canonical" href={window.location.href} />
        </Helmet>
        <div className='page-title-wrapper'>
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <span>{langs["Home"][lang]} / {langs["Application"][lang]}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-6 col-sm-12 text-center py-2'>
                    <h4 className='mb-2 py-2'>{langs["Application formalize"][lang]}</h4>
                    <p className='mb-3'>{langs["Enter the SMS code sent to your mobile phone to continue (only available to TMCELL customers)."][lang]}</p>
                    <div className='form-wrapper text-start'>
                        <Form.Label htmlFor="inputPassword5">{langs["Enter the code that was sent to you!"][lang]}</Form.Label>
                        <Form.Control
                            type="text"
                            id="inputPassword5"
                            aria-describedby="passwordHelpBlock"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid" style={answerError ? { display: 'block', marginTop: '5px', color: 'red' } : {} }>
                        {answerError}
                        </Form.Control.Feedback>
                        <button className='app-btn green align-self-end my-3' onClick={() => handleSubmit()}>{langs["Check"][lang]}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
