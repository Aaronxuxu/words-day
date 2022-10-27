import React from "react";
import { List, Typography, Divider, Button, Row, Col, Radio } from "antd";
import { BASETYPE } from "../../../../uitil/constans";
import "./index.css";
const { Title } = Typography;
function CourseDetailCataLog(props) {
  const {
    val: { data, hasMore, isLoading },
    getDetail,
    label,
  } = props;

  return (
    <div className="cataLog w-border w-marginBottom w-padding">
      <div className="cataLog title">
        <Title level={4}>{BASETYPE[label]}</Title>
        <Divider></Divider>
      </div>
      <List
        loadMore={
          hasMore && (
            <div
              className="w-marginTop"
              style={{
                textAlign: "center",
              }}
            >
              <Button
                type="text"
                onClick={() => getDetail([label], data.length / 5 + 1)}
              >
                加载更多
              </Button>
            </div>
          )
        }
        loading={isLoading}
        dataSource={data}
        rowKey="_id"
        split={false}
        renderItem={(item) => (
          <Row className="catalog-list-item button-hover">
            <Col span={18} className="catalog-list-title">
              {item.label}
            </Col>
            <Col span={4} offset={2} style={{ textAlign: "center" }}>
              <Radio></Radio>
            </Col>
          </Row>
        )}
      />
    </div>
  );
}

export default CourseDetailCataLog;
