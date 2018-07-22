FROM ubuntu:bionic

# Install build deps
RUN apt-get -y update \
    && apt-get -y install curl gcc gnupg2 ca-certificates --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Install SSH
RUN apt-get update \
    && apt-get -y install ssh --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Install Node & Yarn
RUN apt-get -y update \
    && apt-get install -y nodejs --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
        && echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
        && apt-get update \
        && apt-get install -y yarn --no-install-recommends \
        && rm -rf /var/lib/apt/lists/*

ENV PATH="${PATH}:`yarn global bin`"

# Install Rust
RUN curl https://sh.rustup.rs -sSf | sh -s -- --default-toolchain nightly --default-host x86_64-unknown-linux-gnu -y
ENV PATH="/root/.cargo/bin:$PATH"

# Install MySQL
RUN apt-get -y update \
    && apt-get install -y libmysqlclient-dev --no-install-recommends

# Cache app dependencies
WORKDIR /tmp
COPY . /tmp
RUN cd titan-web-client && yarn install && rm -rf node_modules
RUN echo ${PATH}
RUN cd titan-server && cargo fetch

# Set entrypoint
WORKDIR /app
VOLUME /app
