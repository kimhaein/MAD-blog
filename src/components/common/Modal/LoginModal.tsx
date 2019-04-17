import { Button } from "antd";
import "./modal.css";

interface Props {
  isOpen: boolean;
  onModal: any;
}

const LoginModal = ({ isOpen, onModal }: Props) => {
  const view = isOpen ? "" : "hidden";
  return (
    <div className={`modalWrap ${view}`}>
      <div className="modal">
        <h1>
          SNS로 로그인
          <span className="modalClose" onClick={onModal}>
            닫기
          </span>
        </h1>
        <div className="loginBtn">
          <div className="kakao-login-btn" />
          <div> 구글 로그인</div>
          <div> 깃허브 로그인</div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
