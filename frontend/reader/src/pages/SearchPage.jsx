import "./SearchPage.scss";
import { useNavigate } from "react-router";
import { getCurrentJwtToken } from "../script/LocalStorageUtils";
import { useEffect, useState } from "react";
import Loader from "../components/main-components/Loader";
import MainSection from "../components/main-components/MainSection";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import SmalSubmitButton from "../components/main-components/SmallSubmitButton";
import { IoSearch } from "react-icons/io5";
import MainContainer from "../components/main-components/MainContainer";
import SearchInput from "../components/search/SearchInput";
import SearchOutput from "../components/search/SearchOutput";
import Footer from "../components/main-components/Footer";

const SearchPage = () => {
  const navigate = useNavigate();
  const token = getCurrentJwtToken();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setError("User is not authenticated");
      setLoading(false);
      navigate("welcome");
      return;
    }
  }, [navigate, token]);
  return (
    <MainSection>
      <TopNavigationBar icon={<IoSearch />} name={`Search`} />
      <MainContainer>
        <div className="search__wrapper">
          <SearchInput />
          <SearchOutput />
        </div>
      </MainContainer>
      <Footer />

    </MainSection>
  );
};

export default SearchPage;
