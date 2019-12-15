# Titan Web Client
The browser client for Titan. Built with ReactJS, Redux, and React Router.

[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

## Getting Started
Before you can work on the web client, you'll need the following software installed.

### Install Git

[Download](https://git-scm.com/downloads)

### Install NodeJS
Install NodeJS version 8.9.4 or higher.

[Download](https://nodejs.org/en/)

### Install Yarn
- [Windows Installer](https://yarnpkg.com/lang/en/docs/install/#windows-tab)
- [MacOS Installer](https://yarnpkg.com/lang/en/docs/install/#mac-tab)
- [Linux Installer](https://yarnpkg.com/lang/en/docs/install/#linux-tab)

### IDE & Browser Extensions

#### Styled components syntax highlighting
To get syntax highlighting while using `styled-components`, you'll need to install a plugin for your preferred code editor.

[Installation instructions](https://www.styled-components.com/docs/tooling#syntax-highlighting)

#### React JS browser extension (for Google Chrome)
A special tool was developed to make debugging ReactJS apps in Google Chrome easier.

[Install extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

#### Redux browser extension (for Google Chrome)
Use this extension to view the contents of the app's redux data store.

[Install Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)    


## Installation

#### 1.Clone the repository

    git clone git@github.com:unkso/titan-app.git

#### 2.Install dependencies

    yarn install
    
#### 3.Start the server

    yarn start
    
#### 4.View website in browser

    http://localhost:3000

## Testing

    yarn test

## Tools

### Development
You'll need to be familiar with the following technologies to work on this application.

- [React JS](https://reactjs.org) - The underlying framework for the app.
- [Styled Components](https://www.styled-components.com) - An opinionated, but very reliable approach to styling ReactJS apps.
- [Redux](https://redux.js.org) - A state container to manage the application's data.
- [React Router](https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf) - Manages application routing.

### Testing
- [Mocha](https://mochajs.org) - Framework for writing unit tests.
- [Sinon](http://sinonjs.org) - Framework for creating mocks and stubs for unit tests.

### Generating Documentation
- [React Styleguidist](https://github.com/styleguidist/react-styleguidist) - A tool for generating documentation from our code.
