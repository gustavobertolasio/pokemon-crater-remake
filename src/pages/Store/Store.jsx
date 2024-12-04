import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { buyItem, getItems, getUserInfo } from "../../api/Api";
import styled from "styled-components";

const StoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BuyButton = styled.button`
 
`;

const Store = (props) => {
   const itemsQuery = "BAG { QTD_ITEM ITEM { ID ITEM_NAME }}";

  const { user } = useContext(UserContext);
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    getUserInfo(user.ID, itemsQuery, setItems);
    getItems(setAllItems)
  }, [user]);

  const handleBuyItem = (itemId) => {
    buyItem(itemId, user.ID).then(_ => {
        
        getUserInfo(user.ID, itemsQuery, setItems);
        console.log(items)
    })
  };

  return <StoreWrapper>
  
    <div>loja</div>
    {allItems && allItems.map((item,index) => <div key={`store-item-${index}`}>
        {item.ITEM_NAME}
        

        <BuyButton onClick={() => handleBuyItem(item.ID)}>Comprar</BuyButton>
        </div>)}



    <div>items na bag</div>
    {items && items.BAG?.map((item, index) => <div key={`bag-item-${index}`}>{item.QTD_ITEM} {item.ITEM.ITEM_NAME}</div>)}
  </StoreWrapper>
};
export default Store;