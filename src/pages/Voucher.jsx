import React from "react";
import Form from "react-bootstrap/Form";
import * as Icon from "react-bootstrap-icons";
import Alert from "react-bootstrap/Alert";
import { InputGroup } from "react-bootstrap";
import LetterService from "../services/LetterService";
import { useState, useEffect } from "react";
import { langs } from "../langs/langs";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import ApiService from "../services/ApiService";
import { setNextpath, setVerified } from "../stores/mainSlice";
import { Helmet } from "react-helmet";

export default function Voucher() {
  const verified = useSelector((state) => state.mainSlice.verified);
  const dispatch = useDispatch();
  dispatch(setNextpath('voucher'));
  const navigate = useNavigate();
  useEffect(() => {
    if (!verified) {
      navigate('/verify');
    }
  }, [verified, navigate]);

  const [regions, setRegions] = useState([]);
  const [reasons, setReasons] = useState([]);
  // Form fields
  const [reason, setReason] = useState(0);
  const [region, setRegion] = useState(0);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [pass, setPass] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState('');
  const [formValid, setFormValid] = useState(true);
  const [responseSuccess, setResponseSuccess] = useState(false);
  const lang = useSelector((state) => state.mainSlice.lang);
  const [alert, setAlert] = useState("");
  // document.title = langs["Application"][lang] + " - " + langs["Ashgabat city municipality"][lang];
  const btn = React.useRef();

  const handleUpload = () => {
    btn.current.click();
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    LetterService.getRegions().then((res) => {
      setRegions(res.data);
    });
    LetterService.getReasons().then((res) => {
      setReasons(res.data);
    });
    ApiService.getPhone().then((res) => {
      if(res.data["phone"]){
        setPhone(res.data["phone"]);
      } else {
        navigate('/verify')
      }
    });
  }, [navigate]);

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
    const formData = new FormData();
    if (reason) {
      formData.append("reason", reason);
    } else {
      setAlert("Sebäbiňizi saýlaň!");
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      return;
    }
    if (region){
      formData.append("region", region);
    } else {
      setAlert("Etrabyňyzy saýlaň!");
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      return;
    }
    if (name) {
      formData.append("name", name);
    } else {
      setAlert("Adyňyzy ýazyň!");
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      return;
    }
    if (surname) {
      formData.append("surname", surname);
    } else {
      setAlert("Familiýaňyzy ýazyň!");
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      return;
    }
    formData.append("patronymic", patronymic);
    if(pass) {
      formData.append("pass_number", pass);
    } else {
      setAlert("Passport belgiňizi ýazyň!");
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      return;
    }
    if (phone && /[0-5] \d{6}/.test(phone)) {
      let tel = ''
      tel = phone.replace(" ", "");
      tel = "+9936" + tel
      formData.append("phone", tel);
    } else {
      setAlert("Telefon belgiňizi dogry ýazyň!");
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      return;
    }
    if (email && validator.isEmail(email)) {
      formData.append("email", email);
    } else {
      setAlert("E-poçtaňyzy dogry ýazyň!");
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      return;
    }
    if (address) {
      formData.append("address", address);
    } else {
      setAlert("Salgyňyzy ýazyň!");
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      return;
    }
    if (message) {
      formData.append("message", message);
    } else {
      setAlert("Hatyňyzy ýazyň!");
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      return;
    }
    if (file){
      formData.append("file", file);
    } else {
      formData.append("file", '');
    }
    LetterService.createLetter(formData).then((res) => {
      console.log(res);
      if (res.data.status === "success") {
        setFormValid(true);
        setResponseSuccess(true);
        setAlert("");
        dispatch(setVerified(false));
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      } else if (res.data.status === "failed") {
        setFormValid(false);
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }
    });
  };

  return (
    <div className="verify-page page-wrapper container shadowly-border">
      <Helmet>
            <meta charSet="utf-8" />
            <title>{langs["Application"][lang] + " - " + langs["Ashgabat city municipality"][lang]}</title>
            <meta name="description" content={langs["Ashgabat city municipality"][lang]} />
            <link rel="canonical" href={window.location.href} />
        </Helmet>
      <div className="page-title-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <span>{langs["Home"][lang]} / {langs["Electronic Application"][lang]}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="voucher-form-wrapper pb-2">
        <div className="container py-3">
          <div className="row">
            <div className="col-12">
              <h2 className="mb-3">{langs["Electronic Application"][lang]}</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {formValid ? (
                responseSuccess ? (
                  <Alert variant="success">{langs["Voucher sent successfully!"][lang]}</Alert>
                ) : (
                  ""
                )
              ) : (
                <Alert variant="danger">
                  {langs["Something is wrong! All fields are required!"][lang]}
                </Alert>
              )}
              {
                alert ? <Alert variant="danger">
                          {alert}
                        </Alert> : ""
              }
            </div>
          </div>
          {responseSuccess ? (
            ""
          ) : (
            <div className="row">
              <div className="col-md-6 col-sm-12 position-relative required-wrapper select">
                <Form.Select

                  aria-label=""
                  onChange={(e) => setReason(e.target.value)}
                >
                  <option value="0">{langs["Reason for application"][lang]}</option>
                  {reasons.map((reason) => {
                    return (
                      <option key={reason.id} value={reason.id}>
                        {lang === 'en' ? reason.title_en : lang === 'ru' ? reason.title_ru : reason.title_tm}
                      </option>
                    );
                  })}
                </Form.Select>
                {/* <span>*</span> */}
              </div>
              <div className="col-md-6 col-sm-12 position-relative required-wrapper select">
                <Form.Select
                  aria-label=""
                  onChange={(e) => setRegion(e.target.value)}
                >
                  <option value="0">{langs["Select district"][lang]}</option>
                  {regions.map((region) => {
                    return (
                      <option key={region.id} value={region.id}>
                        {lang === 'en' ? region.title_en : lang === 'ru' ? region.title_ru : region.title_tm}
                      </option>
                    );
                  })}
                </Form.Select>
              </div>
              <div className="col-md-4 col-sm-12 position-relative required-wrapper">
                <Form.Control
                  type="text"
                  placeholder={langs["Your name"][lang]}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-md-4 col-sm-12 position-relative required-wrapper">
                <Form.Control
                  type="text"
                  placeholder={langs["Your surname"][lang]}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </div>
              <div className="col-md-4 col-sm-12">
                <Form.Control
                  type="text"
                  placeholder={langs["Patronymic"][lang]}
                  onChange={(e) => setPatronymic(e.target.value)}
                />
              </div>
              <div className="col-md-4 col-sm-12 position-relative required-wrapper">
                <Form.Control
                  type="text"
                  placeholder={langs["Passport"][lang]}
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
              <div className="col-md-4 col-sm-12 position-relative required-wrapper">
              <InputGroup className="">
                <InputGroup.Text id="tel-addon" style={{margin: '15px 0'}}>
                  +993 6
                </InputGroup.Text>
                <Form.Control
                  disabled={true}
                  type="text"
                  placeholder={langs["Your phone number"][lang]}
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                />
                <Form.Control.Feedback type="invalid" style={phoneError ? { display: 'block', marginTop: '-14px' } : {} }>
                  {phoneError}
                </Form.Control.Feedback>
                </InputGroup>
              </div>
              <div className="col-md-4 col-sm-12 position-relative required-wrapper">
                <Form.Control
                  type="email"
                  placeholder={langs["Your email address"][lang]}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="col-12 position-relative required-wrapper">
                <Form.Control
                  type="text"
                  placeholder={langs["Your address"][lang]}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="col-12 position-relative required-wrapper">
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder={langs["Your message"][lang]}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div className="col-md-6 col-sm-12 upload-file-wrapper">
                <p className="mb-2">
                  {langs["Attach files if you have them"][lang]} (doc, docx, jpg, pdf, rtf,
                  txt, odt, zip, rar, png, tiff, jpeg, mp4, avi, mov, mp3, wav)
                </p>
                <button
                  className="app-btn white"
                  onClick={() => handleUpload()}
                >
                  <Icon.Upload /> {langs["Choose document"][lang]}
                </button>
                <Form.Control
                  type="file"
                  id="file-btn"
                  ref={(node) => (btn.current = node)}
                  onChange={selectFile}
                />
              </div>
              <div className="col-md-6 col-sm-12 d-flex justify-content-end align-items-end">
                <button
                  className="app-btn green"
                  onClick={() => handleSubmit()}
                >
                  {langs["Send"][lang]}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
