import CButton1 from "./CButton1"
import PropTypes from 'prop-types'

function CCard({ title = 'Login', onclick2 , alternateText = 'already?', onAlternateClick='/', className}) {
    return (
        <div className={`flex  bg-yellowo h-3/4 w-1/2 border-2 rounded-xl justify-center px-4 py-4 items-start ${className}`} >
            <div className="w-3/4 max-w-sm flex flex-col justify-center items-center space-y-4">
                <div className='font-bold text-3xl text-secondary'>{title}</div>
                <input
                    id="email"
                    placeholder="johndoe@example.com"
                    type='email'
                    autoComplete="on"
                    className='rounded-lg p-2 border-secondary w-full border-2 focus:border-dotted focus:border-2 focus:outline-none'
                ></input>
                <input
                    id="password"
                    placeholder="Password"
                    type='password'
                    autoComplete="on"
                    className='rounded-lg p-2 border-secondary w-full border-2 focus:border-dotted focus:border-2 focus:outline-none '
                ></input>
                <div className='w-full items-start'>
                    <a
                        href='/'
                        className='text-secondary hover:text-primary font-medium text-sm'
                    >Forgot password?</a>

                </div>
                <CButton1 text={title} variant='secondary' className='w-full text-primary hover:bg-primary hover:text-secondary border-black hover:outline-' onclick={onclick2} />
                <a
                href={onAlternateClick} 
                className='font-medium text-sm text-secondary hover:text-primary'
                >
                    {alternateText}
                </a>
            </div>
        </div>
    )
}

CCard.propTypes = {
    title: PropTypes.string.isRequired,
    alternateText: PropTypes.string.isRequired,
    onAlternateClick: PropTypes.string.isRequired,
    onclick2: PropTypes.func.isRequired,
    className: PropTypes.string
}

export default CCard