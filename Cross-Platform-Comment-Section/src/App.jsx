import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button className="text-3xl text-green-500 border-4 border-green-400">sign in with google</button>
    </>
  );
}

export default App;
