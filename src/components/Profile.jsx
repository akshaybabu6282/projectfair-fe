import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

function Profile() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className='shadow p-4 mb-4'>
                <div className='d-flex'>
                    <h5>Profile</h5>
                    <button className='ms-auto btn btn-dark' onClick={() => setOpen(!open)}>
                        {open ?
                            <i class="fa-solid fa-angle-up"></i> :
                            <i class="fa-solid fa-angle-down"></i>
                        }
                    </button>
                </div>
                <Collapse in={open}>
                    <div>
                        <div className='d-flex justify-content-center align-items-center'>
                            <label htmlFor="profileImg">
                                <input type="file" id='profileImg' style={{display:"none"}}/>
                                <img width='180px' className='mt-3' style={{borderRadius:"50%"}} src="https://imgs.search.brave.com/gR1Or_lqn2Ro6fs7Lg95_5Hf6mqcUWemy_nyYFG6Qi0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxMi8w/NC8xMy8yMS8wNy91/c2VyLTMzNjM4XzY0/MC5wbmc" alt="" />
                            </label>
                        </div>
                        <div>
                            <input type="text" placeholder='Github Link' className='form-control mb-3 mt-3'/>
                            <input type="text" placeholder='Linkedin Link' className='form-control mb-3'/>
                            <button className='btn btn-dark w-100'>UPDATE</button>
                        </div>
                    </div>
                </Collapse>

            </div>
        </>
    )
}

export default Profile