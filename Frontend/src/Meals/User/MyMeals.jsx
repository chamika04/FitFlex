import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../../components/Navbar";
import { FiArrowRight } from "react-icons/fi";

function MyMeals() {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div>
                <h1 className="card-title" style={{ color: 'white' }}> Calculate your BMI from here</h1>
                <p className="card-text" style={{ color: 'white' }}> We would like your review to improve our website. </p>
                <p className="card-text" style={{ color: 'white' }}> We would like your review to improve our website. </p>
            </div>

            {/* Background container - remains fixed */}
            <div
                className="contact_form  flex items-center justify-start bg-cover"
                style={{
                    minHeight: '100vh',
                    backgroundImage: `url('https://images.pexels.com/photos/28252346/pexels-photo-28252346/free-photo-of-hermoso-sandwich.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Wrapper div to shift the box only */}
                <div className="ml-[310px]"> {/* Moves the box slightly to the right */}
                    <div className="bg-white bg-opacity-70 border border-gray-300 p-8 rounded-lg shadow-lg"
                        style={{
                            border: '1px solid #ccc',
                            padding: '20px',
                            borderRadius: '5px',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                            margin: '20px 0',
                            maxWidth: '800px'
                        }}>
                        <div className="row">
                            <div className="col mb-3">
                                <div className="card" style={{ width: '22rem' }}>
                                    <img src="https://media.istockphoto.com/id/528072248/photo/bmi-body-mass-index-written-on-a-notepad-sheet.jpg?b=1&s=612x612&w=0&k=20&c=A1_t_wz-GymukQ_BWCex8ezZs0pnU0pYu7mdN_zto_Q=" className="card-img-top" alt="..." />
                                    <div className="card-body text-center">
                                        <h2 className="card-title" style={{ fontSize: '30px' }}>BMI Calculator</h2>
                                        
                                        <Link 
                                            to="/BMI" 
                                            className="btn btn-primary" 
                                            style={{ 
                                                backgroundColor: '#007bff', 
                                                color: '#fff', 
                                                border: 'none', 
                                                borderRadius: '5px', 
                                                padding: '10px 20px', 
                                                textDecoration: 'none', 
                                                transition: 'background-color 0.3s ease, color 0.3s ease' 
                                            }} 
                                            onMouseEnter={(e) => {
                                                e.target.style.backgroundColor = '#f59e0b'; // amber-500
                                                e.target.style.color = 'white';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.backgroundColor = '#007bff';
                                                e.target.style.color = '#fff';
                                            }}
                                            >
                                            Check out your BMI from here
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>

                {/* Wrapper div to shift the box only */}
                <div className="ml-[150px]"> {/* Moves the box slightly to the right */}
                    <div className="bg-white bg-opacity-70 border border-gray-300 p-8 rounded-lg shadow-lg"
                        style={{
                            border: '1px solid #ccc',
                            padding: '20px',
                            borderRadius: '5px',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                            margin: '20px 0',
                            maxWidth: '800px'
                        }}>
                        <div className="row">
                            <div className="col mb-3">
                                <div className="card" style={{ width: '22rem' }}>
                                    <img src="https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="card-img-top" alt="..." />
                                    <div className="card-body text-center">
                                        <h2 className="card-title" style={{ fontSize: '30px' }}>Nutrition Plan</h2>
                                        <Link 
                                            to="/UserForm" 
                                            className="btn btn-primary" 
                                            style={{ 
                                                backgroundColor: '#007bff', 
                                                color: '#fff', 
                                                border: 'none', 
                                                borderRadius: '5px', 
                                                padding: '10px 20px', 
                                                textDecoration: 'none', 
                                                transition: 'background-color 0.3s ease, color 0.3s ease' 
                                            }} 
                                            onMouseEnter={(e) => {
                                                e.target.style.backgroundColor = '#f59e0b'; // amber-500
                                                e.target.style.color = 'white';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.backgroundColor = '#007bff';
                                                e.target.style.color = '#fff';
                                            }}
                                            >
                                            Get your personalized meal
                                        </Link>


                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        </>
    );
}



export default MyMeals;
