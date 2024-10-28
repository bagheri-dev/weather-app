import Header from "../components/header";
import MapComponent from "../components/map";
import SearchBox from "../components/SearchBox";

const HomePage = () => {
  return (
    <>
      <div className="py-5">
        <Header />
        <SearchBox />
        <MapComponent />
      </div>
    </>
  );
};

export default HomePage;
