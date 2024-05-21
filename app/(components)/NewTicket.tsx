'use client'
import React, { useState } from 'react'

interface FormData {
    title: string;
    description: string;
    priority: number;
    dateAndTime: Date;
    deadline: Date;
}

const NewTicket = () => {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        priority: 0,
        dateAndTime: new Date(),
        deadline: new Date()
    });

    const resetFormData = () => {
        setFormData({
            title: '',
            description: '',
            priority: 0,
            dateAndTime: new Date(),
            deadline: new Date()
        });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "priority") {
            setFormData({
                ...formData,
                [name]: parseInt(value)
            });
        } else if (name === "deadline") {
            setFormData({
                ...formData,
                [name]: new Date(value)
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/ticket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Ticket Created');
                resetFormData();
            } else {
                console.error('Failed to create ticket');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className='m-4'>
            <form onSubmit={handleSubmit} className='flex flex-col text-white gap-4 justify-center items-center'>
                <div>
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" id="title" value={formData.title} className='text-black' onChange={handleChange} required />
                </div>
                <div className='text-center'>
                    <label htmlFor="description">Description: </label>
                    <textarea name="description" rows={4} cols={20} id="description" className='text-black' value={formData.description} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="priority">Priority: </label>
                    <input type="number" name="priority" id="priority" className='text-black' value={formData.priority} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="deadline">Deadline: </label>
                    <input type="date" name="deadline" id="deadline" className='text-black' value={formData.deadline.toISOString().split('T')[0]} onChange={handleChange} required />
                </div>
                <button type="submit" className='px-4 py-2 bg-blue-500 text-white rounded'>Submit</button>
            </form>
        </div>
    )
}

export default NewTicket;
    