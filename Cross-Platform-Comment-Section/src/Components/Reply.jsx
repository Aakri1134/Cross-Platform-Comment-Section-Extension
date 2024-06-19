import { useEffect, useState } from "react";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { db, auuth } from "../App";

const Reply = (props) => {
  const { name, userId, room, isReply } = props;
  console.log("userId == ");
  console.log(userId);
  console.log(typeof userId);
  const [newMessage, setNewMessage] = useState(`@${name}  `);
  const address = isReply ? isReply : `comments/${userId}/replies`;
  const messagesRef = collection(db, address);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("New Message Uploaded");
    console.log(newMessage);
    if (newMessage === "") {
      return;
    } else {
      await addDoc(messagesRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: auuth.currentUser.displayName,
        room: room,
        replyTo: userId,
      });

      setNewMessage(`@${name}  `);
    }
  };

  return (
    // <div className="flex-none bg-orange-400 h-3">
    //     <form onSubmit={handleSubmit}>
    //         <input
    //             className="flex-1"
    //             placeholder="Comment here"
    //             onChange={(e) => {
    //                 setNewMessage(e.target.value)
    //             }}
    //             value={newMessage}
    //         />
    //         <button type="submit" className="flex-none rounded-full border-2 w-7 border-red-400 ">Post</button>
    //     </form>
    // </div>
    <div className="flex flex-col pt-3 px-3 pb-3 gap-4 bg-gray-50 dark:bg-gray-900">
      <div className="relative h-11 w-full flex flex-row gap-5 justify-center items-center">
        <img
          src={auuth.currentUser.photoURL}
          className="h-9 w-9 rounded-full"
        />
        <form onSubmit={handleSubmit} className="relative h-11 w-full flex flex-col gap-5 justify-center items-end">
            <input
            placeholder="Comment here.."
            className="peer h-full w-full border-b border-primary-950 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-primary-50 outline outline-0 transition-all placeholder-shown:border-primary-900 focus:border-primary-50 focus:outline-0 disabled:border-0 disabled:bg-primary-50"
            onChange={(e) => {
                setNewMessage(e.target.value);
            }}
            value={newMessage}
            />
            <button
            onClick={handleSubmit}
            className="text-primary-50 bg-primary-700 hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
            Reply
            </button>
        </form>
      </div>
    </div>
  );
};
export default Reply;
