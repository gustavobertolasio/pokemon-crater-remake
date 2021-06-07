import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getMaps } from "../../../../api/Api";
import { getImage } from "../ArchiveToMap";

const MapListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const MapPreview = styled.img`
  width: 250px;
  height: 150px;
  cursor: pointer;
`;

const MapList = ({ chooseMap }) => {
  const [mapList, setMapList] = useState([]);

  useEffect(() => {
    getMaps(setMapList);
  }, []);

  return (
    <MapListWrapper>
      {mapList.map((map) => (
        <MapPreview
          key={map?.ID}
          onClick={() => chooseMap(map)}
          src={getImage[map?.MAP_ARCHIVE_NAME]}
        />
      ))}
    </MapListWrapper>
  );
};
export default MapList;
