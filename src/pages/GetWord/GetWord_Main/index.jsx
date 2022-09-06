import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Pagination, Card, List, Spin } from "antd";
import qs from "query-string";
import MainModal from "./Main_Modal";
import "./index.css";
function GetWordMain(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVal, setModalVal] = useState({});

  const [noReadItems, setNoReadItems] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const search = qs.parse(location.search);
  const { isDic } = search;
  const { WORDS } = props;

  useEffect(() => {
    if (isDic === "true" && WORDS.data) {
      let { data } = WORDS;
      for (let i = 0; i < data.length; i++) {
        let j = Math.floor(Math.random() * data.length);
        [data[i], data[j]] = [data[j], data[i]];
      }
      setNoReadItems(data);
    }
    setIsLoading(Object.keys(WORDS).length === 0);
  }, [WORDS, isDic]);

  const handleChange = (page, pageSize) => {
    const obj = { ...search, pageNo: page, pageSize };
    return navigate(`/getword?${qs.stringify(obj)}`);
  };

  const handleShowInfo = (val) => {
    setIsModalOpen(true);
    return setModalVal(val);
  };

  return (
    <div className="getword-main">
      {Object.keys(WORDS).length > 0 ? (
        <>
          <List
            loading={isLoading}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 5,
              xxl: 5,
            }}
            dataSource={isDic === "true" ? noReadItems : WORDS.data}
            renderItem={(item) => (
              <List.Item onClick={() => handleShowInfo(item)}>
                <Card
                  hoverable={true}
                  bordered={false}
                  bodyStyle={{ padding: "50px 24px", fontSize: "16px" }}
                >
                  {isDic === "true" ? item.cwords[0] : item.word}
                </Card>
              </List.Item>
            )}
          />
          {WORDS.data.length > 0 && (
            <Pagination
              total={WORDS.total}
              current={WORDS.pageNo}
              pageSize={WORDS.pageSize}
              onChange={handleChange}
              pageSizeOptions={[10, 20, 50, 100]}
              showSizeChanger={true}
            />
          )}
          <MainModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            modalVal={modalVal}
          ></MainModal>
        </>
      ) : (
        <Spin></Spin>
      )}
    </div>
  );
}
export default connect(
  (state) => ({
    WORDS: state.WORDS,
  }),
  {}
)(GetWordMain);
