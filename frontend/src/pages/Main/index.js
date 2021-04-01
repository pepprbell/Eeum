import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './index.module.css';
import Imgbox from '../../components/Image/Imgbox';
import EeumButtonComp from '../../components/ButtonComp/EeumButtonComp';
import MainFooterButtonComp from '../../components/ButtonComp/MainFooterButtonComp';
import { useCookies } from 'react-cookie';
const Main = () => {
  const history = useHistory();
  const [checkLogin, setCheckLogin] = useState(sessionStorage.getItem('jwt'));
  const [cookies, removeCookie] = useCookies(['cookie']);
  const handleInClick = (e) => {
    history.push('./login');
  };
  const handleOutClick = (e) => {
    sessionStorage.removeItem('jwt');
    removeCookie('cookie');
    alert('로그아웃 완료');
    history.push('./');
  };

  useEffect(() => {
    if (sessionStorage.getItem('jwt') === null && cookies.cookie !== undefined) {
      sessionStorage.setItem('jwt', cookies.cookie);
      setCheckLogin(sessionStorage.getItem('jwt'));
    }
  }, [checkLogin]);

  const noLogin = () => {
    alert('로그인 해주세요');
    history.push('./login');
  };

  return (
    <div className={styles.mainbox}>
      <div className={styles.main_login_box}>
        {(cookies.cookie === 'undefined' || cookies.cookie === undefined) &&
        sessionStorage.getItem('jwt') === null ? (
          <button className={styles.login_button} onClick={handleInClick}>
            로그인
          </button>
        ) : (
          <button className={styles.logout_button} onClick={handleOutClick}>
            로그아웃
          </button>
        )}
      </div>

      <Imgbox src="/images/mainLogo.svg" />

      <div className={styles.eeum_button_box}>
        <EeumButtonComp
          textValue="나만의 이음"
          buttonImg="/images/user.png"
          handleClickPath="/OwnEeum"
        ></EeumButtonComp>
        <EeumButtonComp
          textValue="상황별 이음"
          buttonImg="/images/folder.png"
          handleClickPath="/category"
        ></EeumButtonComp>
        {checkLogin !== null ? (
          <EeumButtonComp
            textValue="QR로 이동"
            buttonImg="/images/qr.png"
            handleClickPath="/qr"
          ></EeumButtonComp>
        ) : (
          <EeumButtonComp
            textValue="QR로 이동"
            buttonImg="/images/qr.png"
            handleClickPath="/login"
          ></EeumButtonComp>
        )}
      </div>

      <div className={styles.footer_button_box}>
        <MainFooterButtonComp
          textValue="도움말"
          buttonImg="/images/information.png"
          handleClickPath="/help"
        ></MainFooterButtonComp>
        <MainFooterButtonComp
          textValue="설정"
          buttonImg="/images/setting.png"
          handleClickPath="/setting"
        ></MainFooterButtonComp>
        {checkLogin !== null ? (
          <>
            <MainFooterButtonComp
              textValue="내정보"
              buttonImg="/images/fish.png"
              handleClickPath="/mypage"
            ></MainFooterButtonComp>
          </>
        ) : (
          <>
            <MainFooterButtonComp
              textValue="내정보"
              buttonImg="/images/fish.png"
              handleClickPath="/login"
            ></MainFooterButtonComp>
          </>
        )}
      </div>
    </div>
  );
};

export default Main;
