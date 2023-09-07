import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from '../homepage/Homepage';
import CompanyList from '../companies/CompanyList';
import JobList from '../jobs/JobList';
import CompanyDetail from '../companies/CompanyDetail';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';
import ProfileForm from '../profiles/ProfileForm';
import PrivateRoute from './PrivateRoute';

const NavRoutes = ({ login, signup }) => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<LoginForm login={login} />} />
                <Route path="/signup" element={<SignupForm signup={signup} />} />

                {/* Using PrivateRoute as a nested route */}
                <Route path="/companies" element={<PrivateRoute />}>
                    <Route index element={<CompanyList />} />
                </Route>
                <Route path="/companies/:handle" element={<PrivateRoute />}>
                    <Route index element={<CompanyDetail />} />
                </Route>
                <Route path="/jobs" element={<PrivateRoute />}>
                    <Route index element={<JobList />} />
                </Route>
                <Route path="/profile" element={<PrivateRoute />}>
                    <Route index element={<ProfileForm />} />
                </Route>
            </Routes>
        </div>
    );
};

export default NavRoutes;
