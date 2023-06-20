<template>
    <div>
        <div class="login-container">
            <h1>Login</h1>
            <form @submit.prevent="login">
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" id="username" v-model="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" v-model="password" required>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
        <div class="registration-container">
    <h1>Registration</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div class="form-group">
        <label for="confirm-password">Confirm Password:</label>
        <input type="password" id="confirm-password" v-model="confirmPassword" required>
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
    },
    methods: {
        submitForm() {
            // Retrieve input data
            const formData = {
                username: this.username,
                email: this.email,
                password: this.password,
                confirmPassword: this.confirmPassword
            };

            // Perform any necessary form validation or processing here
            // Example: make an API request to create a new user
            if (formData.password !== formData.confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            // Registration logic
            alert('Registration successful');
            console.log(formData);
        }
    }
};
</script>
  
<style scoped>
.login-container {
    display: inline;
    text-align: center;
    padding: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    text-align: left;
}

input[type="text"],
input[type="password"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}
</style>
  