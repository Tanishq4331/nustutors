import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import styled from "styled-components";

const StyledAvatar = styled.img`
  vertical-align: middle;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export default function AvatarIcon({ userData }) {
  return userData.url ? (
    <StyledAvatar alt={userData.name} src={userData.url} />
  ) : (
    <AccountCircleIcon style={{ fontSize: 44 }} />
  );
}
