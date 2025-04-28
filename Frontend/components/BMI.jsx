import React, { useState } from 'react';
import Navbar from '../components/Navbar';

function BMI() {
  const [weight, setWeight] = useState();
  const [weightlb, setWeightlb] = useState();
  const [weightkg, setWeightkg] = useState();
  const [heightin, setHeightin] = useState();
  const [heightcm, setHeightcm] = useState();
  const [height, setHeight] = useState();
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');

  let calcBmi = (event) => {
    // Prevent submitting
    event.preventDefault();

    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height');
    } else {
      let bmi = (weight / (height * height) * 10000);
      setBmi(bmi.toFixed(1));

      // Logic for message
      if (bmi < 25) {
        setMessage('You are underweight');
      } else if (bmi >= 25 && bmi < 30) {
        setMessage('You are a healthy weight');
      } else {
        setMessage('You are overweight');
      }
    }
  }

  // Show image based on BMI calculation
  let imgSrc;

  if (bmi < 1) {
    imgSrc = null;
  } else {
    if (bmi < 25) {
      imgSrc = ('../assets/underweight.png');
    } else if (bmi >= 25 && bmi < 30) {
      imgSrc = ('../assets/healthy.png');
    } else {
      imgSrc = ('../assets/overweight.png');
    }
  }

  let reload = () => {
    window.location.reload();
  }

  // Weight converter
  let calcWei = (event) => {
    // Prevent submitting
    event.preventDefault();

    if (weightlb === 0) {
      alert('Please enter a valid weight');
    } else {
      let weightkg = (weightlb * 0.453592);
      setWeightkg(weightkg.toFixed(1));
    }
  }

  // Height converter
  let calcHei = (event) => {
    // Prevent submitting
    event.preventDefault();

    if (heightin === 0) {
      alert('Please enter a valid height');
    } else {
      let heightcm = (heightin * 2.54);
      setHeightcm(heightcm.toFixed(2));
    }
  }

  return (
    <>
      <Navbar />
      <div>
        <h1 className="card-title" style={{ color: 'white' }}> Instructor Reviews</h1>
        <p className="card-text" style={{ color: 'white' }}> We would like your review to improve our website. </p>
        <p className="card-text" style={{ color: 'white' }}> We would like your review to improve our website. </p>
      </div>
      <div
        className="contact_form mt-5 flex items-center justify-center bg-cover"
        style={{
          minHeight: '100vh',
          backgroundImage: `url('https://images.pexels.com/photos/1153655/pexels-photo-1153655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-white bg-opacity-80 border border-gray-300 p-8 rounded-lg shadow-lg"
          style={{
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '5px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
            margin: '20px auto',
            maxWidth: '800px'
          }}>
          <div className="row">
            <div className="col mb-3">
              <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                  <h2 className='text-center' style={{ fontSize: '20px' }} > BMI Calculator</h2>
                  <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={calcBmi}>
                    <div className='mb-4'>
                      <label className='block text-gray-700 text-sm font-bold mb-2'>Weight (kg)</label>
                      <input className='shadow appearance-none border rounded w-ull py-2 px-3 text-gray-700 leading-tight focus:outline' value={weight} onChange={(e) => setWeight(e.target.value)} placeholder='weight' type='text' required pattern='\d+' />
                    </div>
                    <div className='mb-4'>
                      <label className='block text-gray-700 text-sm font-bold mb-2'>Height (cm)</label>
                      <input className='shadow appearance-none border rounded w-ull py-2 px-3 text-gray-700 leading-tight focus:outline' value={height} onChange={(event) => setHeight(event.target.value)} placeholder='height' type='text' required pattern='\d+' />
                    </div>
                    <div className='flex items-center space-x-6 lg:space-x-3 justify-center mb-4'>
                      <button className='bg-blue-600 text-white px-2 py-1 rounded-lg' type='submit'>Calculate</button>
                      <button className='bg-green-600 text-white px-2 py-1 rounded-lg' onClick={reload} type='submit'>Clear</button>
                    </div>

                    <div className='center'>
                      <h3 style={{ fontSize: '20px' }}>Your BMI is: {bmi}</h3>
                      <p style={{ fontWeight: 'bold', color: bmi < 25 ? 'red' : bmi >= 25 && bmi < 30 ? 'green' : 'red' }}>{message}</p>
                    </div>

                    <div className='img-container'>
                      <img src={imgSrc} alt=''></img>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weight Converter */}
        <div className="bg-white bg-opacity-80 border border-gray-300 p-8 rounded-lg shadow-lg"
          style={{
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '5px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
            margin: '20px auto',
            maxWidth: '800px'
          }}>
          <div className="row">
            <div className="col mb-3">
              <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                  <h2 className='text-center' style={{ fontSize: '20px' }}>Weight Converter (lbs to kg)</h2>
                  <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={calcWei}>
                    <div className='mb-4'>
                      <label className='block text-gray-700 text-sm font-bold mb-2'>Weight (lbs)</label>
                      <input className='shadow appearance-none border rounded w-ull py-2 px-3 text-gray-700 leading-tight focus:outline' value={weightlb} onChange={(e) => setWeightlb(e.target.value)} placeholder='weight (lbs)' type='text' required pattern='\d+' />
                    </div>
                    <div className='mb-4'>
                      <label className='block text-gray-700 text-sm font-bold mb-2'>Weight (kg)</label>
                      <input className='shadow appearance-none border rounded w-ull py-2 px-3 text-gray-700 leading-tight focus:outline' value={weightkg} readOnly />
                    </div>
                    <div className='flex items-center space-x-6 lg:space-x-3 justify-center mb-4'>
                      <button className='bg-blue-600 text-white px-2 py-1 rounded-lg' type='submit'>Convert</button>
                      <button className='bg-green-600 text-white px-2 py-1 rounded-lg' onClick={reload} type='submit'>Clear</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Height Converter */}
        <div className="bg-white bg-opacity-80 border border-gray-300 p-8 rounded-lg shadow-lg"
          style={{
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '5px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
            margin: '20px auto',
            maxWidth: '800px'
          }}>
          <div className="row">
            <div className="col mb-3">
              <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                  <h2 className='text-center' style={{ fontSize: '20px' }}>Height Converter (in to cm)</h2>
                  <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={calcHei}>
                    <div className='mb-4'>
                      <label className='block text-gray-700 text-sm font-bold mb-2'>Height (inches)</label>
                      <input className='shadow appearance-none border rounded w-ull py-2 px-3 text-gray-700 leading-tight focus:outline' value={heightin} onChange={(e) => setHeightin(e.target.value)} placeholder='height (in)' type='text' required pattern='\d+' />
                    </div>
                    <div className='mb-4'>
                      <label className='block text-gray-700 text-sm font-bold mb-2'>Height (cm)</label>
                      <input className='shadow appearance-none border rounded w-ull py-2 px-3 text-gray-700 leading-tight focus:outline' value={heightcm} readOnly />
                    </div>
                    <div className='flex items-center space-x-6 lg:space-x-3 justify-center mb-4'>
                      <button className='bg-blue-600 text-white px-2 py-1 rounded-lg' type='submit'>Convert</button>
                      <button className='bg-green-600 text-white px-2 py-1 rounded-lg' onClick={reload} type='submit'>Clear</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BMI;
