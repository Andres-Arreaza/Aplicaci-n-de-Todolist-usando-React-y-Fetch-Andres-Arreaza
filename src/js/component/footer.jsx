import React from "react";

export const Footer = () => {
    return (
      <footer>
        <div className="container-fluid bg-dark p-3 text-center">
          <div className="row">
            <div className="col-lg-12">
              <p className="">
                &copy; 2024 {" "}
                <a href="https://github.com/Andres-Arreaza" target="_blank" rel="noopener noreferrer">Andrés Arreaza</a>{". "}
                Made at {" "}
                <a href="https://www.4geeksacademy.com" target="_blank" rel="noopener noreferrer">4GeeksAcademy</a>{". "}
                </p>
            </div>
          </div>
        </div>
      </footer>
    );
 };