import React, { useState, useEffect } from "react";
import NavbarDash from "./navDash";
import axios from "axios";

function IncomePageList() {
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [incomeList, setIncomeList] = useState([]);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [editIncomeId, setEditIncomeId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteIncomeId, setDeleteIncomeId] = useState(null);

  useEffect(() => {
    // Fetch income data from the backend when the component mounts
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    const authtoken = localStorage.getItem("authtoken");
    try {
      const response = await axios.get("http://localhost:8080/api/v1/income", {
        headers: {
          Authorization: `Bearer ${authtoken}`,
        },
      });
      setIncomeList(response.data.Incomes);
    } catch (error) {
      console.error("Failed to fetch income", error);
    }
  };

  const handleSaveIncome = async () => {
    const authtoken = localStorage.getItem("authtoken");
    const incomeData = {
      category,
      amount,
      description,
    };

    try {
      if (editIncomeId) {
        // Update existing income
        await axios.put(
          `http://localhost:8080/api/v1/income/${editIncomeId}`,
          incomeData,
          {
            headers: {
              Authorization: `Bearer ${authtoken}`,
            },
          }
        );
        setIsEditing(false);
      } else {
        // Add new income
        await axios.post(
          "http://localhost:8080/api/v1/income/new",
          incomeData,
          {
            headers: {
              Authorization: `Bearer ${authtoken}`,
            },
          }
        );
      }

      // Fetch updated income list after adding or updating the income
      fetchIncomes();
      // Reset form fields
      setCategory("");
      setAmount("");
      setDescription("");
      setShowIncomeForm(false); // Hide the income form after submitting
    } catch (error) {
      console.error("Failed to save income", error);
    }
  };

  const deleteIncome = async (deleteIncomeId) => {
    const authtoken = localStorage.getItem("authtoken");

    await axios.delete(
      `http://localhost:8080/api/v1/income/${deleteIncomeId}`,
      {
        headers: {
          Authorization: `Bearer ${authtoken}`,
        },
      }
    );

    fetchIncomes();
  };

  // Function to handle submitting the income form
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSaveIncome();
  };

  // Function to handle canceling the income form
  const handleCancel = () => {
    setShowIncomeForm(false); // Hide the income form when canceled
  };

  // Function to handle editing an Income
  const handleEdit = async (incomeId) => {
    const incomeToEdit = incomeList.find((income) => income._id === incomeId);
    if (incomeToEdit) {
      setCategory(incomeToEdit.category);
      setAmount(incomeToEdit.amount);
      setDescription(incomeToEdit.description);
      setIsEditing(true);
      setEditIncomeId(incomeId); // Set the id of the income being edited
      setShowIncomeForm(!showIncomeForm);
    }
  };

  // Function to handle deleting an Income
  const handleDelete = (incomeId) => {
    const incomeToDelete = incomeList.find((income) => income._id === incomeId);
    if (incomeToDelete) {
      setDeleteIncomeId(incomeId);
      deleteIncome(incomeId);
    }
  };

  // Function to toggle the income form visibility
  const toggleIncomeForm = () => {
    setShowIncomeForm(!showIncomeForm);
  };

  return (
    <div className="h-screen">
      <NavbarDash />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mt-8 mb-4 text-center">
          Income List
        </h1>
        <button
          onClick={toggleIncomeForm}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mx-auto mb-8"
        >
          Add new Income
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
              {incomeList && incomeList.length > 0 ? (
                incomeList.map((income, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{income.category}</td>
                    <td className="border px-4 py-2">{income.amount}</td>
                    <td className="border px-4 py-2">{income.description}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleEdit(income._id)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(income._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border px-4 py-2" colSpan="4">
                    No Income found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Render the add income form if showExpenseForm is true */}
        {showIncomeForm && (
          <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold text-center mb-4">
              {isEditing ? "Edit Income" : "Add New Income"}
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
                  {isEditing ? "Save" : "Submit"}
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

export default IncomePageList;
