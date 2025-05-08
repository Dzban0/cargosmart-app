import PropTypes from "prop-types"

function Layout ({ children }) {
    return (
        <div>
          <nav>
            <ul>
              <li></li>
              <li></li>
            </ul>
          </nav>
          <div>{children}</div>
        </div>
      )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired, 
};

export default Layout