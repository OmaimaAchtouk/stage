import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function test({ auth, data, users }) {
    const [values, setValues] = useState({
        first_name: "",
        last_name: "",
        email: "",
    })

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        router.post('/profile/add', values)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="first_name">First name:</label>
                <input id="first_name" value={values.first_name} onChange={handleChange} />
                <label htmlFor="last_name">Last name:</label>
                <input id="last_name" value={values.last_name} onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
            {users.map((user) =>
                <li key={user.id.toString()}>
                    {user.name}
                </li>
            )}
        </div>
    );
}
