import React from "react";
import { Modal, Button, Collapse, List } from "antd";
const { Panel } = Collapse;

function MainModal(props) {
  const { isModalOpen, setIsModalOpen, modalVal } = props;

  return (
    <Modal
      centered={true}
      visible={isModalOpen}
      title={modalVal.word}
      destroyOnClose={true}
      onOk={() => setIsModalOpen(false)}
      onCancel={() => setIsModalOpen(false)}
      footer={[
        <Button key="back" type="primary" onClick={() => setIsModalOpen(false)}>
          确定
        </Button>,
      ]}
    >
      <Collapse ghost defaultActiveKey={["cword"]} accordion={true}>
        <Panel header="中文翻译" key="cword">
          {modalVal.cwords && modalVal.cwords.join("；")}
        </Panel>
        {modalVal.fixedCollocation && (
          <Panel header="固定搭配" key="fixedCollocation">
            <List
              itemLayout="horizontal"
              dataSource={modalVal.fixedCollocation}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<strong>{item.word}</strong>}
                    description={item.cword.join("；")}
                  />
                </List.Item>
              )}
            ></List>
          </Panel>
        )}
        {modalVal.phrases && (
          <Panel header="常见短语" key="phrases">
            <List
              itemLayout="horizontal"
              dataSource={modalVal.phrases}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<strong>{item.word}</strong>}
                    description={item.cword.join("；")}
                  />
                </List.Item>
              )}
            ></List>
          </Panel>
        )}
        {modalVal.exampleSentence && (
          <Panel header="真题例句" key="exampleSentence">
            <List
              itemLayout="horizontal"
              dataSource={modalVal.exampleSentence}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<strong>{item.sentence}</strong>}
                    description={item.csentence.join("；")}
                  />
                </List.Item>
              )}
            ></List>
          </Panel>
        )}
      </Collapse>
    </Modal>
  );
}
export default MainModal;
