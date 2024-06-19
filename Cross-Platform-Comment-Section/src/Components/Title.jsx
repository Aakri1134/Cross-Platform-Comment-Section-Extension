import { useState, useEffect } from "react";

const Title = (props) => {
    
    let { room } = props
    const [title, setTitle] = useState(room)
    useEffect(()=>{
        setTitle(room)
    },[room])
  return (
    <div className="flex-none h-auto text-left text-wrap text-xl text-primary-100 font-bold font-sans leading-9 shadow-lg pt-3 pr-4 pl-4 pb-3 bg-gray-50 dark:bg-gray-900">
      <h1>{title}</h1>
    </div>
  );
};

export default Title;