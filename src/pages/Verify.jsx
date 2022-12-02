import React from 'react';
import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import * as Icon from 'react-bootstrap-icons';
import { langs } from '../langs/langs';
import { useDispatch, useSelector } from 'react-redux';
import ApiService from '../services/ApiService';
import { useNavigate } from 'react-router-dom';
import { setOtp } from '../stores/mainSlice';
import { Helmet } from 'react-helmet';

export default function Verify() {
    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [answer, setAnswer] = useState('');
    const [answerError, setAnswerError] = useState('');
    const [myCaptcha, setMyCaptcha] = useState("");
    const [reload, setReload] = useState(false);
    const lang = useSelector(state => state.mainSlice.lang);
    // document.title = langs["Application formalize"][lang] + " - " + langs["Ashgabat city municipality"][lang];
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlePhoneChange = (e) => {
        if (e.length === 0){
          setPhone(e);
          setPhoneError("");
        } else if (e.length === 1){
          let reg = new RegExp('^[0-5]$');
          if (reg.test(e)){
            setPhone(e);
            setPhoneError("");
          } else {
            setPhone(phone);
            setPhoneError(langs["Please enter your phone number correctly!"][lang]);
          }
        } else if (e.length === 2) {
          if (e.substr(e.length - 1) === ' '){
            setPhone(e);
            setPhoneError("");
          } else {
            let reg = new RegExp('^[0-9]$');
            if (reg.test(e.substr(e.length - 1))){
              var txt = e.slice(0,1) + " " + e.slice(1);
              setPhone(txt);
              setPhoneError("");
            } else {
              setPhone(phone);
              setPhoneError(langs["Please enter your phone number correctly!"][lang]);
            }
          }
        } else if (e.length > 8) {
          setPhone(phone);
        } else {
          let reg = new RegExp('^[0-9]$');
          if (reg.test(e.substr(e.length - 1))){
            setPhone(e);
            setPhoneError("");
          } else {
            setPhone(phone);
            setPhoneError(langs["Please enter your phone number correctly!"][lang]);
          }
        }
      }

      const handleSubmit = () => {
        if (phone.length !== 8) {
            setPhoneError(langs["Please enter your phone number correctly!"][lang]);
        } else {
            ApiService.checkCaptcha({"answer": answer, "phone": phone}).then((res) => {
              if(res.data["answer"]){
                dispatch(setOtp(true));
                navigate('/otp');
              } else {
                setAnswerError(langs["Your answer is incorrect!"][lang]);
                setReload(!reload);
              }
            });
        }
      }
      
      useEffect(() => {
        ApiService.getCaptcha().then((res) => {
          setMyCaptcha(res.data)
        });
      }, [reload]);

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
                    <p className='mb-3'>{langs["Please provide your mobile phone number to continue. An SMS with a verification code will be sent to your address (only available to TMCELL customers)."][lang]}</p>
                    <div className='form-wrapper text-start'>
                        <Form.Label htmlFor="basic-url">{langs["Phone number"][lang]}</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="tel-addon">
                            +993 6
                            </InputGroup.Text>
                            <Form.Control
                            type="text"
                            placeholder={langs["Your phone number"][lang]}
                            value={phone}
                            onChange={(e) => handlePhoneChange(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid" style={phoneError ? { display: 'block', marginTop: '5px', color: 'red' } : {} }>
                            {phoneError}
                            </Form.Control.Feedback>
                        </InputGroup>
                        <div className='captcha-wrapper'>
                          <img src={`data:image/jpeg;base64,${myCaptcha}`} alt="captcha" />
                          <button className="app-btn reload" onClick={() => setReload(!reload)}>
                            <Icon.ArrowClockwise />
                          </button>
                        </div>
                        <Form.Label htmlFor="inputPassword5">{langs["Write the answer to the problem"][lang]}</Form.Label>
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
                        <button className='app-btn green align-self-end my-3' onClick={() => handleSubmit()}>{langs["Send"][lang]}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
