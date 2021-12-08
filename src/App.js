import DrawerDashBoard from "./components/drawer/DrawerDashBoard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CategorySlider from "./components/utils/CategorySlider";
import IndividualVideo from "./components/pages/IndividualVideo";
import Channel from "./components/pages/Channel";
import Search from "./components/pages/Search";
import Subscription from "./components/pages/Subscription";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});
function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <DrawerDashBoard />
          <CategorySlider />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/home" component={Home} exact />
            <Route
              path="/individualvideo/:id"
              component={IndividualVideo}
              exact
            />

            <Route path="/channel/:channelId" component={Channel} exact />
            <Route path="/search/:query" component={Search} exact />
            <Route path="/feed/subscriptions" component={Subscription} />
          </Switch>
        </Router>
        {/* <SimpleModal /> */}
      </ThemeProvider>
    </div>
  );
}

export default App;
