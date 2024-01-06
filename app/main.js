import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function intToBin(num) {
  if (num < 2) {
    return num.toString()
  }
  return intToBin(Math.floor(num / 2)) + (num % 2).toString()
}

function binToInt(bin) {
  if (bin.length === 0) {
    return 0
  }
  return (binToInt(bin.slice(0, -1)) * 2) + parseInt(bin.slice(-1))
}

function Home() {
  const [result, setResult] = useState({});
  
  function handleInputChange(ev) {
    ev.preventDefault();
    const { name, value } = ev.target;
    if (name === "integer") {
      setResult((prevResult) => ({ ...prevResult, integer: value }));
      setResult((prevResult) => ({ ...prevResult, binary: intToBin(value) }));
    } else {
      setResult((prevResult) => ({ ...prevResult, binary: value }));
      setResult((prevResult) => ({ ...prevResult, integer: binToInt(value) }));
    }
  }
  

  return (
    <>
      <header className="w-100 bg-dark text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>Penrose Binary</h1>
            </div>
          </div>
        </div>
      </header>
      <main className="w-100">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 mx-auto">
              <h1>Penrose Binary</h1>
              <p>
                Penrose Binary is a simple web application that converts
                integers to binary and vice versa.
              </p>
              <form>
                <div className="mb-3">
                  <label htmlFor="integer" className="text-muted mb-2">Integer</label>
                  <input
                    type="number"
                    className="form-control"
                    name="integer"
                    id="integer"
                    placeholder="Enter an integer"
                    value={result.integer || ""}
                    onInput={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="binary" className="text-muted mb-2">Binary</label>
                  <input
                    type="text"
                    className="form-control"
                    name="binary"
                    id="binary"
                    placeholder="Enter a binary"
                    value={result.binary || ""}
                    onInput={handleInputChange}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-100 py-3 border-top">
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex justify-content-end">
              <p className="m-0">
                <small>
                  &copy; 2024{" "}
                  <a
                    className="text-secondary text-decoration-none"
                    href="https://github.com/alexsc6955" target="_blank">
                    Santiago Rincón
                    </a>
                </small>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);