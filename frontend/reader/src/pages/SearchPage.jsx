import { useSearchParams } from "react-router";
import { IoSearch } from "react-icons/io5";
import Loader from "../components/main-components/Loader";
import MainSection from "../components/main-components/MainSection";
import TopNavigationBar from "../components/top-navigation/TopNavigationBar";
import MainContainer from "../components/main-components/MainContainer";
import SearchInput from "../components/search/SearchInput";
import SearchOutput from "../components/search/SearchOutput";
import Footer from "../components/main-components/Footer";
import ErrorMessage from "../components/main-components/ErrorMessage";
import { channelsApi } from "../api";
import { useApi } from "../hooks/useApi";
import enrichChannelsWithLogoPlaceholderBackground from "../script/ChannelLogoPlaceholderBackgroundColorEnricher";
import "./SearchPage.scss";

const searchChannels = async (query) => {
  if (!query) return null;
  const channels = await channelsApi.search(query);
  enrichChannelsWithLogoPlaceholderBackground(channels);
  return channels;
};

const SearchPage = () => {
  // The query lives in the URL (?q=...), so searches can be shared and survive reloads.
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const { data: channels, loading, error } = useApi(() => searchChannels(query), [query]);

  return (
    <MainSection>
      <TopNavigationBar icon={<IoSearch />} name="Search" />
      <MainContainer>
        <div className="search__wrapper">
          <SearchInput
            initialValue={query}
            onSearch={(value) => setSearchParams(value ? { q: value } : {})}
          />
          <ErrorMessage error={error} />
          {loading ? <Loader /> : <SearchOutput channels={channels} />}
        </div>
      </MainContainer>
      <Footer />
    </MainSection>
  );
};

export default SearchPage;
