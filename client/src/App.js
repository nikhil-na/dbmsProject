import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./components/landingPage";
import Login from "./components/user/login";
import Dashboard from "./components/dashboard";
import Signup from "./components/user/signup";
import ExpenseForm from "./components/forms/expenseForm";
import IncomeForm from "./components/forms/incomeForm";
import ExpenseListPage from "./components/pages/expensePage";
import IncomeListPage from "./components/pages/incomePage";
import ChartJs from "./components/chart/chart";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chart" element={<ChartJs />} />
        <Route path="/student/login" element={<Login />} />
        <Route path="/student/signup" element={<Signup />} />
        <Route path="/expense/new" element={<ExpenseForm />} />
        <Route path="/income/new" element={<IncomeForm />} />
        <Route path="/expenses" element={<ExpenseListPage />} />
        <Route path="/income" element={<IncomeListPage />} />
      </Routes>
    </BrowserRouter>
  );
}
