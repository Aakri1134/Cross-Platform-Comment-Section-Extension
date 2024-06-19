import { useState } from "react"
import Reply from "./Reply"
const ReplyBubble = (props) => {
    const {comment, address, room} = props
    const [isReplying, setIsReplying] = useState(false)
    return (
        <div className=" border-b-2 border-sky-300/[.55] hover:shadow-md pr-2 pl-2 pb-1 " key={comment.id}>
            <p className="font-mono font-bold text-wrap text-slate-900 pt-2 pl-1 pr-1 ">{comment.user + ": "}</p>
            <p className="text-wrap pl-2 pb-1 pr-1 leading-4 font-semibold text-gray-500">{comment.text}</p>
            {isReplying ? <><button onClick={()=>{setIsReplying(false)}}>Hide</button><Reply name = {comment.user} userId = {comment.id} room = {room} isReply ={address}/></>: <button onClick={() => {setIsReplying(true)}}>Reply</button>}
        </div>
    )

}

export default ReplyBubble