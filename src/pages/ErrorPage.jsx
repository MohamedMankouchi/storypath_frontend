import React from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {

    const error = useRouteError();


  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center row">
            
            <div className=" col-md-6 mt-5">
                <p className="fs-3"> <span className="text-danger">Oops!</span> Page not found.</p>
                <p className="lead">
                    {error.status} {error.statusText} {error.message}
                </p>
                <a href="/" className="btn btn-primary">Go Home</a>
            </div>

        </div>
    </div>  
  )
}

export default ErrorPage