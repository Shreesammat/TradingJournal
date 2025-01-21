import { useNavigate } from "react-router-dom";
import CCard from "../components/CCard";

export default function Login() {
    const navigate = useNavigate();
    return (
        <>
            <div className='flex bg-primary h-screen w-screen justify-center items-center'>
                <CCard 
                title='Login'
                alternateText='Create a new account instead?'
                onAlternateClick="/signup"
                onclick2 ={() => navigate('/dashboard')}
                />
            </div>
        </>
    )
}