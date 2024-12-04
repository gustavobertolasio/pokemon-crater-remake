import React, { memo, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const DndWrapper = memo((props) => {
  const [context, setContext] = useState(null);

  useEffect(() => {
    setContext(document.getElementById(props.id));
  }, [props.id]);

  return context ? (
    <DndProvider backend={HTML5Backend} options={{ rootElement: context }}>
      {props.children}
    </DndProvider>
  ) : null;
});
export default DndWrapper;
