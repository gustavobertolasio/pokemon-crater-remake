import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Backpack from "../../../../../../../../assets/information/backpack.svg";
import UserContext from "../../../../../../../../contexts/UserContext";
import { getUserInfo } from "../../../../../../../../api/Api";
import { Popover } from "@material-ui/core";

const BagWrapper = styled.div`
  width: 170px;
  height: 250px;
`;

const BagItemListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: sandybrown;
  border-radius: 10px;
  border: 3px solid brown;
  width: 160px;
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
  display:flex;
  flex-direction: column;
`;

const Bag = ({
  backPackAsPopover,
  backpackAnchor,
  popoverClose,
  itemClikedCallback,
}) => {
  const itemsQuery = "BAG { QTD_ITEM ITEM { ID ITEM_NAME }}";

  const { user } = useContext(UserContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getUserInfo(user.ID, itemsQuery, setItems);
  }, [user]);

  const open = Boolean(backpackAnchor);

  return (
    <>
      {backPackAsPopover ? (
        <Popover
          id={open ? "bag-popover" : undefined}
          open={open}
          onClose={popoverClose}
          anchorEl={backpackAnchor}
          classes={{
            paper: "popover-bag",
          }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <BagWrapper>
            <BackPackImg src={Backpack} />
            <BagItemListWrapper>
              <TitleArea>
                <h5>Items</h5>
              </TitleArea>
              <BackPackItemList>
                {items?.BAG?.map((item, index) => (
                  <span onClick={() => itemClikedCallback(item.ITEM.ID)}>
                      <div key={`bag-item-${index}`}>
                    {item.ITEM.ITEM_NAME} x{item.QTD_ITEM}
                  </div>
                  a
                  </span>
                ))}
              </BackPackItemList>
            </BagItemListWrapper>
          </BagWrapper>
        </Popover>
      ) : (
        <BagWrapper>
          <BackPackImg src={Backpack} />
          <BagItemListWrapper>
            <TitleArea>
              <h5>Items</h5>
            </TitleArea>
            <BackPackItemList>
              {items?.BAG?.map(
                (item) => `${item.ITEM.ITEM_NAME} x${item.QTD_ITEM}`
              )}
            </BackPackItemList>
          </BagItemListWrapper>
        </BagWrapper>
      )}
    </>
  );
};
export default Bag;
