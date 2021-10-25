import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom';
import { Flex, Box } from "../base/view";

const Demo = (props) => {
  return (
    <Flex flexDirection="column">
      <h1>Demo</h1>
      <Box m={[1, 1, 2, 2]}>
        <Button type="primary" size="large" onClick={props.onClick}>test</Button>
        <Link to="/about">About</Link>
      </Box>
      <Box>{ props.name }</Box>
    </Flex>
  )
}

export default Demo
