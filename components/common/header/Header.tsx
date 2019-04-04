import Link from "next/link";
import "./header.css";
import { Button } from "antd";

const Header = () => {
  return (
    <div className="red">
      <Link href="/write">
        <Button>Write3</Button>
      </Link>
    </div>
  );
};

export default Header;
