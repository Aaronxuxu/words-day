import React, { useEffect } from "react";
import DepotsSearch from "./Depots_Search";
import DepotsMain from "./Depots_Main";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { getWrod } from "../../redux/actions/words";
import qs from "query-string";

function Depots(props) {
  // 判断是否默写
  const { getWrod } = props;
  const location = useLocation();
  const search = qs.parse(location.search);

  useEffect(() => {
    getWrod(search);
  }, [search]);

  return (
    <>
      <DepotsSearch></DepotsSearch>
      <DepotsMain></DepotsMain>
    </>
  );
}
export default connect((state) => ({}), { getWrod })(Depots);
