import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import RootLayout from "./layouts/RootLayout";
import MainPage from "./pages/MainPage";
import SettingsPage from "./pages/SettingsPage";
import WelcomePage from "./pages/WelcomePage";
import SignUpPage from "./pages/SignUpPage";
import CheckMailBoxPage from "./pages/CheckMailBoxPage";
import EditChannelPage from "./pages/EditChannelPage";
import CreateChannelPage from "./pages/CreateChannelPage";
import ChannelPage from "./pages/ChannelPage";
import CreateArticlePage from "./pages/CreateArticlePage";
import TopicPage from './pages/TopicPage'
import EditTopicPage from "./pages/EditTopicPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<MainPage />} />
          <Route path="settings" element={<SettingsPage />} /> 
          <Route path="channel/editchannel/:id" element={<EditChannelPage/>}></Route>
          <Route path="channel/editchannel" element={<EditChannelPage/>}></Route>
          <Route path="channel/createchannel" element={<CreateChannelPage/>}></Route>
          <Route path="channel/:id" element={<ChannelPage />}></Route>
          <Route path="channel/:id/createarticle" element={<CreateArticlePage />}></Route>
          <Route path="channel/:channelId/topic/:topicId/createarticle" element={<CreateArticlePage />}></Route>
          <Route path="channel/:channelId/topic/:topicId" element={<TopicPage />}></Route>
          <Route path="channel/:channelId/topic/:topicId/edit" element={<EditTopicPage />}></Route>
        </Route>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/checkMailBox" element={<CheckMailBoxPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
