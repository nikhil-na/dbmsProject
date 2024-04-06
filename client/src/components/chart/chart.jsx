import React, { useEffect, useState } from "react";
import axios from "axios";

import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart, ArcElement } from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBillWave,
  faShoppingCart,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";

function ChartJs() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  Chart.register(ArcElement);

  useEffect(() => {
    const fetchIncomeAndExpense = async () => {
      const authToken = localStorage.getItem("authtoken");
      try {
        // Fetch income of the currently logged-in user
        const incomeResponse = await axios.get(
          "http://localhost:8080/api/v1/income",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        // Fetch expenses of the currently logged-in user
        const expenseResponse = await axios.get(
          "http://localhost:8080/api/v1/expenses",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        // Set the fetched data

        setIncomes(incomeResponse.data.Incomes);
        setExpenses(expenseResponse.data.expenses);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchIncomeAndExpense();
  }, []); // TODO: ADD A DEPENENCY (USER) HERE

  useEffect(() => {
    let totalIncome = 0;
    let totalExpense = 0;

    if (Array.isArray(incomes) && incomes.length > 0) {
      console.log(incomes);
      totalIncome = incomes.reduce((total, income) => total + income.amount, 0);
    }

    if (Array.isArray(expenses) && expenses.length > 0) {
      totalExpense = expenses.reduce(
        (total, expense) => total + expense.amount,
        0
      );
    }

    const balance = totalIncome - totalExpense;

    setTotalIncome(totalIncome);
    setTotalExpense(totalExpense);
    setBalance(balance);
  }, [incomes, expenses]);

  // Prepare data for the chart
  const chartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: [
          "rgba(200, 230, 203, 0.6)", // Income color
          "rgba(255, 99, 132, 0.6)", // Expense color
        ],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
        formatter: (value, ctx) => {
          let sum = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
          if (sum === 0) return "0%";
          const percentage = ((value / sum) * 100).toFixed(2);
          return `${percentage}%`;
        },
        color: "black",
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        bottom: 20,
      },
    },
  };

  return (
    <div className="container mx-auto">
      <h1 className="mb-10 mt-10 text-center text-3xl font-bold">
        Welcome to your Dashboard!
      </h1>

      <div className="flex justify-center mt-5">
        <div className="w-full lg:w-1/2 lg:flex lg:justify-between">
          <div className="bg-green-200 rounded-lg p-4 lg:w-1/2 lg:mr-4 flex flex-col items-center justify-center">
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faMoneyBillWave}
                className="text-xl mr-2"
              />
              <h2 className="text-xl font-bold">Total Income</h2>
            </div>
            <p className="text-2xl font-semibold">{totalIncome}</p>
          </div>

          <div className="bg-red-200 rounded-lg p-4 lg:w-1/2 lg:ml-4 flex flex-col items-center justify-center">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faShoppingCart} className="text-xl mr-2" />
              <h2 className="text-xl font-bold">Total Expense</h2>
            </div>
            <p className="text-2xl font-semibold">{totalExpense}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <div className="w-full lg:w-1/2">
          <div className="bg-yellow-200 rounded-lg p-4 flex flex-col items-center justify-center">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faWallet} className="text-xl mr-2" />
              <h2 className="text-xl font-bold">Balance</h2>
            </div>
            <p className="text-2xl font-semibold">{balance}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <div className="w-full lg:w-3/4">
          <div className="bg-white rounded-lg p-4">
            <div className="chart-container" style={{ height: "300px" }}>
              <Pie
                data={chartData}
                options={chartOptions}
                plugins={[ChartDataLabels]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartJs;
