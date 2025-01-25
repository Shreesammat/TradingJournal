import { useNavigate } from 'react-router-dom'
import CButton1 from '../components/CButton1'
import { Notebook } from 'lucide-react'

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Nav bar */}
      <nav className="bg-tertiary flex flex-col gap-2 fixed top-0 left-0 w-screen justify-between items-center px-4 pt-4">
        <div className='flex w-full justify-between items-center'>
          <a href='' className='flex font-extrabold items-center'>
          <Notebook/>
          <div className='text-[20px]'>Marubuzo</div>
          </a>
          
          {/* Buttons */}
          <div className="space-x-4">
            <CButton1 text='login' variant="primary" tailStyle='hover:border-black/20 hover:border-2' onclick={() => navigate("/login")}/>
            <CButton1 text='signup' variant="secondary" tailStyle='text-primary hover:bg-primary hover:text-secondary' onclick={() => navigate("/signup")}/>
          </div>
        </div>
        <div className='w-full h-[2px] bg-secondary'></div>
      </nav>

      {/* HERO SECTION */} 
      <div className='w-1/2 bg-tertiary mx-auto pt-20 px-4 h-screen flex flex-col justify-center items-start space-y-4'>
        
        <div className='text-xl m-plus-1 text-secondary justify-self-start text-[36px] font-bold'>Your digital Trade journal...</div>
        <div className='flex space-x-4'>
          <CButton1 text='Get started' variant='secondary' tailStyle='text-primary hover:bg-tertiary hover:text-secondary' onclick={() => navigate("/signup")}/>
          <CButton1 text='Learn more' variant='primary' tailStyle='hover:border-black/20 hover:border-2'/>
        </div>
      </div>
    </div>
  )
}

export default LandingPage