import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/main.scss';
import './assets/css/media.scss';
import App from './App';
import Home from './pages/Home';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Verify from './pages/Verify';
import Otp from './pages/Otp';
import Voucher from './pages/Voucher';
import Post from './pages/Post';
import CategoryPosts from './pages/CategoryPosts';
import VoucherDoc from './pages/VoucherDoc';
import About from './pages/About';
import store from './store';
import { Provider } from 'react-redux';
import SearchedPosts from './pages/SearchedPosts';
import Notices from './pages/Notices';
import Notice from './pages/Notice';
import Events from './pages/Events';
import Event from './pages/Event';
import Documents from './pages/Documents';
import Images from './pages/Images';
import Videos from './pages/Videos';
import Taxi from './pages/Taxi';
import Duralga from './pages/Duralga';
import CheckVoucher from './pages/CheckVoucher';
import ScrollToTop from './components/ScrollToTop';

import TagManager from 'react-gtm-module';

const tagManagerArgs = {
  gtmId: 'GTM-MNZV4JH'
}

TagManager.initialize(tagManagerArgs)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="verify" element={<Verify />} />
          <Route path="otp" element={<Otp />} />
          <Route path="voucher" element={<Voucher />} />
          <Route path="check-voucher" element={<CheckVoucher />} />
          <Route path="voucher-doc" element={<VoucherDoc />} />
          <Route path="search" element={<SearchedPosts />} />
          <Route path="posts/cat/:id" element={<CategoryPosts />} />
          <Route path="posts/:id" element={<Post />} />
          <Route path="about" element={<About />} />
          <Route path="notices" element={<Notices />} />
          <Route path="notices/:id" element={<Notice />} />
          <Route path="events" element={<Events />} />
          <Route path="events/:id" element={<Event />} />
          <Route path="documents" element={<Documents />} />
          <Route path="images" element={<Images />} />
          <Route path="videos" element={<Videos />} />
          <Route path='taxi' element={<Taxi />} />
          <Route path='duralga' element={<Duralga />} />
          <Route path='*' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);