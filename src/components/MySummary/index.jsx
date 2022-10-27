import React from "react";
import { Typography } from "antd";
import "./index.css";
const { Paragraph } = Typography;
function MySummary(props) {
  const { title, ulVal, content } = props;
  return (
    <div className="mysummary w-border">
      <div className="mysummary-title w-marginBottom">{title}</div>
      <Paragraph className="mysummary-main">
        {ulVal && (
          <ul>
            {ulVal.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        )}
        {content && content}
      </Paragraph>
    </div>
  );
}
export default MySummary;
