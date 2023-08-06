import { API } from "../../backend";

export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};


//get All categories
export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    }).then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}
export const getCategory = (categoryId) => {
    return fetch(`${API}/category/${categoryId}`, {
        method: "GET"
    }).then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}


export const UpdateCategory = (categoryId,userId,token,categoryName) => {
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"Application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ "name": categoryName })
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
}

//Delete category

export const deleteCategory = (categoryId, userId, token) => {
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:"DELETE",
        headers: {
            Accept:"Application/json",
            Authorization:`Bearer ${token}`
        }
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
}

//product calls

//create prod
export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

//GetAll Prod
export const getProducts = () => {
    console.log("hello")
    return fetch(`${API}/products`, {
        method: "GET"
    }).then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

//getProd
export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    }).then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

//update prod
export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

//delete prod
export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}