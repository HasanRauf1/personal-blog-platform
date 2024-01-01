export const signup = async (name, phoneNumber, email, password, passwordConfirmation) => {
  try {
    const response = await fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': getCsrfToken()
      },
      body: JSON.stringify({
        user: {
          name,
          phone_number: phoneNumber,
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    // Update CSRF token from response headers
    const newCsrfToken = response.headers.get('X-CSRF-Token');
    if (newCsrfToken) {
      updateCsrfToken(newCsrfToken);
    }
    
    // Handle response data if needed
    return true;
  } catch (error) {
    console.error('Signup error:', error);
    return false;
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch('/users/sign_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': getCsrfToken(),
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
        },
      }),
      credentials: 'include', // This is needed to handle cookies if your auth is cookie-based
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    // Update CSRF token from response headers
    const newCsrfToken = response.headers.get('X-CSRF-Token');
    if (newCsrfToken) {
      updateCsrfToken(newCsrfToken);
    }    

    const data = await response.json();
    return data; // This should be the logged in user's data
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
};

export const logout = async () => {
  try {
    const response = await fetch('/users/sign_out', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token':  document.querySelector("meta[name='csrf-token']").getAttribute("content"),
      },
      credentials: 'include', // This is needed to handle cookies if your auth is cookie-based
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    
    // Update CSRF token from response headers
    const newCsrfToken = response.headers.get('X-CSRF-Token');
    if (newCsrfToken) {
      updateCsrfToken(newCsrfToken);
    }    
    return true;

  } catch (error) {
    console.error('Logout error:', error);
    return false;
  }
};

// Helper function to get CSRF token from meta tags
function getCsrfToken() {
  return document.querySelector("meta[name='csrf-token']").getAttribute("content");
}

function updateCsrfToken(newToken) {
  document.querySelector("meta[name='csrf-token']").setAttribute("content", newToken);
}
