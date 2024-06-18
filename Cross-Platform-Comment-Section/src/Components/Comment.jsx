import { useState } from "react"
import Reply from "./Reply"
import ViewReply from "./ViewReply"

const Comment = (props) => {
    const { comment, room } = props 
    console.log("comment")
    console.log(comment)
    console.log(comment.id)
    const [isReplying, setIsReplying] = useState(false)
    const [isViewing, setIsViewing] = useState(false)

    return(
        <div className=" border-b-2 border-sky-300/[.55] hover:shadow-md pr-2 pl-2 pb-1 " key={comment.id}>
            <p>{comment.id}</p>
            <p className="font-mono font-bold text-wrap text-slate-900 pt-2 pl-1 pr-1 ">{comment.user + ": "}</p>
            <p className="text-wrap pl-2 pb-1 pr-1 leading-4 font-semibold text-gray-500">{comment.text}</p>
            <button className=" bg-slate-200" onClick={() => {setIsReplying(true)} }>Reply</button>
            {isReplying? <Reply name = {comment.user} userId = {comment.id} room = {room} isReply = {false} /> : <></>}
            <button className=" " onClick={() => {setIsViewing(true)}}>View Replies</button>
            {isViewing? <><ViewReply comment = {comment} room = {room}/><button className=" " onClick={() => {setIsViewing(false)}}>Hide Replies</button></>: <></>}
        </div>
    )
}



export default Comment