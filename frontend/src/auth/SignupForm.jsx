import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";
import Alert from "../common/Alert";

const SignupForm = ({ signup }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    let res = await signup(formData);
    if (res.success) {
      navigate("/companies");
    } else {
      setFormErrors(res.errors);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '70%',
      marginTop: '45px'
  }}>
			<div>
				<form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
          <h2>Sign Up</h2>
          <div>
            <label htmlFor="username">Username</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <label htmlFor="firstName">First name</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <label htmlFor="lastName">Last name</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <button onClick={handleSubmit}>Submit</button>

          {formErrors.length ? <Alert messages={formErrors} /> : null}
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
