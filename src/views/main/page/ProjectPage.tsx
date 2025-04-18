// style
import "@/views/main/style/project.sass";
import arrowUp from "@/assets/imgs/icon/arrow_up_black.svg";
import arrowDown from "@/assets/imgs/icon/arrow_down_black.svg";
import test from "@/assets/imgs/common/test.png";

// api
import { getProject } from "@/api/main/project";

// component
import SideBar from "@/views/main/components/SideBar";
import DwnModal from "@/views/main/components/DwnModal";
import ShareModal from "@/views/main/components/ShareModal";

// import
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

// type
import { projectData } from "@/types/projectData";

const ProjectPage = () => {
  // value
  const [tab, setTab] = useState<string>("all");
  const [order, setOrder] = useState<string>("created");
  const [showOrder, setShowOrder] = useState<boolean>(false);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [projectList, setProjectList] = useState<Array<projectData>>();
  const menuRef = useRef<HTMLUListElement | null>(null);
  const orderRef = useRef<HTMLDivElement | null>(null);

  // modal
  type ModalType = "dwn" | "share" | null;
  const [modalType, setModalType] = useState<ModalType>(null);
  const closeModal = () => setModalType(null);

  // function
  const toggleMenu = (id: number) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const getProjectList = () => {
    let params = {
      sort: order,
      filterType: tab,
    };
    getProject(params).then((res: any) => {
      setProjectList(res.data.data);
    });
  };

  useEffect(() => {
    getProjectList();

    const menuClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };

    const orderClickOutside = (e: MouseEvent) => {
      if (orderRef.current && !orderRef.current.contains(e.target as Node)) {
        setShowOrder(false);
      }
    };

    document.addEventListener("mousedown", menuClickOutside);
    () => document.removeEventListener("mousedown", menuClickOutside);

    document.addEventListener("mousedown", orderClickOutside);
    () => document.removeEventListener("mousedown", orderClickOutside);
  }, [order, tab]);

  return (
    <div className="main">
      <SideBar />
      <div className="project-wrap">
        <div className="nevigation-wrap">
          <div className="title-wrap">
            <h2 className="title-wrap-h2">전체 회의</h2>
            <div className="search-wrap">
              <input
                type="text"
                placeholder="회의명 검색"
                className="search-input"
              />
              <Link to="/meeting">새로 만들기</Link>
            </div>
          </div>
          <div className="sort-wrap">
            <div className="tab-wrap">
              <ul className="tab-ul">
                <li
                  className={tab === "all" ? "tab-li active" : "tab-li"}
                  onClick={() => setTab("all")}
                >
                  전체
                </li>
                <li
                  className={tab === "my" ? "tab-li active" : "tab-li"}
                  onClick={() => setTab("my")}
                >
                  내 회의
                </li>
                <li
                  className={tab === "invited" ? "tab-li active" : "tab-li"}
                  onClick={() => setTab("invited")}
                >
                  초대된 회의
                </li>
              </ul>
            </div>
            <div className="order-wrap" ref={orderRef}>
              <button
                onClick={() => setShowOrder(!showOrder)}
                className="order-button"
              >
                {order === "created" ? "최신순" : "오래된 순"}
                <img
                  src={showOrder ? arrowUp : arrowDown}
                  className="order-img"
                />
              </button>
              {showOrder && (
                <ul className="order-ul">
                  <li
                    onClick={() => {
                      setOrder("created");
                      setShowOrder(false);
                    }}
                    className="order-li"
                  >
                    최신순
                  </li>
                  <li
                    onClick={() => {
                      setOrder("latest");
                      setShowOrder(false);
                    }}
                    className="order-li"
                  >
                    오래된 순
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="card-wrap">
          {projectList &&
            projectList.map((list: projectData, i: number) => (
              <div className="card" key={i}>
                <img src={list.imageUrl} alt="" className="card-img" />
                <button
                  className={`menu-btn ${openMenuId === i && "open"}`}
                  onClick={() => toggleMenu(i)}
                ></button>
                {openMenuId === i && (
                  <ul className="menu-wrap" ref={menuRef}>
                    <li className="edit">이름 변경하기</li>
                    <li
                      className="dwn"
                      onClick={() => {
                        setModalType("dwn");
                        setOpenMenuId(null);
                      }}
                    >
                      다운로드하기
                    </li>
                    <li
                      className="share"
                      onClick={() => {
                        setModalType("share");
                        setOpenMenuId(null);
                      }}
                    >
                      공유하기
                    </li>
                    <li className="del">삭제하기</li>
                  </ul>
                )}
                <div className="info-wrap">
                  <div className="title-wrap">
                    <div className="title">{list.projectName}</div>
                    <div className="date">
                      {new Date(list.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="owner-wrap">
                    <div className="owner">
                      <img src={test} className="owner-img" />
                      {list.creator}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {modalType === "dwn" && (
        <div
          className="modal-container"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <DwnModal onCloseModal={closeModal} />
        </div>
      )}
      {modalType === "share" && (
        <div
          className="modal-container"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <ShareModal onCloseModal={closeModal} />
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
