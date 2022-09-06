import React, { useEffect } from "react";
import GetWordSearch from "./GetWord_Search";
import GetWordMain from "./GetWord_Main";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { getWrod } from "../../redux/actions/words";
import qs from "query-string";
import "./index.css";

function GetWord(props) {
  // 判断是否默写
  const { getWrod } = props;
  const location = useLocation();
  const search = qs.parse(location.search);

  useEffect(() => {
    getWrod(search);
  }, [search]);

  return (
    <>
      <GetWordSearch></GetWordSearch>
      <GetWordMain></GetWordMain>
    </>
  );
}
export default connect((state) => ({}), { getWrod })(GetWord);
