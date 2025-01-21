
import PropTypes from 'prop-types';

const CButton = ({text="button", onclick, variant='primary'}) => {
  const variants = {
    greeno: 'bg-greeno hover:bg-greeno/90', //green
    blueo: 'bg-blueo hover:bg-blueo/90', //blue
    reddo: 'bg-reddo hover:bg-reddo/90', //red
    pinko: 'bg-pinko hover:bg-pinko/90' //pink
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