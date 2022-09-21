import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getWordByID } from "../../../../api/axios";
import {
  Modal,
  Button,
  Collapse,
  List,
  message,
  Skeleton,
  Descriptions,
  Tooltip,
} from "antd";
import qs from "query-string";

const { Panel } = Collapse;

function MainModal(props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const { isModalOpen, setIsModalOpen, modalVal } = props;

  const [wordDetail, setWordDetail] = useState([]);

  const getWordDetail = async () => {
    if (Object.keys(modalVal).length === 0) return;

    const { status, result, msg } = await getWordByID(modalVal);
    if (status === 1) {
      return message.error(msg);
    }

    setIsLoading(false);
    return setWordDetail(result);
  };

  // 关闭窗口 清空数据
  const handleClose = () => {
    setWordDetail(() => []);
    setIsModalOpen(false);
    setIsLoading(true);
  };

  // 跳转
  const handleRouter = (key, id) => {
    if (key === "ctypeName") {
      let obj = { ctypeName: id };
      handleClose();
      return navigate(`${pathname}?${qs.stringify(obj)}`);
    }
  };

  useEffect(() => {
    getWordDetail();
  }, [modalVal]);

  return (
    <Modal
      visible={isModalOpen}
      title={modalVal.label}
      destroyOnClose={true}
      onOk={() => setIsModalOpen(false)}
      onCancel={handleClose}
      footer={[
        <Button key="back" type="primary" onClick={handleClose}>
          确定
        </Button>,
      ]}
    >
      {wordDetail.length > 0 && (
        <Skeleton
          loading={isLoading}
          active={true}
          title={{ width: "100%" }}
          paragraph={{ width: "100%" }}
        >
          {modalVal.props === "words" ? (
            <Collapse ghost accordion={true}>
              {wordDetail.map((e) => (
                <Panel header={e.cname} key={e.name}>
                  {e.name === "words" ? (
                    e.value[0].translate.join("；")
                  ) : (
                    <List
                      itemLayout="horizontal"
                      dataSource={e.value}
                      rowKey="_id"
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            title={<strong>{item.label}</strong>}
                            description={
                              <span style={{ color: "rgba(0,0,0,.55)" }}>
                                {item.translate.join("；")}
                              </span>
                            }
                          />
                        </List.Item>
                      )}
                    ></List>
                  )}
                </Panel>
              ))}
            </Collapse>
          ) : (
            <Descriptions bordered={true} layout="vertical" column={2}>
              <Descriptions.Item label="所属词汇分类">
                <Tooltip
                  placement="topLeft"
                  arrowPointAtCenter
                  title="点击浏览一下？"
                >
                  <Button
                    type="link"
                    onClick={() =>
                      handleRouter("ctypeName", wordDetail[0].ctypeInfo[0]._id)
                    }
                  >
                    {wordDetail.length > 0 &&
                      wordDetail[0].ctypeInfo[0].ctypeName}
                  </Button>
                </Tooltip>
              </Descriptions.Item>
              <Descriptions.Item label="所属单词">
                {wordDetail.length > 0 && wordDetail[0].wordInfo[0].label}
              </Descriptions.Item>
              <Descriptions.Item label="中文翻译">
                {wordDetail.length > 0 && wordDetail[0].translate.join("；")}
              </Descriptions.Item>
            </Descriptions>
          )}
        </Skeleton>
      )}
    </Modal>
  );
}
export default MainModal;
