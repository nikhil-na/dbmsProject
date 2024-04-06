import React, { useState, useEffect } from "react";
import ExpenseForm from "../forms/expenseForm";
import NavbarDash from "./navDash";
import axios from "axios";

function ExpenseListPage() {
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenseList, setExpenseList] = useState([]);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    // Fetch expense data from the backend when the component mounts
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const authtoken = localStorage.getItem("authtoken");
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/expenses",
        {
          headers: {
            Authorization: `Bearer ${authtoken}`,
          },
        }
      );
      setExpenseList(response.data.expenses);
    } catch (error) {
      console.error("Failed to fetch expenses", error);
    }
  };

  // Function to handle adding a new expense
  const handleAddExpense = async (newExpense) => {
    const authtoken = localStorage.getItem("authtoken");
    console.log(authtoken);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/expenses/new",
        newExpense,
        {
          headers: {
            // 'Content-Type': 'application/json',
            Authorization: `Bearer ${authtoken}`,
          },
        }
      );
      fetchExpenses(); // Fetch updated expense list after adding the expense
    } catch (error) {
      console.error("Failed to add expense", error);
    }
  };

  // Function to handle submitting the expense form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create expense object
    const newExpense = {
      category,
      amount,
      description,
    };

    try {
      handleAddExpense(newExpense);

      // Reset form fields
      setCategory("");
      setAmount("");
      setDescription("");
      setShowExpenseForm(false); // Hide the expense form after submitting
    } catch (error) {
      console.error("Failed to add expense", error);
    }
  };

  // Function to handle canceling the expense form
  const handleCancel = () => {
    setShowExpenseForm(false); // Hide the expense form when canceled
  };

  // Function to toggle the expense form visibility
  const toggleExpenseForm = () => {
    setShowExpenseForm(!showExpenseForm);
  };

  return (
    <div className="h-screen">
      <NavbarDash />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mt-8 mb-4 text-center">
          Expense List
        </h1>
        <button
          onClick={toggleExpenseForm}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mx-auto mb-8"
        >
          Add new Expense
        </button>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border">
            {/* Table header */}
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {expenseList && expenseList.length > 0 ? (
                expenseList.map((expense, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{expense.category}</td>
                    <td className="border px-4 py-2">{expense.amount}</td>
                    <td className="border px-4 py-2">{expense.description}</td>
                    <td className="border px-4 py-2">
                      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2">
                        Edit
                      </button>
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border px-4 py-2" colSpan="4">
                    No expenses found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Render the add expense form if showExpenseForm is true */}
        {showExpenseForm && (
          <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold text-center mb-4">
              Add New Expense
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="amount"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpenseListPage;
