 
      document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        showMainContent();
    }

    // Login form handling
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.get('email'),
                    phone: formData.get('phone')
                })
            });

            const data = await response.json();
            if (data.success) {
                localStorage.setItem('user', JSON.stringify(data.user));
                showMainContent();
            } else {
                alert('Invalid credentials. Please try again.');
            }
        } catch (error) {
            alert('Error logging in. Please try again.');
        }
    });

    // Signup form handling
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(signupForm);
        
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    phone: formData.get('phone')
                })
            });

            const data = await response.json();
            if (data.success) {
                alert('Sign up successful! Please login.');
                toggleForms();
                signupForm.reset();
            } else {
                alert(data.message || 'Error signing up. Please try again.');
            }
        } catch (error) {
            alert('Error signing up. Please try again.');
        }
    });

    // Academic form handling
    const academicForm = document.getElementById('academicForm');
    academicForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(academicForm);
        
        try {
            const response = await fetch('/api/recommend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    examType: formData.get('examType'),
                    score: parseFloat(formData.get('score')),
                    category: formData.get('category')
                })
            });

            const colleges = await response.json();
            displayResults(colleges);
        } catch (error) {
            alert('Error fetching recommendations. Please try again.');
        }
    });
});

function showMainContent() {
    document.getElementById('loginModal').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
}

function closeLoginModal() {
    document.getElementById('loginModal').classList.add('hidden');
}

function toggleForms() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const toggleText = document.getElementById('toggleText');
    
    if (loginForm.classList.contains('hidden')) {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        toggleText.textContent = "Don't have an account? Sign up";
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        toggleText.textContent = "Already have an account? Login";
    }
}

function logout() {
    localStorage.removeItem('user');
    window.location.reload();
}

function displayResults(colleges) {
    const resultsSection = document.getElementById('results');
    const collegesList = document.getElementById('collegesList');
    
    resultsSection.classList.remove('hidden');
    collegesList.innerHTML = '';
    
    colleges.forEach(college => {
        const card = createCollegeCard(college);
        collegesList.appendChild(card);
    });
}

function createCollegeCard(college) {
    const card = document.createElement('div');
    card.className = 'college-card bg-white rounded-lg shadow-md p-6';
    
    card.innerHTML = `
        <h3 class="text-xl font-semibold text-gray-800 mb-2">${college.name}</h3>
        <div class="space-y-2">
            <p class="text-gray-600"><span class="font-medium">Location:</span> ${college.location}</p>
            <p class="text-gray-600"><span class="font-medium">Course:</span> ${college.course}</p>
            <p class="text-gray-600"><span class="font-medium">Annual Fee:</span> ₹${college.fee.toLocaleString()}</p>
            <p class="text-gray-600"><span class="font-medium">Cutoff Score:</span> ${college.cutoff}</p>
            <p class="text-gray-600"><span class="font-medium">Campus Size:</span> ${college.campusSize}</p>
        </div>
        <div class="mt-4">
            <h4 class="font-medium text-gray-700 mb-2">Key Features:</h4>
            <ul class="list-disc list-inside text-gray-600">
                ${college.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
    `;
    
    return card;
}