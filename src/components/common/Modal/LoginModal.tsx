import { Icon } from "antd";
import "./modal.css";
interface Props {
  isModal: boolean;
  onModal(): void;
  onLogin(): void;
}

const LoginModal: React.FC<Props> = ({ isModal, onModal, onLogin }) => {
  return (
    <div className={`modalWrap ${isModal ? "" : "hidden"}`}>
      <div className="modal">
        <div className="modalHeader">
          <h2>
            지금 mad-blog를 시작해보세요 :-)
            <span className="modalClose" onClick={onModal}>
              <Icon type="close" />
            </span>
          </h2>
        </div>
        <div className="modalBody">
          <div className="loginBtn">
            <div onClick={onLogin}> 카카오로그인</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
