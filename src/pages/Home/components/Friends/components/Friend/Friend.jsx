import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getData } from "../../../../../../api/Api";

const FriendWrapper = styled.div`
  width: fit-content;
`;

const Friend = ({ friendId }) => {
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    getData(`/users/${friendId}`, setFriend);
  }, [friendId]);

  return <FriendWrapper>{friend?.name}</FriendWrapper>;
};
export default Friend;
