import { useState, useEffect } from "react";

const Title = (props) => {
    
    let { room } = props
    const [title, setTitle] = useState(room)
    useEffect(()=>{
        setTitle(room)
    },[room])
  return (
    <>
      <h1>{title}</h1>
    </>
  );
};

export default Title;