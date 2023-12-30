import { useState, useEffect } from 'react';
import './App.css';

/**
 *
 * Waffles can only be on saturdays
 * Crepes need to repeat two days in a row
 *
 */

// Define a function to fetch meals from markdown file and store in memory
const meals: string[] = [
  'Roasted chicken and veggies',
  'Home made chicken broth',
  'Grilled cheese and tomato soup',
  'Meat buns',
  'Perogies and farmer sausage',
  'Mashed potatoes and meat loaf',
  'Pizza',
  'Mac and cheese sauce',
  'Shepherds pie',
  'Pasties',
  'Maple butternut squash and apple soup',
  'Busy day soup',
  'Spaghetti',
  'Tacos',
  'Lasagna',
  'Burgers',
  'Roasted chicken and veggies',
];

// Define a second list for lunch meals
const lunchMeals: string[] = [
  'Sandwich',
  'Salad',
  'Soup',
  'Pasta',
  'Peanut butter and jelly',
  'Egg salad',
  'Grilled cheese',
  'Egg wraps',
  'Sandwiches',
  'Quesadillas',
  'Bread',
  'Charcuterie',
];

// Define a third list for breakfast meals
const breakfastMeals: string[] = [
  'Pancakes',
  'Waffles',
  'Crepes',
  'Muffins',
  'Scones',
  'Cinnamon buns',
  'Bacon and eggs',
  'Bagels',
  'Toast',
  'cereal',
  'Oatmeal',
  'Scrambled eggs',
  'Yogurt and granola',
];

