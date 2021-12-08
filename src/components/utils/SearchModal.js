import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@mui/material/Paper";
import { useHistory } from "react-router-dom";

function getModalStyle() {
  const top = 8;
  const left = 0;

  return {
    top: `${top}%`,
    left: `${left}%`,
    width: "100%",
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "100%",
    backgroundColor: theme.palette.background.paper,

    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function SearchModal({ searchopen }) {
  const [input, setInput] = useState("");
  const classes = useStyles();
  const history = useHistory();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input)
    history.push(`/search/${input}`);
    setOpen(false);
  };

  console.log(searchopen);

  useEffect(() => {
    if (searchopen.toogle || searchopen.count === 1) {
      setOpen(true);
    }
    console.log("fired");
  }, [searchopen.toggle]);

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
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
          <span className="flex-1 sm:block f-full">
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
          <IconButton sx={{ p: "1rem" }} aria-label="search">
            <span className="block sm:hidden">
              <SearchIcon
                sx={{ fontSize: 34, padding: ".2rem" }}
                onClick={() => {
                  history.push(`/search/${input}`);
                  handleClose();
                }}
              />
            </span>
          </IconButton>
        </Paper>
      </div>
    </div>
  );

  return (
    <div style={{ zIndex: "500" }}>
      {/* <button type="button" onClick={handleOpen}>
        Open Modal
      </button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

export default SearchModal;
