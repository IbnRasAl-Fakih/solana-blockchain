import { FC, ReactNode, useState } from "react";
import { Button } from "src/components/Button";
import { useBlog } from "src/context/Blog";

export const UserForm = (props) => {
  const { user } = useBlog();
  const {
    onSubmit,
    name,
    avatar,
    setName,
    setAvatar,
    formHeader,
    buttonText = "Create",
  } = props;
  const [loading, setLoading] = useState(false);

  return (
    <div className="rounded-lg py-4 px-6 bg- flex flex-col ">
      {formHeader}
      
        <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Name "
        className="bg-white rounded-3xl h-10 px-4 black mt-5"
      />
      <input
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        type="text"
        placeholder="Image"
        className="bg-white rounded-3xl h-10 px-4 black mt-4"
      />
      <Button
        className="mt-3"
        disabled={false}
        loading={loading}
        onClick={async () => {
          setLoading(true);
          await onSubmit();
          setLoading(false);
        }}
      >
        {buttonText}
      </Button>
    </div>
  );
};
