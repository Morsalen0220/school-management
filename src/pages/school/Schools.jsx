import { useEffect, useState } from "react";
import Notification from "../../components/Notification";
import http from "../../util/http";
import getSearchParameter from "../../util/getSearchParam";
import useLoading from "../../hooks/useLoading";
import useUpdateTitle from "../../hooks/useUpdateTitle";
import Table from "../../components/table/Table";
import { SecondaryButton } from "../../components/button/Button";
import { Link } from "react-router-dom";

export default function Schools({ ...props }) {
  useUpdateTitle("School");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({});
  useLoading(loading);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const params = {
      order: getSearchParameter("order"),
      orderBy: getSearchParameter("order_by"),
      search: getSearchParameter("search"),
      searchBy: getSearchParameter("search_by"),
      itemsPerPage: getSearchParameter("limit"),
      currentPage: getSearchParameter("page"),
    };

    if (params.order) setOrder(params.order);
    if (params.orderBy) setOrderBy(params.orderBy);
    if (params.search) setSearch(params.search);
    if (params.searchBy) setSearchBy(params.searchBy);
    if (params.itemsPerPage) setItemsPerPage(parseInt(params.itemsPerPage));
    if (params.currentPage) setCurrentPage(parseInt(params.currentPage));
  }, []);

  useEffect(() => {
    http
      .get(
        `/school?page=${currentPage}&order=${order}&order_by=${orderBy}&limit=${itemsPerPage}&search=${search}&search_by=${searchBy}`
      )
      .then((data) => {
        setData(data["data"]["data"]);
        setTotal(data["data"]["total_data_length"]);
      })
      .catch((error) => {
        setNotification({
          text: error.response.data.message[0],
          type: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, itemsPerPage, order, orderBy, search, searchBy]);

  return (
    <div {...props}>
      <div className="flex justify-between items-center border-b-2 mb-3 pb-2">
        <h2 className="text-2xl font-lato font-semibold">Schools</h2>
        <SecondaryButton>
          <Link to="/school/add">Add new</Link>
        </SecondaryButton>
      </div>
      <Table
        order={order}
        setOrder={setOrder}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        search={search}
        setSearch={setSearch}
        searchBy={searchBy}
        setSearchBy={setSearchBy}
        total={total}
        title={[
          "id",
          "name",
          "mobile_number",
          "email",
          "address",
          "description",
        ]}
        footer={true}
        data={data}
      />
      {notification.text && (
        <Notification
          type={notification.type}
          onClose={() => setNotification({})}
          closeOnBGClick={true}>
          {notification.text}
        </Notification>
      )}
    </div>
  );
}
