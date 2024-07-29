// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";
import { dateFormatForDisplaying } from "./dateConversion";
import { useEffect, useState } from "react";

function Home() {
  const [data, setData] = useState(null);

  const getData = async () => {
    const response = await fetch(
      "https://artists-task-backend.onrender.com/transactions"
    );
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-slate-800 min-h-screen ">
      <h1 className="text-slate-200 bg-slate-700 text-2xl md:text-4xl text-center mb-2 p-3">
        Transactions
      </h1>
      <div className="max-w-full  overflow-x-auto">
        <table className="table-fixed border-collapse border border-slate-500 min-w-full ">
          <thead className="bg-slate-700 text-slate-200 h-12 text-lg">
            <tr className="">
              <th className="border border-slate-600 ">Date</th>
              <th className="border border-slate-600">Description</th>
              <th className="border border-slate-600">Credit</th>
              <th className="border border-slate-600">Debit</th>
              <th className="border border-slate-600 cursor-pointer font-extrabold">
                <Link to="/add-transaction">
                  <span>+ Add Transactions</span>
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {data !== null &&
              data.map((eachRow) => {
                const { id, amount, description, date, running_balance, type } =
                  eachRow;

                return (
                  <tr key={id} className="h-10 text-lg">
                    <td className="border border-slate-700 text-slate-400 p-2 text-center">
                      {dateFormatForDisplaying(date)}
                    </td>
                    <td className="border border-slate-700 text-slate-400 p-2">
                      {description}
                    </td>

                    <td className="border border-slate-700 text-slate-400 p-2 text-center ">
                      {type === "Credit" ? amount : ""}
                    </td>
                    <td className="border border-slate-700 text-slate-400 p-2 text-center">
                      {type === "Debit" ? amount : ""}
                    </td>
                    <td className="border border-slate-700 text-slate-400 p-2 text-center">
                      {running_balance}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
