import { useAuthState } from "react-firebase-hooks/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import CommentSection from "./Components/CommentSection";
import SignIn from "./Components/SignIn";
import { firebaseConfig } from "./constants/credentials";

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);

function App() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    return (
      <CommentSection/>
    );
  }
  return <SignIn/>;
}

export default App;
