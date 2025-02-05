import "./SearchPage.scss";
import { useNavigate } from "react-router";
import { getCurrentJwtToken } from "../script/LocalStorageUtils";
import { useEffect, useState } from "react";
import Loader from "../components/main-components/Loader";
import MainSection from "../components/main-components/MainSection";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import { IoSearch } from "react-icons/io5";
import MainContainer from "../components/main-components/MainContainer";
import SearchInput from "../components/search/SearchInput";
import SearchOutput from "../components/search/SearchOutput";
import Footer from "../components/main-components/Footer";
import { serverURL } from "../script/server";

const SearchPage = () => {
  const navigate = useNavigate();
  const token = getCurrentJwtToken();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(null);
  const [search, setSearch] = useState(false);
  const [foundChannels, setFoundChannels] = useState(null);
  const [foundStatus, setFoundStatus] = useState(null);
  useEffect(() => {
    const searchChannels = async () => {
      if (!token) {
        setError("User is not authenticated");
        setLoading(false);
        navigate("welcome");
        return;
      }
      if (query && search) {
        try {
          setLoading(true);
          const response = await fetch(
            `${serverURL}/api/v1/channels/search?query=${query}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const fetchedChannels = await response.json();
          fetchedChannels && fetchedChannels.length !== 0
            ? console.log("Channel found: ", fetchedChannels)
            : console.log("No channel was found :(");
          fetchedChannels && fetchedChannels.length !== 0
            ? setFoundStatus(true)
            : setFoundStatus(false);
          setFoundChannels(fetchedChannels);
        } catch (error) {
          setError(error);
          setFoundStatus(false);
        } finally {
          setLoading(false);
        }
      }
    };
    searchChannels();
  }, [navigate, token, query, search]);

  return (
    <MainSection>
      {loading ? (
        <Loader />
      ) : (
        <>
          <TopNavigationBar icon={<IoSearch />} name={`Search`} />
          <MainContainer>
            <div className="search__wrapper">
              <SearchInput setQuery={setQuery} setSearch={setSearch} />
              <SearchOutput
                channels={foundChannels}
                foundStatus={foundStatus}
                search={search}
              />
            </div>
          </MainContainer>
        </>
      )}

      <Footer />
    </MainSection>
  );
};

export default SearchPage;
