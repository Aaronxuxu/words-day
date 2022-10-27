import React, { useState } from "react";
import { Typography } from "antd";
import "./index.css";
import { useEffect } from "react";

const { Paragraph } = Typography;

function MyEllipsis(props) {
  const [ellipsis, setEllipsis] = useState(true);

  const { context } = props;

  return (
    <>
      <Paragraph
        className="myellipsis-Paragraph"
        ellipsis={ellipsis}
        onClick={() => setEllipsis(!ellipsis)}
      >
        {context}
      </Paragraph>
      <div className="myellipsis-back" onClick={() => setEllipsis(!ellipsis)}>
        {ellipsis ? "更多" : "收回"}
      </div>
    </>
  );
}

export default MyEllipsis;
