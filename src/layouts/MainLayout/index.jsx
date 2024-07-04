import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectLocale, selectTheme, selectTodo } from '@containers/App/selectors';

import Navbar from '@components/Navbar';

const MainLayout = ({ todo, children, locale, theme, intl: { formatMessage } }) => {
  return (
    <div>
      {/* <Navbar title={formatMessage({ id: 'app_title_header' })} locale={locale} theme={theme} todo={todo} /> */}
      {children}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  locale: selectLocale,
  theme: selectTheme,
  todo: selectTodo,
});

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
  locale: PropTypes.string,
  theme: PropTypes.string,
  todo: PropTypes.array,
  intl: PropTypes.object,
};

export default injectIntl(connect(mapStateToProps)(MainLayout));
