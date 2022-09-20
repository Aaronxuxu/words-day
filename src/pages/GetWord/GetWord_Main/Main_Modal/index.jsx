import React, { useEffect, useState } from "react";
import { getWordByID } from "../../../../api/axios";
import { Modal, Button, Collapse, List, message, Skeleton } from "antd";
const { Panel } = Collapse;

function MainModal(props) {
  const [isLoading, setIsLoading] = useState(true);

  const { isModalOpen, setIsModalOpen, modalVal } = props;

  const [wordDetail, setWordDetail] = useState([]);

  const getWordDetail = async () => {
    if (Object.keys(modalVal).length === 0) return;

    const { status, result, msg } = await getWordByID(modalVal);
    if (status === 1) {
      return message.error(msg);
    }
    console.log(result);
    setIsLoading(false);
    return setWordDetail(result);
  };

  // 关闭窗口 清空数据
  const handleClose = () => {
    setWordDetail([]);
    setIsModalOpen(false);
    setIsLoading(true);
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
          <></>
        )}
      </Skeleton>
    </Modal>
  );
}
export default MainModal;
