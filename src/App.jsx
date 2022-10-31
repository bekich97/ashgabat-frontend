import Header from './layouts/Header';
import 'react-bootstrap';
import Footer from './layouts/Footer';
import { Outlet } from 'react-router-dom';
import CookieConsent from "react-cookie-consent";
import { langs } from './langs/langs';
import { useSelector } from 'react-redux';

function App() {
  const lang = useSelector(state => state.mainSlice.lang);
  return (
    <div className="App">
      <Header />
      <Outlet />
      <Footer />
      <CookieConsent
        location="bottom"
        buttonText="OK"
        cookieName="ashgabat_session"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px", borderRadius: '5px' }}
        expires={150}
      >
        {langs["Our site uses a technical data collection service to provide you with the best possible service. By continuing to use our site, you automatically agree to use this service."][lang]}{" "}
        {/* <a style={{textDecoration: 'none', color: "#7cb1ff"}} href={require("./assets/img/privacy.pdf")} target="_blank" rel="noreferrer">{langs["Privacy Policy"][lang]}</a> */}
      </CookieConsent>
    </div>
  );
}

export default App;
