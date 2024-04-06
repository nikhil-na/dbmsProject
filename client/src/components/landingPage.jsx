import React from "react";
import Navbar from "./partials/navbar";
import Footer from "./partials/footer";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="h-screen bg-slate-300">
      <Navbar role="sign up" />
      <div className="">
        <div className="grid grid-rows-2 pt-52">
          <h1
            className="text-5xl text-slate-900 text-center font-black"
            style={{ fontSize: "70px" }}
          >
            Control your finances with expense tracker
          </h1>
          <div
            className="mt-10 text-slate-700 text-center font-black"
            style={{ fontSize: "40px" }}
          >
            Track your spending and set financial goals.{" "}
          </div>
        </div>
        <div>
          <div className="flex flex-row justify-center mt-20">
            <Link to="/student/signup">
              <button
                type="submit"
                className="bg-slate-50 w-40 uppercase text-dark py-3 font-semi-bold rounded-full tracking-widest hover:bg-slate-400 hover:text-white"
                style={{ fontSize: "15px" }}
              >
                Get Started
              </button>
            </Link>
          </div>
          <div className="flex flex-row justify-center mt-10">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
