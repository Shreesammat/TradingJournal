
import PropTypes from 'prop-types';

const CButton1 = ({text="button", onclick, variant='primary', tailStyle}) => {
  const variants = {
    primary: 'bg-primary hover:bg-primary/90', 
    secondary: 'bg-secondary hover:bg-primary ',
    tertiary: 'bg-tertiary hover:bg-tertiary/90', 
    reddo: 'bg-reddo hover:bg-reddo/90',
    greeno: 'bg-greeno hover:bg-greeno/90',
  };

  return (
    <button
    className = {`${variants[variant] || variants.primary} py-2 px-4 rounded-xl transition-colors font-semibold border-2 border-black ${tailStyle}`}
    onClick = {onclick}
    >
      {text}
    </button> 
  )
}

CButton1.propTypes = {
    text: PropTypes.string.isRequired,
    onclick: PropTypes.func,
    variant: PropTypes.string.isRequired,
    tailStyle: PropTypes.string
}

export default CButton1