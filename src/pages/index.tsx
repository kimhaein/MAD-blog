// Container
import HeaderContainer from "../containers/common/HeaderContainer";
import PostContainer from "../containers/post/PostContainer";
import axios from "axios";

const Index = ({ data }) => {
  return (
    <div>
      <HeaderContainer type="common" />
      <PostContainer postDatas={data} />
    </div>
  );
};

Index.getInitialProps = async function() {
  const res: any = await axios.get(
    "https://mad-server.herokuapp.com/api/post/list"
  );
  console.log(res);
  const data = res.data;

  return { data };
};

export default Index;
