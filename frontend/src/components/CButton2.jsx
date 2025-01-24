
import PropTypes from 'prop-types';

const CButton = ({text="button", onclick, variant='primary'}) => {
  const variants = {
    primary: 'bg-greeno hover:bg-primary/90', 
    secondary: 'bg-blueo hover:bg-secondary/90',
    tertiary: 'bg-reddo hover:bg-tertiary/90', 
    reddo: 'bg-pinko hover:bg-reddo/90',
    greeno: 'bg-pinko hover:bg-greeno/90',
  };

  return (
    <button
    className = {`${variants[variant] || variants.primary} py-2 px-4 rounded-xl text-white transition-colors font-semibold border-dashed border-2 border-black`}
    onClick = {onclick}
    >
      {text}
    </button>
  )
}

CButton.propTypes = {
    text: PropTypes.string.isRequired,
    onclick: PropTypes.func,
    variant: PropTypes.string.isRequired
}

export default CButton