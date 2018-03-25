#  Titan Server
The server app for Titan. Built with [Rust](https://www.rust-lang.org/en-US) and [Rocket](https://rocket.rs).

## Getting Started
Before you can work on the server app, you'll need to set up your development environment. Make sure the following software is installed and configured.

### Install Git

[Download](https://git-scm.com/downloads)

### Install Rustup

Rustup is a command line tool for managing versions and configuration of the rust programming language.

[Download](https://rustup.rs)

### Configure Rust
After `rustup` is installed, upgrade rust to the `nightly` version.

```
rustup default nightly
rustup override set nightly
rustup update && cargo update
```

## Installation

#### 1.Clone the repository
```
git clone git@github.com:unkso/titan-app.git
```

### 2.Run the app
Most IDE's and code editors will allow you to run the app with the click of a button. If your editor does not provide the tools to compile and start your app, you can start the app directly from the command line.

> Honestly, if your editor can't compile and run the app with the click of a button, you should probably change editors.

Make sure you're in the the titan server directory (`./{path to repository}/titan-server`) before executing the following command.

```
cargo run --manifest-path ./titan-server/Cargo.toml --package titan --bin titan
```

#### 3.Access the app
Send all API requests to the following URL.

```
http://localhost:8000
```

> Some endpoints may require authentication tokens to access them.
