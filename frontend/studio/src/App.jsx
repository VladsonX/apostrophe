import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router";
import RootLayout from "./layouts/RootLayout";
import RequireAuth from "./auth/RequireAuth";
import MainPage from "./pages/MainPage";
import WelcomePage from "./pages/WelcomePage";
import SignUpPage from "./pages/SignUpPage";
import EditChannelPage from "./pages/EditChannelPage";
import CreateChannelPage from "./pages/CreateChannelPage";
import ChannelPage from "./pages/ChannelPage";
import CreateArticlePage from "./pages/CreateArticlePage";
import TopicPage from "./pages/TopicPage";
import EditTopicPage from "./pages/EditTopicPage";
import ArticlePage from "./pages/ArticlePage";
import EditArticlePage from "./pages/EditArticlePage";
import ErrorPage from "./pages/ErrorPage";

// Articles live either directly in a channel or inside one of its topics,
// so the article routes are mounted under both prefixes.
const articleRoutes = (
  <>
    <Route path="createarticle" element={<CreateArticlePage />} />
    <Route path="readarticle/:postId" element={<ArticlePage />} />
    <Route path="readarticle/:postId/edit" element={<EditArticlePage />} />
  </>
);

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
        <Route path="channel/createchannel" element={<CreateChannelPage />} />
        <Route path="channel/editchannel/:id" element={<EditChannelPage />} />
        <Route path="channel/:id" element={<ChannelPage />} />
        <Route path="channel/:channelId">{articleRoutes}</Route>
        <Route path="channel/:channelId/topic/:topicId" element={<TopicPage />} />
        <Route path="channel/:channelId/topic/:topicId/edit" element={<EditTopicPage />} />
        <Route path="channel/:channelId/topic/:topicId">{articleRoutes}</Route>
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
