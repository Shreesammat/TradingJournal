import { useNavigate } from 'react-router-dom'
import CButton from '../components/CButton'
import { Notebook } from 'lucide-react'

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Nav bar */}
      <nav className="bg-primary flex flex-col gap-2 fixed top-0 left-0 w-screen justify-between items-center px-4 pt-4">
        <div className='flex w-full justify-between items-center'>
          <a href='' className='flex font-extrabold items-center'>
          <Notebook/>
          <div className='text-[20px]'>Marubuzo</div>
          </a>
          
          {/* Buttons */}
          <div className="space-x-4">
            <CButton text='login' variant="greeno" onclick={() => navigate("/login")}/>
            <CButton text='signup' variant="blueo" onclick={() => navigate("/signup")}/>
          </div>
        </div>
        <div className='w-full h-[2px] bg-black'></div>
      </nav>

      {/* HERO SECTION */} 
      <div className='w-1/2 bg-primary mx-auto pt-20 px-4 h-screen flex flex-col justify-center items-start space-y-4'>
        
        <div className='text-xl m-plus-1 text-black justify-self-start text-[36px] font-bold'>Your digital Trade journal...</div>
        <div className='flex space-x-4'>
          <CButton text='Get started' variant='greeno' onclick={() => navigate("/signup")}/>
          <CButton text='Learn more' variant='blueo'/>
        </div>
      </div>
    </div>
  )
}

export default LandingPage