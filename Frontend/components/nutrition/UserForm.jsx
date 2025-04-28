import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserForm = ({ setUserData }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("userFormData");
    return savedData
      ? JSON.parse(savedData)
      : {
          age: '',
          gender: '',
          bmi: '',
          activityLevel: '',
          goal: '',
          dietType: '',
          mealsPerDay: '',
        };
  });

  useEffect(() => {
    localStorage.setItem("userFormData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!formData.age || !formData.gender || !formData.bmi || !formData.activityLevel || !formData.goal || !formData.dietType || !formData.mealsPerDay) {
      alert('Please fill in all required fields');
      return;
    }

    // Log and save the form data temporarily
    console.log('Form data saved temporarily:', formData);
    localStorage.setItem("userFormData", JSON.stringify(formData));
    alert('Your data has been saved temporarily.');

    // Reset form data after submission
    setFormData({
      age: '',
      gender: '',
      bmi: '',
      activityLevel: '',
      goal: '',
      dietType: '',
      mealsPerDay: '',
    });

    // Navigate to the MealPlan page
    navigate("/MealPlan");
  };

  // Calculate BMI category
  const bmi = parseFloat(formData.bmi);
  const isUnderweight = bmi < 25;
  const isHealthy = bmi >= 25 && bmi < 30;
  const isOverweight = bmi > 30;

  return (
    <div style={styles.pageContainer}>
      <div style={styles.overlay}></div>
      <div style={styles.outerBox}>
        <h1 style={styles.heading}>Personalized Nutrition Plan</h1>

        <div style={styles.scrollContainer}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.twoColumn}>
              <div style={styles.inputGroup}>
                <label>Age</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} required min="18" max="100" style={styles.input} />
              </div>

              <div style={styles.inputGroup}>
                <label>Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange} style={{ ...styles.select, opacity: formData.gender ? '1' : '0.5' }}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div style={{ ...styles.inputGroup, display: 'flex', alignItems: 'center' }}>
              <div style={{ flexGrow: 1 }}>
                <label>BMI</label>
                <input type="number" name="bmi" value={formData.bmi} onChange={handleChange} placeholder="Enter or calculate" style={styles.input} />
              </div>
              <button type="button" onClick={() => navigate('/BMI')} style={styles.bmiButton}>
                Calculate BMI
              </button>
            </div>

            <div style={styles.twoColumn}>
              <div style={styles.inputGroup}>
                <label>Activity Level</label>
                <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} style={{ ...styles.select, opacity: formData.activityLevel ? '1' : '0.5' }}>
                  <option value="">Select</option>
                  <option value="lightly_active">Lightly Active</option>
                  <option value="moderately_active">Moderately Active</option>
                  <option value="very_active">Very Active</option>
                </select>
              </div>

              <div style={styles.inputGroup}>
                <label>Fitness Goal</label>
                <select 
                  name="goal" 
                  value={formData.goal} 
                  onChange={handleChange} 
                  style={{ ...styles.select, opacity: formData.goal ? '1' : '0.5' }}
                >
                  <option value="">Select</option>
                  {isUnderweight || isHealthy ? <option value="muscle_gain">Muscle Gain</option> : null}
                  {isHealthy ? <option value="maintenance">Maintenance</option> : null}
                  {isOverweight ? <option value="weight_loss">Weight Loss</option> : null}
                </select>
              </div>
            </div>

            <div style={styles.twoColumn}>
              <div style={styles.inputGroup}>
                <label>Diet Type</label>
                <select name="dietType" value={formData.dietType} onChange={handleChange} style={{ ...styles.select, opacity: formData.dietType ? '1' : '0.5' }}>
                  <option value="">Select</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="keto">Non-Veg</option>
                </select>
              </div>

              <div style={styles.inputGroup}>
                <label>Meals Per Day</label>
                <input type="number" name="mealsPerDay" value={formData.mealsPerDay} onChange={handleChange} placeholder="Enter meals per day" min="2" max="6" style={styles.input} />
              </div>
            </div>

            {/* Submit Button */}
            <button type="button" onClick={handleSubmit} style={styles.submitButton}>
              Submit
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    position: 'relative',
    minHeight: '100vh',
    background: 'url("https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2") no-repeat center center/cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  outerBox: {
    position: 'relative',
    width: '500px',
    height: '80vh',
    padding: '1.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    backdropFilter: 'blur(0px)',
    overflow: 'hidden',
  },
  scrollContainer: {
    height: 'calc(100% - 50px)',
    overflowY: 'auto',
    paddingRight: '10px',
  },
  heading: {
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  twoColumn: {
    display: 'flex',
    gap: '15px',
  },
  inputGroup: {
    flex: 1,
    marginBottom: '1rem',
  },
  input: {
    width: '100%',
    padding: '0.7rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  select: {
    width: '100%',
    padding: '0.7rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  bmiButton: {
    marginLeft: '10px',
    padding: '0.5rem 1rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  submitButton: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default UserForm;
