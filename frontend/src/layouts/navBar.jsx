import { Notebook } from "lucide-react"
import PropTypes from 'prop-types';

const NavBar = ({children}) => {
  return (
    <nav className="bg-tertiary flex flex-col gap-2 fixed top-0 left-0 w-screen justify-between items-center px-4 pt-4">
        <div className='flex w-full justify-between items-center'>
          <a href='' className='flex font-extrabold items-center'>
          <Notebook/>
          <div className='text-[20px]'>Marubuzo</div>
          </a>
          <div>
            {children}
          </div>
        </div>
        <div className='w-full h-[2px] bg-secondary'></div>
      </nav>
  )
}

NavBar.propTypes = {
  children: PropTypes.node
}
export default NavBar