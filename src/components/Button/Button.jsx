import PropTypes from 'prop-types';
import styles from 'components/Styles.module.css';
import Loader from 'components/Loader/Loader';

function Button({ onClick, isLoadingMore }) {
  return (
    <button    
      className={styles.Button}
      type="button"
      onClick={onClick}>
      {isLoadingMore ? <Loader/> : <span>Load more</span>}
    </button>
  );
}
Button.propTypes = {
  isLoadingMore: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;