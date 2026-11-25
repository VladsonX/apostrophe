import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router";
import RootLayout from "./layouts/RootLayout";
import MainPage from "./pages/MainPage";
import WelcomePage from "./pages/WelcomePage";
import SignUpPage from "./pages/SignUpPage";
import ChannelPage from "./pages/ChannelPage";
import ArticlePage from "./pages/ArticlePage";
import TopicPage from "./pages/TopicPage";
import Subscriptions from "./pages/SubscriptionsPage";
import ExplorePage from "./pages/ExplorePage";
import ErrorPage from "./pages/ErrorPage";
import SearchPage from "./pages/SearchPage";
import RequireAuth from "./auth/RequireAuth";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={
          <RequireAuth>
            <RootLayout />
          </RequireAuth>
        }
      >
        <Route index element={<MainPage />} />
        <Route path="channel/:channelId" element={<ChannelPage />} />
        <Route path="channel/:channelId/article/:postId" element={<ArticlePage />} />
        <Route path="channel/:channelId/topic/:topicId/article/:postId" element={<ArticlePage />} />
        <Route path="channel/:channelId/topic/:topicId" element={<TopicPage />} />
        <Route path="subscriptions" element={<Subscriptions />} />
        <Route path="explore" element={<ExplorePage />} />
        <Route path="search" element={<SearchPage />} />
      </Route>
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
