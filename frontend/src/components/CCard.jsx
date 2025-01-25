import CButton1 from "./CButton1"
import PropTypes from 'prop-types'

function CCard({ title = 'Login', onclick2 , alternateText = 'already?', onAlternateClick='/', tailStyle='',
    username, setUsername, email, setEmail, password, setPassword
}) {

    // Handle input changes
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    //HANDLE SUBMISSION
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, email, password);

        if(onclick2){
            onclick2(username, email, password);
        }
    }
    return (
        <div className={`flex  bg-yellowo h-3/4 w-1/2 border-2 rounded-xl justify-center bg-tertiary px-4 py-4 items-start ${tailStyle}`} >
            <div className="w-3/4 max-w-sm flex flex-col justify-center items-center space-y-20">
                <div className='font-bold text-3xl text-secondary'>{title}</div>
                <form 
                className='space-y-4'
                onSubmit={handleSubmit} 

                >
                        <input
                            id="username"
                            value={username}
                            onChange={handleUsernameChange}
                            placeholder="Username"
                            type='string'
                            autoComplete="on"
                            className='rounded-lg p-2 border-secondary w-full border-2 focus:border-dotted focus:border-2 focus:outline-none'
                        ></input>
                        <input
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="johndoe@example.com"
                            type='email'
                            autoComplete="on"
                            className='rounded-lg p-2 border-secondary w-full border-2 focus:border-dotted focus:border-2 focus:outline-none'
                        ></input>
                        <input
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
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
                        <CButton1 text={title} variant='secondary' tailStyle='w-full text-primary hover:text-secondary border-black ' onclick={onclick2} />
                        <a
                        href={onAlternateClick} 
                        className='font-medium text-sm text-secondary hover:text-primary'
                        >
                            {alternateText}
                        </a>
                </form>
            </div>
        </div>
    )
}

CCard.propTypes = {
    title: PropTypes.string.isRequired,
    alternateText: PropTypes.string.isRequired,
    onAlternateClick: PropTypes.string.isRequired,
    onclick2: PropTypes.func.isRequired,
    tailStyle: PropTypes.string,
    username: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired
}

export default CCard