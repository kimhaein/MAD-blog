import { Button } from "antd";
import "./modal.css";

interface Props {
  isOpen: boolean;
  onModal: any;
}

const LoginModal = ({ isOpen, onModal }: Props) => {
  const view = isOpen ? "" : "hidden";
  return (
    <div className={`modalWrap ${view}`} onClick={onModal}>
      <div className="modal">
        <h1>SNS로 로그인</h1>
        <ul className="loginBtn">
          <li className="kakao-login-btn" />
          <li>
            <Button
              // type="primary"
              shape="round"
              icon="google"
              size="large"
              block
            >
              Download
            </Button>
          </li>
          <li>
            <Button
              type="primary"
              shape="round"
              icon="github"
              size="large"
              block
            >
              Download
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LoginModal;
