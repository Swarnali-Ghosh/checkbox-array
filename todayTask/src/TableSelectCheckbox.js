import React, { useState, useEffect } from 'react';
// react-js-table-with-checkbox-selectall
const TableSelectCheckbox = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'John', email: 'john@example.com', age: 25 },
        { id: 2, name: 'Jane', email: 'jane@example.com', age: 30 },
        { id: 3, name: 'Bob', email: 'bob@example.com', age: 35 },
    ]);

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);

    const selectAll = () => {
        if (isAllSelected) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(users.map(user => user.name));
        }
        setIsAllSelected(!isAllSelected);
    };

    const handleUserSelect = (user) => {
        if (selectedUsers.includes(user.name)) {
            setSelectedUsers(prevSelectedUsers => prevSelectedUsers.filter(name => name !== user.name));
        } else {
            setSelectedUsers(prevSelectedUsers => [...prevSelectedUsers, user.name]);
        }
    };

    const isUserSelected = (user) => {
        return selectedUsers.includes(user.name);
    };

    useEffect(() => {
        setIsAllSelected(selectedUsers.length === users.length);
    }, [selectedUsers, users.length]);

    return (
        <div className='container'>
            <h3>React Js Table with Checkbox | SelectAll</h3>
            <p className="selected-users">{selectedUsers.join(', ')}</p>
            <table>
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                checked={isAllSelected}
                                onChange={selectAll}
                            />
                        </th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={isUserSelected(user)}
                                    onChange={() => handleUserSelect(user)}
                                />
                            </td>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableSelectCheckbox;
