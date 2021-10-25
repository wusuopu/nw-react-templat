import React from 'react';
import _ from "lodash";
import { Button } from 'antd';
import { Flex, Box } from "../../components/base/view";
import node from "../../lib/node";


class HomePage extends React.PureComponent {
  state = {
    cwd: '',
    files: [],
  };
  async componentDidMount () {
    let cwd = node.process.cwd()
    await this.listDir(cwd)
  }
  renderFiles () {
    return (
      <React.Fragment>
      {
        _.map(this.state.files, (file, index) => {
          return (
            <Flex key={index}>
            <Box width={1/10}>{index}</Box>
            <Box width={9/10}>{file}</Box>
            </Flex>
          )
        })
      }
      </React.Fragment>
    )
  }
  render () {
    return (
      <Box m={[1, 1, 2, 2, 2]}>
        <Flex flexDirection="column">
          <Box>当前目录： {this.state.cwd} <Button onClick={this.handleGoParent}>上一级</Button></Box>
          {this.renderFiles()}
        </Flex>
      </Box>
    )
  }

  listDir = async (cwd) => {
    let files = await node.fs.readdir(cwd)
    this.setState({cwd, files})
  }
  handleGoParent = () => {
    let dir = node.path.dirname(this.state.cwd)
    this.listDir(dir)
  }
}
export default HomePage;
