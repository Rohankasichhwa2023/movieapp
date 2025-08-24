import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav style={{ display: "flex", gap: "20px" }}>
            <Link to="/popular" >Popular</Link>
            <Link to="/nowplaying" >Now Playing</Link>
            <Link to="/toprated" >Top Rated</Link>
            <Link to="/upcoming" >Upcoming</Link>
        </nav>
    );

}

export default Navbar;