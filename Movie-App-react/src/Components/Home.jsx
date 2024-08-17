import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";

const Home = () => {
  document.title = " FlixNet | HomePage";
  return (
    <>
    <Sidenav />
      <div className="w-[80%] h-screen ">
        <Topnav />
      </div>
    </>
  );
};

export default Home;
