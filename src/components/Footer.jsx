import React from 'react'
import { Link } from 'react-router-dom'


function Footer() {
    return (

        <div className='d-flex justify-content-center align-items-center bg-success p-3'>
            <div className='footer d-flex align-items-center justify-content-evenly'>
                <div style={{ width: '400px' }}>
                    <h5 className='textStyle'><i class="fa-brands fa-stack-overflow"></i> Project Fair</h5>
                    <p style={{ textAlign: 'justify' }} className='textStyle'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id sapiente neque, dignissimos ullam placeat dolore aliquid doloremque porro ipsum vitae quas ad consectetur? Expedita similique velit, debitis quae ab ea?</p>
                </div>
                <div className='d-flex flex-column ms-5'>
                    <h4 className='textStyle'>Links</h4>
                    <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
                        Home
                    </Link>
                    <Link to='/dashboard' style={{ textDecoration: 'none', color: 'black' }}>
                        Dashboard
                    </Link>
                    <Link to='/project' style={{ textDecoration: 'none', color: 'black' }}>
                        Project
                    </Link>
                </div>
                <div className='d-flex flex-column ms-5'>
                    <h4 className='textStyle'>Guides</h4>
                    <Link to='https://react.dev/' target='_blank' style={{ textDecoration: 'none', color: 'black' }}>
                        React
                    </Link>
                    <Link to='https://react-bootstrap.github.io/' target="_blank" style={{ textDecoration: 'none', color: 'black' }}>
                        React Bootsrap
                    </Link>
                    <Link to='https://www.npmjs.com/package/json-server' target="_blank" style={{ textDecoration: 'none', color: 'black' }}>
                        Json Server
                    </Link>
                </div>
                <div className='ms-5'>
                    <h4 className='textStyle'>Contact US</h4>
                    <div className='d-flex'>
                        <input type="text" className='form-control' placeholder='Enter your email Id' />
                        <button className='btn btn-warning ms-2'>SUBSCRIBE</button>
                    </div>
                    <div className='d-flex justify-content-evenly align-items-center mt-3' >
                        <Link style={{ textDecoration: 'none', color: 'black' }}>
                            <i class="fa-brands fa-instagram fa-2x"></i>
                        </Link>
                        <Link style={{ textDecoration: 'none', color: 'black' }}>
                            <i class="fa-brands fa-twitter fa-2x"></i>
                        </Link>
                        <Link style={{ textDecoration: 'none', color: 'black' }}>
                            <i class="fa-brands fa-facebook fa-2x"></i>
                        </Link>
                        <Link style={{ textDecoration: 'none', color: 'black' }}>
                            <i class="fa-brands fa-reddit fa-2x"></i>
                        </Link>
                    </div>


                </div>
            </div>
        </div>

    )
}

export default Footer