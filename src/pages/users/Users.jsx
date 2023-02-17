import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SecondaryButton } from "../../components/button/Button";
import Notification from "../../components/Notification";
import Table from "../../components/table/Table";
import useLoading from "../../hooks/useLoading";
import useUpdateTitle from "../../hooks/useUpdateTitle";
import getSearchParameter from "../../util/getSearchParam";
import http from "../../util/http";
import uppercaseFirstLetter from "../../util/text/uppercaseFirstLetter";

const ALLOWED_ROLE = [
  "admin",
  "accountant",
  "student",
  "librarian",
  "parent",
  "teacher",
];

export default function Users({ ...props }) {
  const { role } = useParams();
  useUpdateTitle(uppercaseFirstLetter(role));
  const navigate = useNavigate();

  if (!ALLOWED_ROLE.includes(role.toLowerCase())) {
    navigate("/");
  }

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
        `/user/${role}?page=${currentPage}&order=${order}&order_by=${orderBy}&limit=${itemsPerPage}&search=${search}&search_by=${searchBy}`
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
  }, [currentPage, itemsPerPage, order, orderBy, search, searchBy, role]);

  return (
    <div {...props}>
      <div className="flex justify-between items-center border-b-2 mb-3 pb-2">
        <h2 className="text-2xl font-lato font-semibold">
          {uppercaseFirstLetter(role)}
        </h2>
        <SecondaryButton>
          <Link to={`/users/${role}/add`}>Add new</Link>
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
          "user_id",
          "name",
          "school_id",
          "email",
          "image",
          "created_by",
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
