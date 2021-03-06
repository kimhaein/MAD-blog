import Link from 'next/link';
import { Drawer, Avatar } from 'antd';
import './menu.css';

interface Props {
  isLogin: boolean;
  isMenu: boolean;
  userName: string;
  userImg: string;
  onMenu(): void;
}

const Menu: React.FC<Props> = props => {
  return (
    <Drawer placement={'left'} closable={true} onClose={props.onMenu} visible={props.isMenu}>
      {props.userName ? (
        <div className='userInfo'>
          <Avatar src={props.userImg} size={150} style={{ backgroundColor: '#000' }}>
            {props.userName.substring(0, 1).toUpperCase()}
          </Avatar>
          <p>{props.userName}</p>
        </div>
      ) : (
        <div className='userInfo'>
          <Avatar size={150} style={{ backgroundColor: '#000' }}>
            MAD
          </Avatar>
          <p>MAD BLOG</p>
        </div>
      )}
      <ul className='menuList'>
        <li>
          <Link href='/trend'>
            <span>트렌딩 차트</span>
          </Link>
        </li>
        {props.isLogin ? (
          <li>
            <Link href='/mypage'>
              <span>마이페이지</span>
            </Link>
          </li>
        ) : null}
      </ul>
      <div className='menuFooter'>
        {/* <div className="catImg" />
        <Link href="/readme">
          <h3>프로젝트 소개</h3>
        </Link> */}
        <div className='gitHub'>
          <p>GitHub</p>
          <ul>
            <li>
              <Link href='https://github.com/ellapresso'>황윤지 /</Link>
            </li>
            <li>
              <Link href='https://github.com/kimhaein'>김혜인 /</Link>
            </li>
            <li>
              <Link href='https://github.com/yusop795'>유윤선</Link>
            </li>
          </ul>
        </div>
      </div>
    </Drawer>
  );
};

export default Menu;
