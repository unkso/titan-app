FROM ubuntu:bionic

# Install build deps
RUN apt-get -y update \
    && apt-get -y install curl gcc gnupg2 ca-certificates pkg-config --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Install SSH
RUN apt-get update \
    && apt-get -y install ssh --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Install MySQL
RUN apt-get -y update \
    && apt-get install -y libmysqlclient-dev --no-install-recommends

# Install libssql-dev
RUN apt-get -y update \
        && apt-get install -y libssl-dev --no-install-recommends

# Install Rust
RUN curl https://sh.rustup.rs -sSf | sh -s -- --default-toolchain nightly-2020-01-08 --default-host x86_64-unknown-linux-gnu -y
ENV PATH="/root/.cargo/bin:$PATH"
RUN rustup override set nightly-2020-01-08

WORKDIR /usr/src/app
COPY . .

RUN cargo build --release --bin titan --target-dir /usr/src/app/build
EXPOSE 8000
CMD /usr/src/app/build/release/titan
