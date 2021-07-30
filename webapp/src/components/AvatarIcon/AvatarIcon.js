import "react-initials-avatar/lib/ReactInitialsAvatar.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Avatar } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import React from "react";
import Badge from "@material-ui/core/Badge";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const CustomCheckCircleIcon = withStyles((theme) => ({
  root: {
    width: 22,
    height: 22,
    background: `white`,
    borderRadius: "50%",
    color: "#44b700",
  },
}))(CheckCircleIcon);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));

const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Verified Tutor
  </Tooltip>
);

const VerifiedBadge = () => {
  return (
    <OverlayTrigger
      placement="bottom"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <CustomCheckCircleIcon />
    </OverlayTrigger>
  );
};

export default function AvatarIcon({ userData }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        invisible={!userData.verifiedTutor}
        badgeContent={<VerifiedBadge />}
      >
        <Avatar
          alt={userData.name}
          src={userData.url || "broken"}
          className={classes.orange}
        />
      </Badge>
    </div>
  );
}
