import { useState } from "react"
import Reply from "./Reply"
import ViewReply from "./ViewReply"
import defaultPhoto from "../assets/image.png"

const Comment = (props) => {
    const { comment, room } = props 
    const [isReplying, setIsReplying] = useState(false)
    const [isViewing, setIsViewing] = useState(false)


    return(
        <div className="pr-5 pl-5 pb-5 flex flex-col border-white border-b mb-5 gap-2" key={comment.id}>
            <img src={comment.photoURL ? comment.photoURL : defaultPhoto} className="w-9 h-9 rounded-full" />
            <p className="text-wrap text-base text-primary-50 font-medium">{comment.user + " : "}</p>
            <p className="text-wrap pl-2 pb-1 pr-1 leading-4 font-light text-primary-50 text-sm">{comment.text}</p>
            <div className="flex flex-row gap-3 w-full">
            {isReplying || isViewing? <button className="text-primary-500" onClick={() => {setIsReplying(false);setIsViewing(false)}}>Hide Replies</button> : <></>}
            {!isReplying? <><button className="text-gray-500 font-bold" onClick={() => {setIsReplying(true);setIsViewing(true)} }>REPLY</button></>:<></>}
            {!isViewing? <button className="text-primary-500" onClick={() => {setIsViewing(true)}}>View Replies</button>:<></>}
            </div>
            {isReplying? <><Reply name = {comment.user} userId = {comment.id} room = {room} isReply = {false} setIsReplying = {setIsReplying}/></>:<></>}
            {isViewing? <><ViewReply comment = {comment} room = {room}/></>:<></>}
        </div>
    )
}



export default Comment