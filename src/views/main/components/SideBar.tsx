// style
import "@/views/main/style/side-bar.sass";
import logo from "@/assets/imgs/common/logo.svg";
import test from "@/assets/imgs/common/test.png";

// component
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import UserModal from "@/views/main/components/UserModal";


const SideBar = () => {
  const [sort, setSort] = useState<string>("/");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  type ModalType = "user" | null;
  const [modalType, setModalType] = useState<ModalType>(null);
  const closeModal = () => setModalType(null);

  useEffect(() => {
    if (pathname === "/" || pathname === "/project") {
      setSort("/project");
    } else if (pathname === "/record") {
      setSort("/record");
    } else {
      setSort("/summary");
    }
  }, [pathname]);

  return (
    <>
      <div className="side-wrap">
        <div className="top-wrap">
          <Link to="/" className="logo-wrap">
            <img src={logo} alt="LOGO" />
          </Link>
          <button className="new"></button>
        </div>
        <div className="user-wrap">
          <div className="user" onClick={() => setModalType('user')}>
            <img src={test} className="user-profile-img" alt="" />
            <div className="info-wrap">
              <div className="name">모아바</div>
              <div className="email">baek789@naver.com</div>
            </div>
          </div>
        </div>
        <div className="list-wrap">
          <ul>
            <li
              className={`list-li project ${sort === "/project" ? "active" : ""}`}
              onClick={() => navigate("/project")}
            >
              전체 회의
            </li>
            <li
              className={`list-li record ${sort === "/record" ? "active" : ""}`}
              onClick={() => navigate("/record")}
            >
              음성・스크립트
            </li>
            <li
              className={`list-li summary ${sort === "/summary" ? "active" : ""}`}
              onClick={() => navigate("/summary")}
            >
              <span>요약본</span>
            </li>
          </ul>
        </div>
        <div className="time-wrap">
          <p className="time-wrap-p">남은 시간</p>
          <div className="time">
            <b className="time-b">520분 남음</b> / 600분
          </div>
          <div className="bar">
            <div className="status"></div>
          </div>
          <div className="remainder">다음 충전일까지 25일 남음</div>
        </div>
      </div>
      {modalType === "user" && (
        <div
          className="modal-container"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <UserModal
            onCloseModal={closeModal}
          />
        </div>
      )}
    </>
  );
};

export default SideBar;
