import React, { useEffect, useState } from "react";

import { message, Select, Spin } from "antd";
import { debounce } from "lodash";

function SearchSelect(props) {
  const { API, style, optVal, onChange, selectValue } = props;

  const [options, setOptions] = useState([]);

  const [isSearch, setIsSearch] = useState(false);

  const getApi = async () => {
    const { result, status, msg } = await API({ count: 7 });
    if (status === 1) {
      return message.error(msg);
    } else {
      return setOptions(
        result.map((e) => ({
          label: e.value || e[optVal],
          value: e._id,
        }))
      );
    }
  };

  const handleSearch = debounce(async (value) => {
    setIsSearch(true);
    const { result, status, msg } = await API({ searchVal: value });
    setIsSearch(false);
    if (status === 1) {
      return message.error(msg);
    } else {
      setOptions(
        result.map((e) => ({
          label: e.value || e[optVal],
          value: e._id,
        }))
      );
    }
  }, 150);

  useEffect(() => {
    getApi();
  }, []);

  return (
    <Select
      value={selectValue}
      showSearch
      filterOption={false}
      onSearch={handleSearch}
      style={style}
      options={options}
      notFoundContent={isSearch ? <Spin></Spin> : null}
      onChange={onChange}
    ></Select>
  );
}
export default SearchSelect;
