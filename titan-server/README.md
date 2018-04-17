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

### Install Postgres

#### Windows
Make sure you download the correct 64 bit or 32 bit version for your PC. Installing the 32 bit version on a 64 bit machine will break.
[Download](https://www.postgresql.org/download/windows/)

Add the directory path to your postgres `bin` and `lib` directories to your `PATH` environment variable. It should look something like this:

**64 bit**
```
C:\Program Files\PostgreSQL\10\bin
C:\Program Files\PostgreSQL\10\lib
```

**32 bit**
```
C:\Program Files (x86)\PostgreSQL\10\bin
C:\Program Files (x86)\PostgreSQL\10\lib
```

#### Mac

Install `homebrew` if it isn't already installed.

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Then, install postgres...
```
brew install postgresql
```

Configure postgres to run every time your machine boots up...

```
pg_ctl -D /usr/local/var/postgres start && brew services start postgresql
```

### Setup postgres
You'll need the following to use postgres with titan:

1. Database named `unkso-titan`.
2. User named `unkso_titan` with the password: `development`.

#### Setup with PgAdmin4
This is a Gui that comes with postgres on windows machines. You can still [download it on mac](https://www.pgadmin.org/download/pgadmin-4-macos/) if you choose to use it. You can easily create the db and user with the click of a button without messing with raw SQL.

#### Setup with psql command

1.Login to your postgres instance. The default username and password should be `postgres`.

```
psql -U postgres
```

2.Create the user

```
postgres# CREATE USER unkso_titan WITH PASSWORD 'development';
```

3. Create the database
We want the new database to be owned by our new user `unkso_titan`. To do this, logout of postgres, then login as `unkso_titan`.
```
psql -U unkso_titan
...
postgres# CREATE DATABASE unkso-titan
```

#### Install and configure Diesel CLI
Installs diesel CLI with only postgres support enabled. You can execute this command from any directory.

> Assumes postgres is already installed.

```
cargo install diesel_cli --no-default-features --features mysql
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
