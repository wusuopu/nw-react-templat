import React from 'react';
import { Button } from 'antd';
import { Flex, Box } from "../../components/base/view";


class HomePage extends React.PureComponent {
  state = {
  };
  render () {
    return (
      <Box m={[1, 1, 2, 2, 2]}>
        nw.js app
        <Flex>
          <Box width={1}><Button type="primary">antd btn1</Button></Box>
          <Box width={1}><Button>antd btn2</Button></Box>
        </Flex>
      </Box>
    )
  }
}
export default HomePage;
