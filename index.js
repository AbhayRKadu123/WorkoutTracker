// Select form and elements
const workoutForm = document.getElementById('workout-form');
const workoutList = document.getElementById('workout-list');
const addSetButton = document.getElementById('add-set');

// Load existing workouts from localStorage
loadWorkouts();

// Handle form submission
workoutForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const muscleGroup = document.getElementById('muscle-group').value;
    const exerciseName = document.getElementById('exercise-name').value;

    const sets = [];
    document.querySelectorAll('#sets-container .set').forEach((set, index) => {
        const reps = set.children[0].value;
        const weight = set.children[1].value;
        sets.push({ reps, weight });
    });

    const workout = { id: Date.now(), muscleGroup, exerciseName, sets };

    // Save workout to localStorage
    saveWorkout(workout);

    // Update workout list display
    displayWorkout(workout);

    // Clear form fields
    workoutForm.reset();
    document.getElementById('sets-container').innerHTML = '';
    addInitialSet();
});

// Add more sets dynamically
addSetButton.addEventListener('click', () => {
    addSet();
});

// Save workout to localStorage
function saveWorkout(workout) {
    const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    workouts.push(workout);
    localStorage.setItem('workouts', JSON.stringify(workouts));
}

// Load workouts from localStorage and display them
function loadWorkouts() {
    const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    workouts.forEach(workout => displayWorkout(workout));
}

// Display a workout in the list
function displayWorkout(workout) {
    const workoutItem = document.createElement('li');
    workoutItem.setAttribute('data-id', workout.id);
    workoutItem.innerHTML = `
        <strong>${workout.muscleGroup}</strong> - ${workout.exerciseName}
        <ul>
            ${workout.sets.map((set, index) => `<li>Set ${index + 1}: ${set.reps} reps - ${set.weight} kg</li>`).join('')}
        </ul>
        <button class="delete-btn">Delete Workout</button>
    `;
    workoutList.appendChild(workoutItem);

    // Handle delete button click
    workoutItem.querySelector('.delete-btn').addEventListener('click', () => {
        deleteWorkout(workout.id);
    });
}

// Delete a workout from the list and localStorage
function deleteWorkout(id) {
    // Remove from localStorage
    let workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    workouts = workouts.filter(workout => workout.id !== id);
    localStorage.setItem('workouts', JSON.stringify(workouts));

    // Remove from the DOM
    const workoutItem = workoutList.querySelector(`[data-id="${id}"]`);
    if (workoutItem) {
        workoutList.removeChild(workoutItem);
    }
}

// Add an initial set to the form
function addInitialSet() {
    addSet();
}

// Add a new set input fields to the form
function addSet() {
    const setContainer = document.getElementById('sets-container');
    const setCount = setContainer.children.length + 1;
    const newSet = document.createElement('div');
    newSet.classList.add('set');
    newSet.innerHTML = `
        <input class="input-field" type="number" placeholder="Reps for Set ${setCount}" required>
        <input class="input-field" type="number" placeholder="Weight for Set ${setCount} (kg)" required>
    `;
    setContainer.appendChild(newSet);
}

// Initialize form with one set
addInitialSet();
// https://github.com/AbhayRKadu123/WORKOUTWEIGHTTRACKER.git