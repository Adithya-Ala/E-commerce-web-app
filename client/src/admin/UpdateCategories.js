import React from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { useState } from "react";
import { isAutheticated } from "../auth/helper";
import { useEffect } from "react";
import { UpdateCategory, getCategory } from "./helper/adminapicall";

const UpdateCategories = ({match}) => {

    const {user,token} = isAutheticated();

    const [values, setValues] = useState({
        name:"",
        error:false,
        createdCategory: "",
        getaRedirect: false,
        loding:false
    });

    const {name,error,createdCategory,category,getaRedirect,loading} = values;
    

    const preload = (categoryId) => {
        getCategory(categoryId).then(data => {
            if(data.error) {
                setValues({...values,error:data.error});
            } else {
                setValues({
                    ...values,
                    name:data.name,
                    category:data
                })
            }
        })
    }

    useEffect(() => {
        preload(match.params.categoryId);
    },[]);

    const handleChange = name => event => {
        setValues({...values,[name] : event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values,error:"",loading:true});
        
        UpdateCategory(match.params.categoryId,user._id,token,name).then(data => {
            if(data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name:"",
                    error:false,
                    createdCategory: data.name,
                    loding:false
                })
            }
        })
    }

    const successMessage = () => (
        <div
          className="alert alert-success mt-3"
          style={{ display: createdCategory ? "" : "none" }}
        >
          <h4>{createdCategory} updated successfully</h4>
        </div>
      );

      const errorMessage = () => (
        <div
          className="alert alert-warning mt-3"
          style={{ display: error ? "" : "none" }}
        >
          <h4>{error}</h4>
        </div>
      );

    const updateCategoryForm = () => {
        return (
            <form>
                <p className="lead">Update your category here</p>
                <input type="text"
                    className="form-control my-3"
                    onChange={handleChange("name")}
                    value={name}
                    autoFocus
                    required
                    placeholder="For Ex. Summer"
                />
                <button onClick={onSubmit} className="btn btn-outline-info">
                    update Category
                </button>
            </form>
        )
    }

    return (
        <Base  title="Add a product here!"
        description="Welcome to product creation section"
        className="container bg-info p-4">
        <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
            Admin Home
        </Link>
        <div className="row bg-dark text-white rounded">
            <div className="col-md-8 offset-md-2">
            {errorMessage()}
            {successMessage()}
            {updateCategoryForm()}
            </div>
        </div>
        </Base>
    )
}

export default UpdateCategories;