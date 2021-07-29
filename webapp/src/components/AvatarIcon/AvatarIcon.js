import InitialsAvatar from "react-initials-avatar";
import "react-initials-avatar/lib/ReactInitialsAvatar.css";
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
    <div style={{ display: "inline-block", transform: "scale(0.85)" }}>
      <InitialsAvatar name={userData.name} />
    </div>
  );
}
