import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types'
import { Spin } from 'antd';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Flex } from '../../components/base/view';


const Loading = (props) => {
  const {loading} = props;
  if ( !loading ) return null;

  const parent = document.getElementsByTagName('body')[0];
  if ( !parent ) return null;

  return ReactDom.createPortal(
    (
      <Flex position="fixed" top={0} right={0} bottom={0} left={0} backgroundColor='rgba(64, 64, 64, 0.5)' zIndex={1001} alignItems="center" justifyContent="center">
        <Spin size="large" />
      </Flex>
    ),
    parent,
  );
};
Loading.propTypes = {
  loading: PropTypes.bool,
};

const mapState = (state) => ({
  loading: !!state.loading.global,
});

const enhance = compose(
  connect(mapState, null)
);

export default enhance(Loading);
