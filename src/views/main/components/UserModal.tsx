import "@/views/main/style/user-modal.sass";
import Modal from "@/views/components/modal";
import test from "@/assets/imgs/common/test.png";

interface UserModalProps {
  onCloseModal: () => void;
}

const UserModal = ({
  onCloseModal,
}: UserModalProps) => {
  return (
    <Modal onCloseModal={onCloseModal}>
      <div className="modal-wrap">
        <div className="info-wrap">
          <div className="user-img">
            <img src={test} alt="" />
          </div>
          <div className="user-name">모아바</div>
          <div className="user-email">gusrns48@kw.ac.kr</div>
        </div>
        <ul className="edit-wrap">
          {/* <li className="mode-wrap"></li> */}
          <li className="log-out">로그아웃</li>
          <li className="pwd-edit">비밀번호 변경</li>
        </ul>
        <button className="remove">계정 삭제</button>
        <p>개인 정보 처리 방침・이용약관</p>
      </div>
    </Modal>
  );
};

export default UserModal;
