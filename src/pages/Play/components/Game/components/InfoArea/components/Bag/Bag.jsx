import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Backpack from "../../../../../../../../assets/information/backpack.svg";
import UserContext from "../../../../../../../../contexts/UserContext";
import { getUserInfo } from "../../../../../../../../api/Api";

const BagWrapper = styled.div`
  width: 96%;
  height: 250px;
`;

const BagItemListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: sandybrown;
  border-radius: 10px;
  border: 3px solid brown;
  width: inherit;
  height: 220px;
`;
const TitleArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  width: inherit;
`;

const BackPackImg = styled.img`
  top: 23px;
  left: 10px;
  width: 35px;
  height: 50px;
  position: relative;
`;

const BackPackItemList = styled.div`
  top: 23px;
  left: 15px;
  width: 90%;
  border-radius: 10px;
  border: 1px solid black;
  height: 180px;
  background-color: blanchedalmond;
`;

const Bag = () => {
  const itemsQuery = "BAG { QTD_ITEM ITEM { ITEM_NAME }}";

  const { user } = useContext(UserContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getUserInfo(user.ID, itemsQuery, setItems);
  }, [user]);

  return (
    <BagWrapper>
      <BackPackImg src={Backpack} />
      <BagItemListWrapper>
        <TitleArea>
          <h5>Items</h5>
        </TitleArea>
        <BackPackItemList>
            {items?.BAG?.map(item => `${item.ITEM.ITEM_NAME} x${item.QTD_ITEM}`)}
        </BackPackItemList>
      </BagItemListWrapper>
    </BagWrapper>
  );
};
export default Bag;
