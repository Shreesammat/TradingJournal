import CCard from "../components/CCard";

export default function Login() {
    return (
        <>
            <div className='flex bg-primary h-screen w-screen justify-center items-center'>
                <CCard 
                title='Signup' 
                alternateText='Already have an account?'
                />
            </div>
        </>
    )
}