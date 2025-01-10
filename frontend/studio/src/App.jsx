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
import CreateChannelPage from "./pages/EditChannelPage";
import ChannelPage from "./pages/ChannelPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<MainPage />} />
          <Route path="settings" element={<SettingsPage />} /> */ TODO */
          <Route path="channel/editchannel/:id" element={<EditChannelPage/>}></Route>
          <Route path="channel/editchannel" element={<EditChannelPage/>}></Route>
          <Route path="channel/createchannel" element={<CreateChannelPage/>}></Route>
          <Route path="channel/:id" element={<ChannelPage />}></Route>
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
