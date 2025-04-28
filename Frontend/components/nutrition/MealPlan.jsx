import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MealPlan = () => {
  const navigate = useNavigate();

  const [mealPlan, setMealPlan] = useState(null);
  const [userData, setUserData] = useState(null);

  // Fetch user data from localStorage
  const fetchUserDataFromLocalStorage = () => {
    const storedUserData = localStorage.getItem('userFormData');
    if (storedUserData) {
      return JSON.parse(storedUserData);
    }
    return null;
  };

  const generateMealPlan = (userData) => {
    const { age, bmi, goal } = userData;

    // Meal plan decision logic
    if (age >= 18 && age <= 35) {
      if (bmi < 25 && goal === 'muscle_gain') return mealPlans.age18to35.underweightMuscleGain;
      if (bmi >= 25 && bmi < 30 && goal === 'muscle_gain') return mealPlans.age18to35.healthyMuscleGain;
      if (bmi >= 25 && bmi < 30 && goal === 'maintenance') return mealPlans.age18to35.healthyMaintenance;
      if (bmi > 30 && goal === 'weight_loss') return mealPlans.age18to35.overweightWeightLoss;
    }
    if (age >= 36 && age <= 50) {
      if (bmi >= 25 && bmi < 30 && goal === 'maintenance') return mealPlans.age36to50.healthyMaintenance;
      if (bmi > 30 && goal === 'weight_loss') return mealPlans.age36to50.overweightWeightLoss;
      if (bmi >= 25 && bmi < 30 && goal === 'muscle_gain') return mealPlans.age36to50.healthyMuscleGain;
    }
    if (age >= 51 && age <= 65) {
      if (bmi >= 25 && bmi < 30 && goal === 'maintenance') return mealPlans.age51to65.healthyMaintenance;
      if (bmi > 30 && goal === 'weight_loss') return mealPlans.age51to65.overweightWeightLoss;
    }
    if (age >= 65) {
      if (bmi >= 25 && bmi < 30 && goal === 'maintenance') return mealPlans.age65Plus.healthyMaintenance;
      if (bmi > 30 && goal === 'weight_loss') return mealPlans.age65Plus.overweightWeightLoss;
    }
    return null;
  };

  const handleGetMealPlan = () => {
    const userData = fetchUserDataFromLocalStorage();
    if (userData) {
      setUserData(userData);
      const mealPlan = generateMealPlan(userData);
      setMealPlan(mealPlan);
    } else {
      console.log('No user data found in localStorage!');
    }
  };

  const handleDownloadReport = () => {
    // Fetch user data and meal plan
    const userData = fetchUserDataFromLocalStorage();
    const mealPlanData = mealPlan;

    if (userData && mealPlanData) {
      // Prepare report content
      const reportContent = `
        User Data:
        Age: ${userData.age}
        Gender: ${userData.gender}
        BMI: ${userData.bmi}
        Activity Level: ${userData.activityLevel}
        Goal: ${userData.goal}
        Diet Type: ${userData.dietType}
        Meals Per Day: ${userData.mealsPerDay}
        
        Meal Plan:
        Title: ${mealPlanData.title}
        Non-Vegetarian Meals:
        ${mealPlanData.nonVegMeals.join('\n')}
        Vegetarian/Vegan Meals:
        ${mealPlanData.vegMeals.join('\n')}
      `;

      // Create a Blob from the report content
      const blob = new Blob([reportContent], { type: 'text/plain' });

      // Create a download link and trigger it
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'meal_plan_report.txt';
      document.body.appendChild(link);
      link.click();

      // Clean up the link
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    // Optionally, load the meal plan when the page is first loaded if data is available
    const storedUserData = fetchUserDataFromLocalStorage();
    if (storedUserData) {
      setUserData(storedUserData);
      const mealPlan = generateMealPlan(storedUserData);
      setMealPlan(mealPlan);
    }
  }, []);

  if (!mealPlan) {
    return (
      <div style={styles.pageContainer}>
        <div style={styles.overlay}></div>
        <div style={styles.outerBox}>
          <h1 style={styles.heading}>Your Personalized Meal Plan</h1>
          <button onClick={handleGetMealPlan} style={styles.submitButton}>
            Get My Meal Plan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.overlay}></div>
      <div style={styles.outerBox}>
        <h1 style={styles.heading}>Your Personalized Meal Plan</h1>

        <div style={styles.mealPlanContainer}>
          <h2>{mealPlan.title}</h2>
          <h3>Non-Vegetarian</h3>
          <ul>
            {mealPlan.nonVegMeals.map((meal, index) => (
              <li key={index}>{meal}</li>
            ))}
          </ul>

          <h3>Vegetarian/Vegan</h3>
          <ul>
            {mealPlan.vegMeals.map((meal, index) => (
              <li key={index}>{meal}</li>
            ))}
          </ul>
        </div>

        <button onClick={() => navigate('/UserForm')} style={styles.goBackButton}>
          Go Back
        </button>

        <button onClick={handleDownloadReport} style={styles.submitButton}>
          Download Report
        </button>
      </div>
    </div>
  );
};

const mealPlans = {
  age18to35: {
    underweightMuscleGain: {
      title: 'You are Underweight (BMI < 25) & Your goal is to gain muscles',
      nonVegMeals: [
        'Breakfast: Scrambled eggs with avocado toast and a protein smoothie',
        'Lunch: Grilled chicken with quinoa and steamed vegetables',
        'Dinner: Salmon with roasted sweet potatoes and sautéed spinach',
        'Snack: Greek yogurt with honey and almonds',
      ],
      vegMeals: [
        'Breakfast: Oatmeal with almond butter and banana',
        'Lunch: Chickpea and quinoa salad with tahini dressing',
        'Dinner: Lentil soup with brown rice and mixed greens',
      ],
    },
    healthyMuscleGain: {
      title: 'You are Healthy (BMI >= 25) & Your goal is to gain muscles',
      nonVegMeals: [
        'Breakfast: Omelet with spinach and feta cheese, whole wheat toast',
        'Lunch: Turkey and avocado wrap with roasted veggies',
        'Dinner: Grilled steak with mashed sweet potatoes and steamed asparagus',
      ],
      vegMeals: [
        'Breakfast: Chia seed pudding with berries and walnuts',
        'Lunch: Tofu stir-fry with quinoa and bell peppers',
        'Dinner: Lentil stew with whole wheat bread',
        'Snack: Roasted almonds and dark chocolate',
      ],
    },
    healthyMaintenance: {
      title: 'You are Healthy (BMI >= 25) & Your goal is to maintain your weight',
      nonVegMeals: [
        'Breakfast: Whole wheat pancakes with Greek yogurt and berries',
        'Lunch: Grilled salmon with roasted Brussels sprouts',
        'Dinner: Chicken and vegetable stir-fry with brown rice',
        'Snack: Carrot and cucumber sticks with hummus',
      ],
      vegMeals: [
        'Lunch: Quinoa salad with chickpeas, cucumber, and lemon dressing',
        'Dinner: Black bean soup with a whole wheat roll',
      ],
    },
  },
  // Define meal plans for other age groups (36-50, 51-65, 65+)
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
    padding: '1.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  },
  heading: {
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  mealPlanContainer: {
    padding: '20px',
  },
  goBackButton: {
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
  submitButton: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default MealPlan;
