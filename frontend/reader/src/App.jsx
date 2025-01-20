import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import RootLayout from "./layouts/RootLayout";
import MainPage from "./pages/MainPage";
import WelcomePage from "./pages/WelcomePage";
import SignUpPage from "./pages/SignUpPage";
import CheckMailBoxPage from "./pages/CheckMailBoxPage";
import ChannelPage from "./pages/ChannelPage";
import ArticlePage from "./pages/ArticlePage";
import TopicPage from "./pages/TopicPage";
import Subscriptions from "./pages/SubscriptionsPage";
import ExplorePage from "./pages/ExplorePage";
import ErrorPage from "./pages/ErrorPage";
import SearchPage from "./pages/SearchPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<MainPage />} />
          <Route path="channel/:id" element={<ChannelPage />} />
          <Route
            path="channel/:id/article/:articleId"
            element={<ArticlePage />}
          />
          <Route
            path="channel/:channelId/topic/:topicId"
            element={<TopicPage />}
          />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/checkMailBox" element={<CheckMailBoxPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
