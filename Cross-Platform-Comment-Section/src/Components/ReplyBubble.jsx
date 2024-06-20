import { useState } from "react";
import Reply from "./Reply";
import defaultPhoto from "../assets/image.png";

const ReplyBubble = (props) => {
  const { comment, address, room } = props;
  const [isReplying, setIsReplying] = useState(false);
  return (
    <div className=" pr-2 pl-2 pb-1 flex flex-col gap-2" key={comment.id}>
      <div className="flex gap-3">
        <img
          src={comment.photoURL ? comment.photoURL : defaultPhoto}
          className="w-8 h-8 rounded-full"
        />
        <p className="font-bold text-wrap text-primary-50 pt-2 pr-1 ">
          {comment.user + " : "}
        </p>
      </div>

      <p className="text-wrap pl-2 pb-1 pr-1 leading-4 font-semibold text-primary-50">
        {comment.text}
      </p>
      {isReplying ? (
        <>
          <button
            className="text-gray-500 font-bold self-start"
            onClick={() => {
              setIsReplying(false);
            }}
          >
            HIDE
          </button>
          <Reply
            name={comment.user}
            userId={comment.id}
            room={room}
            isReply={address}
            setIsReplying = {setIsReplying}
          />
        </>
      ) : (
        <button
          className="text-gray-500 font-bold self-start"
          onClick={() => {
            setIsReplying(true);
          }}
        >
          REPLY
        </button>
      )}
    </div>
  );
};

export default ReplyBubble;
