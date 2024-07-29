import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { convertDateJstoSql } from "../Home/dateConversion";

function AddTransaction() {
  const [transactionType, setTransactionType] = useState("Credit");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [runningBalance, setRunningBalance] = useState(null);
  const history = useHistory();

  const getRunningBalanceFromPastData = async () => {
    const response = await fetch(
      "https://artists-task-backend.onrender.com/transactions"
    );
    const data = await response.json();
    setRunningBalance(data[data.length - 1].running_balance);
  };

  useEffect(() => {
    getRunningBalanceFromPastData();
  }, []);

  const onSubmitForm = async (event) => {
    event.preventDefault();
    const newRunningBalance =
      transactionType === "Credit"
        ? runningBalance + parseInt(amount)
        : runningBalance - parseInt(amount);
    const data = {
      type: transactionType,
      amount: parseInt(amount),
      description,
      runningBalance: newRunningBalance,
      date: convertDateJstoSql(),
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(
      "https://artists-task-backend.onrender.com/transactions",
      options
    );
    if (response.ok) {
      history.push("/");
    }
  };

  return (
    <div className="bg-slate-800 min-h-screen">
      <h1 className="font-bold text-slate-200 bg-slate-700 text-2xl md:text-4xl text-center mb-2 p-3">
        New Transaction
      </h1>
      <form
        onSubmit={onSubmitForm}
        className="mt-5 mx-2 sm:mx-auto w-auto sm:min-w-24 sm:max-w-lg flex flex-col bg-slate-100 px-5 py-7 rounded-md text-lg"
      >
        <div className="flex justify-between items-center mb-4">
          <label className="w-1/3 text-lg" htmlFor="type">
            Transaction Type:
          </label>
          <select
            id="type"
            className="border border-gray-300 text-black w-2/3 bg-[white] outline-none focus:ring-1 rounded-md h-10 px-2 py-1"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option className="" value="Debit">
              Debit
            </option>
            <option value="Credit">Credit</option>
          </select>
        </div>
        <div className="flex justify-between mb-4 items-center">
          <label className="w-1/3 text-lg">Amount:</label>
          <input
            className="w-2/3 border border-gray-300 rounded-md h-10 px-2 py-1 outline-none focus:ring-1"
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-between mb-4 items-center">
          <label className="w-1/3 text-lg">Description:</label>
          <input
            className="w-2/3 border border-gray-300 rounded-md h-10 px-2 py-1 outline-none focus:ring-1 "
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 h-10 w-24 text-lg text-white font-semibold rounded mr-2 flex justify-center items-center"
            type="submit"
          >
            <FaSave className="mr-1" />
            Save
          </button>
          <button
            className="bg-blue-200 h-10 w-24 text-gray-900 rounded hover:bg-red-400 text-lg"
            type="button"
          >
            <Link to="/">
              <span>
                <span className="mr-[2px] mt-[2px] text-2xl ">&#xd7;</span>
                Cancel
              </span>
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTransaction;
