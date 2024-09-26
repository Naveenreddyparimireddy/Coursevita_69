import React, { useState } from 'react';

const TaskForm = ({ onSubmit }) => {
    const [task, setTask] = useState('');
    const [deadline, setDeadline] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ task, deadline });
        setTask('');
        setDeadline('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Task:</label>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                required
            />
            <label>Deadline:</label>
            <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
            />
            <button type="submit">Assign Task</button>
        </form>
    );
};

export default TaskForm;
