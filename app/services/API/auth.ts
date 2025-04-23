export async function loginUser(credentials: { email: string; password: string }) {
    try {
      const formData = new FormData();
      formData.append('email', credentials.email); 
      formData.append('password', credentials.password);
  
      const response = await fetch('http://192.168.0.6:5173/login', {
        method: 'POST',
        body: formData,
      });
  
      const text = await response.text();
      console.log('Réponse brute du serveur:', text);
  
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error("Réponse serveur non JSON : " + text);
      }
  
      if (!response.ok) {
        throw new Error(data?.error || 'Login failed');
      }
  
      return data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }
  export async function registerUser(credentials: { email: string; password: string }) {
    try {
      const formData = new FormData();
      formData.append('email', credentials.email);
      formData.append('password', credentials.password);
  
      const response = await fetch('http://192.168.0.6:5173/register', {
        method: 'POST',
        body: formData,
      });
  
      const text = await response.text();
      console.log('Réponse brute du serveur:', text);
  
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error("Réponse serveur non JSON : " + text);
      }
  
      if (!response.ok) {
        throw new Error(data?.error || 'Registration failed');
      }
  
      return data;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  }
  