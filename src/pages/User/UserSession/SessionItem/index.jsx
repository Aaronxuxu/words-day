import React from "react";
import _pick from "lodash/pick";
import { delUserCourse, resetUserCourse } from "../../../../api/axios";

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
  Progress,
  message,
} from "antd";
import ItemEchart from "./ItemEchart";
import dayjs from "dayjs";
import IconFont from "../../../../uitil/IconFont";
import "./index.css";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;
const { Title } = Typography;
function SessionItem(props) {
  const { item, resetResult } = props;
  const wordName = {
    words: "单词",
    phrases: "短语",
    fixedcol: "固定搭配",
    examplesentence: "真题例句",
  };

  const pickPer = _pick(item, [
    "words",
    "phrases",
    "fixedcol",
    "examplesentence",
  ]);

  const handleShow = () => {
    // console.log(pickPer);
  };

  const handleBtnClick = (e, key) => {
    e.stopPropagation();

    let choseKey = {
      reset: {
        title: "是否重置学习进度？",
        content: "重置后进度为 0",
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
      async onOk() {
        const { _id } = item;
        let promise;
        if (key === "del") {
          promise = await delUserCourse({
            id: _id,
          });
        } else {
          const obj = {
            _id: item._id,
            words: [],
            fixedcol: [],
            phrases: [],
            examplesentence: [],
          };
          promise = await resetUserCourse(obj);
        }
        const { result, msg, status } = promise;
        if (status === 1) {
          return message.error(msg);
        }
        message.success(key === "del" ? "删除成功" : "重置成功");
        return resetResult(key, result);
      },
    });
  };

  return (
    <Row justify="end" className="sessionList-Item" onClick={handleShow}>
      <Col xs={24} md={{ span: 14 }}>
        <div className="item-desc">
          <div>
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
          </div>

          {/* 各分类完成百分比 */}
          <Space
            align="center"
            size={15}
            wrap={true}
            split={<Divider type="vertical" />}
            style={{ textAlign: "center" }}
          >
            {Object.keys(pickPer).map((e) => (
              <div key={e}>
                <Statistic
                  title={wordName[e]}
                  value={pickPer[e].wArr.length}
                  suffix={`/ ${pickPer[e].number}`}
                  valueStyle={{ fontSize: "16px" }}
                />
                <Progress
                  showInfo={false}
                  size="small"
                  percent={
                    Number(
                      (pickPer[e].wArr.length / pickPer[e].number).toFixed(2)
                    ) * 100
                  }
                />
              </div>
            ))}
          </Space>

          {/* 重置进度/删除课程 */}
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
        </div>
      </Col>
      <Col xs={24} md={{ span: 8, offset: 2 }}>
        <ItemEchart pickPer={pickPer} />
      </Col>
    </Row>
  );
}

export default SessionItem;
