
import React from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { deleteCategory, getCategories } from "./helper/adminapicall";
import { useState,useEffect } from "react";
import { isAutheticated } from "../auth/helper";

const ManageCategories = () => {

  const [categories, setCategories] = useState([]);
  const {user,token} = isAutheticated();

  const preload = () => {
    getCategories().then(data => {
      if(data.error) {
        console.log(data.error)
      } else {
        setCategories(data);
      }
    })
  }

  useEffect(() => {
    preload();
  },[]);

  return (
    <Base title="Category Management Area" description="Admin can manage categories here" className="container">
        <h2 className="mb-4 text-white">All Categories:</h2>
        <Link className="btn btn-info" to={`/admin/dashboard`}>
          <span className="">Admin Home</span>
        </Link>

        <div className="row">
          <div className="col-12">
            <h2 className="text-center text-white my-3">Categories</h2>
            {
               categories.map((category,index) => {
                  return (
                      <div key={index} className="row text-center mb-2 ">
                        <div className="col-4">
                          <h3 className="text-white text-left">{category.name}</h3>
                        </div>
                        <div className="col-4">
                          <Link
                            className="btn btn-success"
                            to={`/admin/category/update/${category._id}`}
                          >
                            <span className="">Update</span>
                          </Link>
                        </div>
                        <div className="col-4">
                          <button
                            onClick={() => {
                              deleteCategory(category._id,user._id,token);
                            }}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
               })
          }
          </div>
        </div>
    </Base>
  )
}

export default ManageCategories;

