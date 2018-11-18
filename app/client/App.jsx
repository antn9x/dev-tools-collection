import React from 'react';
import {
  Grid, Row, Col, Button,
  InputGroup,
  FormGroup, FormControl,
} from 'react-bootstrap';
import { ipcRenderer, remote } from 'electron';
import { RENAME } from '../constant.message';

const { dialog } = remote;

const SRC_LAST_RENAME_FOLDER = 'src_Last_Rename_folder';
const SRC_LAST_RENAME_PATTERN = 'src_Last_Rename_pattern';
const SRC_LAST_RENAME_REPLACE_TO = 'src_Last_Rename_replace_to';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      src: localStorage.getItem(SRC_LAST_RENAME_FOLDER) || '',
      pattern: localStorage.getItem(SRC_LAST_RENAME_PATTERN) || '.js',
      replaceTo: localStorage.getItem(SRC_LAST_RENAME_REPLACE_TO) || '.ts'
    };
    this.handleChangeSource = this.handleChangeSource.bind(this);
    this.handleChangeDestination = this.handleChangeDestination.bind(this);
    this.selectFileCallback = this.selectFileCallback.bind(this);
    this.handleChangeReplaceTo = this.handleChangeReplaceTo.bind(this);
  }

  onClickRename() {
    if (!this.state.src) {
      alert('Please enter source folder!');
      return;
    }
    if (!this.state.pattern) {
      alert('Please enter pattern!');
      return;
    }
    const { src, pattern, replaceTo } = this.state;
    ipcRenderer.send(RENAME, { src, pattern, replaceTo });
    ipcRenderer.once(RENAME, (sender, response) => {
      localStorage.setItem(SRC_LAST_RENAME_FOLDER, src);
      localStorage.setItem(SRC_LAST_RENAME_PATTERN, pattern);
      localStorage.setItem(SRC_LAST_RENAME_REPLACE_TO, replaceTo);
      console.log(response);
    });
  }

  selectFileCallback(fileNames) {
    if (fileNames === undefined) {
      console.log("No file selected");

    } else {
      console.log("file selected", fileNames);
      const file = fileNames[0];
      this.setState({ src: file });
      localStorage.setItem(SRC_LAST_RENAME_FOLDER, file);
    }
  }

  onClickSource(src) {
    dialog.showOpenDialog({
      title: "Select the a folder.",
      properties: ['openDirectory']
    }, (fileNames) => this.selectFileCallback(fileNames, src));
  }

  handleChangeSource(event) {
    // console.log('Selected file:', event.target.value);
    this.setState({ src: event.target.value });
  }

  handleChangeDestination(event) {
    // console.log('Selected file:', event.target.value);
    this.setState({ pattern: event.target.value });
  }
  handleChangeReplaceTo(event) {
    // console.log('Selected file:', event.target.value);
    this.setState({ replaceTo: event.target.value });
  }
  render() {
    return (
      <Grid cellPadding="">
        <Row>&nbsp;</Row>
        <Row className="show-grid">
          <FormGroup>
            <InputGroup>
              <InputGroup.Addon>Source folder:</InputGroup.Addon>
              <FormControl
                type="text"
                value={this.state.src}
                onChange={this.handleChangeSource}
                cols={50}
              />
              <Button onClick={() => this.onClickSource()} >Choose Source</Button>
            </InputGroup>
          </FormGroup>
        </Row>
        <Row className="show-grid">
          <InputGroup>
            <InputGroup.Addon>Pattern:</InputGroup.Addon>
            <FormControl
              type="text"
              value={this.state.pattern}
              onChange={this.handleChangeDestination}
              cols={50}
            />
          </InputGroup>
        </Row>
        <Row className="show-grid">
          <InputGroup>
            <InputGroup.Addon>Replace to:</InputGroup.Addon>
            <FormControl
              type="text"
              value={this.state.replaceTo}
              onChange={this.handleChangeReplaceTo}
              cols={50}
            />
          </InputGroup>
        </Row>
        <Row>&nbsp;</Row>
        <Row className="show-grid">
          <Col >
            <Button
              bsStyle="primary"
              bsSize="large"
              block
              className="optimizeButton"
              onClick={() => this.onClickRename()}
            >Rename
            </Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
