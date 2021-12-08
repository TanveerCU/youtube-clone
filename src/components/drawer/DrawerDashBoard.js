import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import { Link } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { logIn, log_out} from "../../redux/actions/auth.action";
import SearchModal from "../utils/SearchModal";
import { useHistory } from "react-router-dom";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 320,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 5,
};

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const drawerWidth = "12rem";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "white",
    color: "#1e3a8a",
  },
  sideBarHeight: {
    marginTop: "60px",
    [theme.breakpoints.up("sm")]: {
      marginTop: "80px",
    },
  },
  menuButton: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
    },
  },
  smallDeviceDisplay: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  customColor: {
    color: "black",
  },
  btn: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: theme.spacing(2),
  },
  text: {
    marginLeft: "-15px",
  },
}));

export default function DrawerDashBoard() {
  const [input, setInput] = useState("");
  const { pathname } = useLocation();
  const [showSideBar, setShowSideBar] = useState(true);
  const [search, setSearch] = useState({
    toggle: false,
    count: 0,
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.user);
  let history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const mopen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = () => {
    setOpen(!open);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${input}`);
  };
  // const inputSubmit = ()=>{
  //   history.push(`/search/${input}`)
  // }

  useEffect(() => {
    const arr = pathname.split("/");

    console.log(pathname);
    if (arr[1] === "individualvideo") {
      setShowSideBar(false);
    } else {
      setShowSideBar(true);
    }
  }, [pathname]);

  const logOutHandler = () => {
    dispatch(log_out())
    handleClose()
 }

  return (
    <div>
      <CssBaseline />

      {/* Header */}
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center">
              {pathname === "/individualvideo" ? (
                ""
              ) : (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleToggle}
                  edge="start"
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <img
                src="YouTube-Logo.wine.svg"
                alt="logo"
                className="w-24 h-7 sm:w-36 sm:h-8 cursor-pointer"
                onClick={() => {
                  history.push("/home");
                }}
              />
            </div>
            <div className="flex-1 lg:px-32">
              <Paper
                component="form"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
                elevation={0}
                onSubmit={handleSubmit}
              >
                <span className="hidden flex-1 sm:block f-full">
                  <InputBase
                    sx={{
                      ml: 1,
                      flex: 1,
                      border: "1px solid #737373",
                      padding: ".1rem .1rem .1rem 2rem",
                    }}
                    placeholder="Search"
                    fullWidth
                    label="fullWidth"
                    id="fullWidth"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                    }}
                  />
                </span>
                <IconButton
                  // type="submit"
                  sx={{ p: "1rem" }}
                  aria-label="search"
                >
                  <span className="block sm:hidden">
                    <SearchIcon
                      sx={{ fontSize: 34, padding: ".2rem" }}
                      onClick={() => {
                        setSearch({
                          toggle: !search.toggle,
                          count: 1,
                        });
                        console.log("small device");
                      }}
                    />
                    <SearchModal searchopen={search} />
                  </span>
                  <span className="hidden sm:block">
                    <SearchIcon
                      sx={{ fontSize: 34, padding: ".2rem" }}
                      onClick={() => {
                        history.push(`/search/${input}`);
                        console.log("large device");
                      }}
                    />
                  </span>
                </IconButton>
              </Paper>
            </div>

            {auth ? (
              <div className="sm:space-x-1 flex items-center">
                <div className="flex ">
                  <span className="hidden sm:block">
                    <IconButton>
                      <VideoCallOutlinedIcon
                        style={{ fontSize: 30 }}
                        className={classes.customColor}
                      />
                    </IconButton>
                  </span>
                  <IconButton>
                    <AppsOutlinedIcon
                      style={{ fontSize: 25 }}
                      className={classes.customColor}
                    />
                  </IconButton>
                  <IconButton>
                    <NotificationsNoneOutlinedIcon
                      style={{ fontSize: 25 }}
                      className={classes.customColor}
                    />
                  </IconButton>
                </div>
                <IconButton>
                  <StyledBadge
                    overlap="circle"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    variant="dot"
                    id="fade-button"
                    aria-controls="fade-menu"
                    aria-haspopup="true"
                    aria-expanded={mopen ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <img src={auth.picture} className="h-8 w-8 rounded-2xl" />
                  </StyledBadge>
                </IconButton>
              </div>
            ) : (
              <div className="space-x-1">
                <Button
                  variant="outlined"
                  onClick={() => {
                    dispatch(logIn());
                  }}
                >
                  SignIn
                </Button>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={mopen}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Create</MenuItem>
        <MenuItem onClick={logOutHandler}>Logout</MenuItem>
      </Menu>

      {/* Side Bar */}
      {showSideBar ? (
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          sx={{ zIndex: "-1" }}
        >
          <List className={classes.sideBarHeight}>
            <Link to="/home">
              <ListItem button>
                <ListItemIcon>
                  <HomeRoundedIcon className={classes.customColor} />
                </ListItemIcon>
                <ListItemText
                  className={[classes.customColor, classes.text]}
                  primary={"Home"}
                  onClick={() => {
                    history.push("/home");
                  }}
                />
              </ListItem>
            </Link>

            <ListItem button>
              <ListItemIcon>
                <ExploreOutlinedIcon className={classes.customColor} />
              </ListItemIcon>
              <ListItemText
                className={[classes.customColor, classes.text]}
                primary={"Explore"}
              />
            </ListItem>

            <ListItem button onClick={()=>{history.push("/feed/subscriptions")}}>
              <ListItemIcon>
                <SubscriptionsOutlinedIcon className={classes.customColor} />
              </ListItemIcon>
              <ListItemText
                className={[classes.customColor, classes.text]}
                primary={"Subscriptions"}
              />
            </ListItem>

            <Divider style={{ marginTop: "5px", marginBottom: "20px" }} />

            <ListItem button>
              <ListItemIcon>
                <VideoLibraryOutlinedIcon className={classes.customColor} />
              </ListItemIcon>
              <ListItemText
                primary={"Library"}
                className={[classes.customColor, classes.text]}
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <RestoreOutlinedIcon className={classes.customColor} />
              </ListItemIcon>
              <ListItemText
                primary={"History"}
                className={[classes.customColor, classes.text]}
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <OndemandVideoOutlinedIcon className={classes.customColor} />
              </ListItemIcon>
              <ListItemText
                primary={"Your videos"}
                className={[classes.customColor, classes.text]}
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <WatchLaterOutlinedIcon className={classes.customColor} />
              </ListItemIcon>
              <ListItemText
                primary={"Watch later"}
                className={[classes.customColor, classes.text]}
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <ThumbUpOutlinedIcon className={classes.customColor} />
              </ListItemIcon>
              <ListItemText
                primary={"Liked videos"}
                className={[classes.customColor, classes.text]}
              />
            </ListItem>

            <Divider style={{ marginTop: "5px" }} />

            <ListItem>
              <ListItemText
                className={classes.smallDeviceDisplay}
                secondary={"SUBSCRIPTIONS"}
              />
            </ListItem>
          </List>
        </Drawer>
      ) : (
        ""
      )}
    </div>
  );
}
