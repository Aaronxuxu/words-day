import React from "react";
import _pick from "lodash/pick";

import {
  Statistic,
  Space,
  Divider,
  Button,
  Modal,
  Row,
  Col,
  Typography,
  Tag,
} from "antd";
import ItemEchart from "./ItemEchart";
import dayjs from "dayjs";
import IconFont from "../../../../uitil/IconFont";
import "./index.css";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const { confirm } = Modal;
const { Title } = Typography;
function SessionItem(props) {
  const { item } = props;
  console.log(item);
  const pickPer = _pick(item, [
    "words",
    "phrases",
    "fixedcol",
    "examplesentence",
  ]);
  const handleShow = () => {
    console.log(1);
  };
  const handleBtnClick = (e, key) => {
    e.stopPropagation();
    let choseKey = {
      reset: {
        title: "是否重置学习进度？",
        content: "重置后进度为 0！",
      },
      del: {
        title: "是否取消该课程？",
        content: "取消后需要重新添加该课程！",
      },
    };
    confirm({
      title: choseKey[key].title,
      icon: <ExclamationCircleOutlined />,
      content: choseKey[key].content,
      maskClosable: true,
      onOk() {
        console.log("OK");
      },
    });
  };
  return (
    <Row justify="end" className="sessionList-Item">
      <Col xs={24} md={{ span: 14 }}>
        <Space direction="vertical">
          {/* 标题 */}
          <Title level={3}>{item.typeid[0].ctypeName}</Title>
          {/* 创建结束时间，是否已完成 */}
          <Space
            align="center"
            size={15}
            wrap={true}
            split={<Divider type="vertical" />}
          >
            <span>创建时间：{dayjs(item.createTime).format("YYYY-MM")}</span>
            <Tag color={item.isFinish ? "success" : "error"}>
              {item.isFinish ? "已完成" : "未完成"}
            </Tag>
          </Space>
          {/* 完成百分比 */}
          <Space
            align="center"
            size={15}
            wrap={true}
            split={<Divider type="vertical" />}
          >
            <Statistic
              title="单词"
              value={item.words.wArr.length}
              suffix={`/ ${item.words.number}`}
              valueStyle={{ fontSize: "16px" }}
            />
            <Statistic
              title="短语"
              value={item.phrases.wArr.length}
              suffix={`/ ${item.phrases.number}`}
              valueStyle={{ fontSize: "16px" }}
            />
            <Statistic
              title="真题例句"
              value={item.examplesentence.wArr.length}
              suffix={`/ ${item.examplesentence.number}`}
              valueStyle={{ fontSize: "16px" }}
            />
            <Statistic
              title="固定搭配"
              value={item.fixedcol.wArr.length}
              suffix={`/ ${item.fixedcol.number}`}
              valueStyle={{ fontSize: "16px" }}
            />
          </Space>
          <Space
            align="center"
            size={15}
            wrap={true}
            split={<Divider type="vertical" />}
          >
            <Button
              size="small"
              type="link"
              onClick={(e) => handleBtnClick(e, "reset")}
              icon={<IconFont type="icon-sign" />}
            >
              重置
            </Button>
            <Button
              size="small"
              type="link"
              onClick={(e) => handleBtnClick(e, "del")}
              icon={<IconFont type="icon-delete-fill" />}
            >
              删除
            </Button>
          </Space>
        </Space>
      </Col>
      <Col xs={24} md={{ span: 8, offset: 2 }}>
        <ItemEchart pickPer={pickPer} />
      </Col>
    </Row>
  );
}

export default SessionItem;
