import React from "react";
import { useState } from "react";
import { langs } from "../langs/langs";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { setNextpath } from "../stores/mainSlice";
import Form from 'react-bootstrap/Form';
import Modal from 'react-modal';
import * as Icon from 'react-bootstrap-icons';
import ApiService from "../services/ApiService";

Modal.setAppElement('#root');

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '90%'
    },
  };

export default function CheckVoucher() {
  const [code, setCode] = useState('');
  const [resp, setResp] = useState({});
  const dispatch = useDispatch();
  dispatch(setNextpath('check'));
  const [modalIsOpen, setIsOpen] = useState(false);
  const lang = useSelector((state) => state.mainSlice.lang);
  document.title = langs["Application"][lang] + " - " + langs["Ashgabat city municipality"][lang];

  const handleSubmit = () => {
    ApiService.checkCode({"code": code}).then((res) => {
        setIsOpen(true);
        setResp(res.data);
        console.log(res.data)
    });
  };

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="verify-page page-wrapper container shadowly-border">
      <div className="page-title-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <span>{langs["Home"][lang]} / {langs["Electronic Application"][lang]}</span>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="d-flex justify-content-between">
            <h4 style={{marginRight: "50px"}}>{langs["Voucher status"][lang]}</h4>
            <button onClick={closeModal} className="clear-btn font-weight-bold"><Icon.XLg /></button>
        </div>
        {
            resp["success"] ? 
            (
              resp["status_en"] === 'Pending' || resp["status_en"] === '-' ? 
              <h6 className="my-5 text-center">{langs["Pending"][lang]}</h6> 
              : 
              <dl className="my-5">
                <dt>{langs["Status"][lang]}</dt>
                <dd>{lang === 'en' ? resp["status_en"] : lang === 'ru' ? resp["status_ru"] : resp["status_tm"]}</dd>
                <dt>{langs["Note"][lang]}</dt>
                <dd>{resp["note"] ? resp["note"] : "-"}</dd>
              </dl>
            ) 
            : 
            <h6 className="my-5 text-center">{langs["No search found!"][lang]}</h6>
        }
      </Modal>
      <div className='container my-5'>
            <div className='row justify-content-center'>
                <div className='col-md-6 col-sm-12 text-center py-2'>
                    <h4 className='mb-2 py-2'>{langs["Check the status of the filter"][lang]}</h4>
                    <div className='form-wrapper text-start'>
                        <Form.Label htmlFor="inputPassword5">{langs["Enter your tracking number!"][lang]}</Form.Label>
                        <Form.Control
                            type="text"
                            id="inputPassword5"
                            aria-describedby="passwordHelpBlock"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                        <button className='app-btn green align-self-end my-3' onClick={() => handleSubmit()}>{langs["Send"][lang]}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
