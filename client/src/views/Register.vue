<template>
    <main class="form-signin">
        <form @submit.prevent>
        <h1 class="h3 mb-3 fw-normal">Please Register</h1>

            <input
                v-model="email"
                type="email" 
                class="form-control" 
                placeholder="Email" 
                required
            >

            <input
                v-model="password" 
                type="password" 
                class="form-control" 
                placeholder="Password" 
                required
            >

            <button 
                class="w-100 btn btn-lg btn-primary" 
                type="submit"
                @click="submitRegisterForm"
            >
                Submit
            </button>
        </form>
    </main>
</template>

<script>
import { HOST_API_URL } from "@/store";
    export default {
        name: 'Register',
        data() {
            return {
                email: '',
                password: '',
            }
        },
        methods: {
            async submitRegisterForm(){
                 try {
                    const response = await fetch(`${HOST_API_URL}/createUser`, {
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'application/json',
                            'Accept': 'application/json',
                        },
                        body: JSON.stringify(this.$data)
                    });
                    if(response.ok) {
                        this.autoLogin();
                    } else {
                        await this.$router.push({ name: 'login' });
                    }
                } catch (err) {
                    console.error(err);
                }
                
            },
            async autoLogin() {
                const ok = await this.$store.dispatch('auth/login',JSON.stringify(this.$data));
                if(ok) {
                    await this.$router.push({ name: 'profile' });
                }
            }
        }, 
    }
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>