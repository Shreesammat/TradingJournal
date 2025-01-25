import CCard from "../components/CCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSignup = async (username, email, password) => {
        try {
            if(username && email && password) {
                const userData = {
                    username: username,
                    email: email,
                    password: password
                }
        
                const response = await fetch('http://localhost:3000/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });
        
                if(!response.ok) {
                    const error = await response.json();
                    console.error("Error signing up:", error.message || "Unknown error");
                    return;
                }
        
                const data = await response.json();
                console.log("Data: ", data);
                
                if(!data) {
                    console.error("Signup failed:", data.message);
                } else {
                    navigate('/dashboard');
                }
            }
        } catch (error) {
            console.log("Error signing up: ", error);
        }
    }

    return (
        <> 
            <div className='flex bg-primary h-screen w-screen justify-center items-center'>
                <CCard
                username={username}
                setUsername={setUsername}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                title='Signup'
                alternateText='Already have an account?'
                onAlternateClick="/login"
                onclick2 = {handleSignup}
                className={'bg-tertiary'}
                />
            </div>
        </>
    )
}
