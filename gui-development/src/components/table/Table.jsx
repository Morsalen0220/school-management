import Footer from "./Footer";
import Title from "./Title";
import Header from "./Header";

export default function Table({
  order,
  setOrder,
  orderBy,
  setOrderBy,
  itemsPerPage,
  setItemsPerPage,
  currentPage,
  setCurrentPage,
  search,
  searchBy,
  setSearch,
  setSearchBy,
  total,
  title,
  data,
  footer = false,
  header = true,
  ...props
}) {
  return (
    <div>
      <Header
        perPage={itemsPerPage}
        setPerPage={setItemsPerPage}
        title={title}
        search={search}
        setSearch={setSearch}
        searchBy={searchBy}
        setSearchBy={setSearchBy}
      />
      <table {...props} className="w-full">
        {header === true && (
          <thead className="bg-slate-200">
            <Title
              orderBy={orderBy}
              setOrderBy={setOrderBy}
              order={order}
              setOrder={setOrder}
              data={title}
            />
          </thead>
        )}
        <tbody>
          {data.map((x) => {
            return (
              <tr
                key={x["id"]}
                className="odd:bg-slate-50 even:bg-white border-b-2">
                {title.map((item, i) => {
                  return (
                    <td key={i} className="first:pl-2 last:pr-2 text-gray-800">
                      {x[item]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        {footer === true && (
          <tfoot className="bg-slate-200">
            <Title
              orderBy={orderBy}
              setOrderBy={setOrderBy}
              order={order}
              setOrder={setOrder}
              data={title}
            />
          </tfoot>
        )}
      </table>
      <Footer
        total={total}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
