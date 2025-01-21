import CButton from "./CButton"
import PropTypes from 'prop-types'

function CCard({ title = 'Login', onclick2 , alternateText = 'already?', onAlternateClick='/'}) {
    return (
        <div className='flex  bg-yellowo h-3/4 w-1/2 border-black border-2 rounded-xl justify-center px-4 py-4 items-start' >
            <div className="w-3/4 max-w-sm flex flex-col justify-center items-center space-y-4">
                <div className='font-bold text-3xl text-black'>{title}</div>
                <input
                    placeholder="johndoe@example.com"
                    type='email'
                    className='rounded-lg p-2 border-black w-full border-2 focus:border-dotted focus:border-2 focus:outline-none'
                ></input>
                <input
                    placeholder="Password"
                    type='password'
                    className='rounded-lg p-2 border-black w-full border-2 focus:border-dotted focus:border-2 focus:outline-none'
                ></input>
                <div className='w-full items-start'>
                    <a
                        href='/'
                        className='text-black hover:text-reddo font-medium text-sm'
                    >Forgot password?</a>

                </div>
                <CButton text={title} variant='pinko' className='w-full' onclick={onclick2}/>
                <a
                href={onAlternateClick} 
                className='font-medium text-sm hover:text-reddo'
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
    onclick2: PropTypes.func.isRequired
}

export default CCard