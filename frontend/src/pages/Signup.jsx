import CCard from "../components/CCard";
import { useNavigate } from "react-router-dom";
export default function Login() {
    const navigate = useNavigate();
    return (
        <>
            <div className='flex bg-primary h-screen w-screen justify-center items-center'>
                <CCard
                title='Signup'
                alternateText='Already have an account?'
                onAlternateClick="/login"
                onclick2 = {() => navigate('/dashboard')}
                className={'bg-tertiary'} 
                />
            </div>
        </>
    )
}