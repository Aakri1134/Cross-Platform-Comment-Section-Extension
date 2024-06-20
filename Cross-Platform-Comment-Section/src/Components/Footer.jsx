import Refresh from "./Refresh";
import SignOut from "./SignOut";

function Footer(){

    return(
        <div className="flex flex-row justify-between px-4 py-4 border-t border-white">
            <SignOut/>
            <Refresh/>
        </div>
    )
}

export default Footer;