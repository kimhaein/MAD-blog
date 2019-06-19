import Router from "next/router";
import { Modal, Icon } from "antd";
const confirm = Modal.confirm;
import "./header.css";

// confirm
const showConfirm = (content: string, onOk: () => void) => {
  confirm({
    title: "mad-blog",
    content: content,
    onOk() {
      onOk();
    }
  });
};

// 뒤로가기
const BackBtn = () => {
  const historyBack = () => {
    Router.replace("/");
  };
  return (
    <div
      className="backBtn"
      onClick={() => {
        showConfirm(
          "작성중이던 포스트가 있습니다. 정말로 나가시겠습니까?",
          historyBack
        );
      }}
    >
      <Icon type="left" style={{ fontSize: "32px" }} />
    </div>
  );
};

interface TitleInput {
  value: string;
  setTitle: (value: string) => {};
}
// title 작성
const TitleInput = ({ value, setTitle }: TitleInput) => {
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setTitle(target.value);
  };

  return (
    <div className="title">
      <input
        placeholder="제목을 입력해주세요"
        value={value}
        onChange={onChangeTitle}
      />
    </div>
  );
};

interface PostBtn {
  onSubmitPost: () => {};
}

// 글 등록
const PostBtn = ({ onSubmitPost }: PostBtn) => {
  return (
    <div
      className="postBtn"
      onClick={() => {
        showConfirm("글을 등록하시겠습니까?", () => {
          onSubmitPost();
        });
      }}
    >
      Post
    </div>
  );
};

interface EditBtn {
  onEdit: () => {};
}

// 글 수정
const EditBtn = ({ onEdit }: EditBtn) => {
  return (
    <div
      className="postBtn"
      onClick={() => {
        showConfirm("글을 수정하시겠습니까?", () => {
          onEdit();
        });
      }}
    >
      Edit
    </div>
  );
};

interface Props {
  title: string;
  isEdit: Boolean;
  setTitle(): void;
  onEdit(): void;
  onSubmitPost(): void;
}

const PostHeader: React.FC<Props> = (props: any) => {
  return (
    <header className="postHeader">
      <BackBtn />
      <TitleInput value={props.title} setTitle={props.setTitle} />
      {props.isEdit ? (
        <EditBtn onEdit={props.onEdit} />
      ) : (
        <PostBtn onSubmitPost={props.onSubmitPost} />
      )}
    </header>
  );
};

export default PostHeader;