// Define a React component to display the list of meals for each day of the week for the current, previous and next weeks
// The tables are arranged horizontally and each week's date is clearly noted
const MealList = () => {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const [selectedMeals, setSelectedMeals] = useState<string[][]>([]);
  const [selectedLunchMeals, setSelectedLunchMeals] = useState<string[][]>([]);
  const [selectedBreakfastMeals, setSelectedBreakfastMeals] = useState<
    string[][]
  >([]);
  const [weekDates, setWeekDates] = useState<string[]>([]);

  useEffect(() => {
    const rotationIndex = new Date().getDay();
    const rotatedMeals = [
      ...meals.slice(rotationIndex),
      ...meals.slice(0, rotationIndex),
      ...meals,
    ];
    const rotatedLunchMeals = [
      ...lunchMeals.slice(rotationIndex),
      ...lunchMeals.slice(0, rotationIndex),
      ...lunchMeals,
    ];
    const rotatedBreakfastMeals = [
      ...breakfastMeals.slice(rotationIndex),
      ...breakfastMeals.slice(0, rotationIndex),
      ...breakfastMeals,
    ];
    const currentWeekMeals = rotatedMeals.slice(0, 7);
    const currentWeekLunchMeals = rotatedLunchMeals.slice(0, 7);
    const currentWeekBreakfastMeals = rotatedBreakfastMeals.slice(0, 7);
    const previousWeekMeals = rotatedMeals.slice(
      rotatedMeals.length - 7,
      rotatedMeals.length,
    );
    const previousWeekLunchMeals = rotatedLunchMeals.slice(
      rotatedLunchMeals.length - 7,
      rotatedLunchMeals.length,
    );
    const previousWeekBreakfastMeals = rotatedBreakfastMeals.slice(
      rotatedBreakfastMeals.length - 7,
      rotatedBreakfastMeals.length,
    );
    const nextWeekMeals = rotatedMeals.slice(7, 14);
    const nextWeekLunchMeals = rotatedLunchMeals.slice(7, 14);
    const nextWeekBreakfastMeals = rotatedBreakfastMeals.slice(7, 14);

    function ruleBasedReorganization(meals: string[]) {
      /**
       *
       * Waffles can only be on saturdays
       * Crepes need to repeat two days in a row
       *
       * Other rules may be added as needed
       */
      const wafflesIndex = meals.indexOf('Waffles');
      const crepesIndex = meals.indexOf('Crepes');

      if (wafflesIndex !== -1) {
        meals.splice(wafflesIndex, 1);
        meals.push('Waffles');
      }

      if (crepesIndex !== -1) {
        meals.splice(crepesIndex, 1);
        meals.splice(crepesIndex + 1, 0, 'Crepes');
        meals.splice(crepesIndex + 2, 0, 'Crepes');
      }

      return meals;
    }

    ruleBasedReorganization(currentWeekMeals);
    ruleBasedReorganization(currentWeekLunchMeals);
    ruleBasedReorganization(currentWeekBreakfastMeals);
    ruleBasedReorganization(previousWeekMeals);
    ruleBasedReorganization(previousWeekLunchMeals);
    ruleBasedReorganization(previousWeekBreakfastMeals);
    ruleBasedReorganization(nextWeekMeals);
    ruleBasedReorganization(nextWeekLunchMeals);
    ruleBasedReorganization(nextWeekBreakfastMeals);

    function testRules(meals: string[]) {
      // Check that waffles only occur on Saturday
      const wafflesIndex = meals.indexOf('Waffles');
      if (wafflesIndex !== -1 && wafflesIndex !== 6) {
        console.log('Waffles are not on Saturday');
      }

      // Check that crepes repeat two days in a row
      const crepesIndex = meals.indexOf('Crepes');
      if (crepesIndex !== -1 && meals[crepesIndex + 1] !== 'Crepes') {
        console.log('Crepes do not repeat two days in a row');
      }
    }

    try {
      testRules(currentWeekMeals);
      testRules(currentWeekLunchMeals);
      testRules(currentWeekBreakfastMeals);
      testRules(previousWeekMeals);
      testRules(previousWeekLunchMeals);
      testRules(previousWeekBreakfastMeals);
      testRules(nextWeekMeals);
      testRules(nextWeekLunchMeals);
      testRules(nextWeekBreakfastMeals);
    } catch (error) {
      console.log('Test failed!', error);
    }

    setSelectedMeals([previousWeekMeals, currentWeekMeals, nextWeekMeals]);
    setSelectedLunchMeals([
      previousWeekLunchMeals,
      currentWeekLunchMeals,
      nextWeekLunchMeals,
    ]);
    setSelectedBreakfastMeals([
      previousWeekBreakfastMeals,
      currentWeekBreakfastMeals,
      nextWeekBreakfastMeals,
    ]);

    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    setWeekDates([
      lastWeek.toLocaleDateString(),
      today.toLocaleDateString(),
      nextWeek.toLocaleDateString(),
    ]);
  }, []);

  return (
    <div
      className="week-container"
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      {selectedMeals.map((weekMeals, weekIndex) => (
        <div
          key={weekIndex}
          style={{
            width: '30%',
            border: '1px solid black',
            padding: '1rem',
            margin: '0.5rem',
          }}
        >
          <h2>
            {weekIndex === 1 ? (
              <>
                {weekDates[weekIndex]}
                <br />
                This coming week
              </>
            ) : (
              weekDates[weekIndex]
            )}
          </h2>
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Meal</th>
              </tr>
            </thead>
            <tbody>
              {daysOfWeek.map((day, index) => (
                <>
                  <tr
                    key={`breakfast-${index}`}
                    style={{ backgroundColor: '#ddedf4', marginTop: '0.2rem' }}
                  >
                    <td>{day}</td>
                    <td>{selectedBreakfastMeals[weekIndex][index]}</td>
                  </tr>
                  <tr
                    key={`lunch-${index}`}
                    style={{ backgroundColor: '#d9f3e2' }}
                  >
                    <td></td>
                    <td>{selectedLunchMeals[weekIndex][index]}</td>
                  </tr>
                  <tr
                    key={`dinner-${index}`}
                    style={{ backgroundColor: '#f5dbe4' }}
                  >
                    <td></td>
                    <td>{weekMeals[index]}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

function App() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <h1>Vite + React</h1>
      <p>Current date: {currentDate}</p>
      <MealList />
    </>
  );
}

export default App;
