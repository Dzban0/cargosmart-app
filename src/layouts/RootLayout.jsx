import PropTypes from 'prop-types';

function RootLayout({}) {
  return (
    <div>
      
    </div>
  );
}

RootLayout.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

export default RootLayout;
