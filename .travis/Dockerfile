FROM ubuntu:xenial

# Install build deps
RUN apt-get -y update \
    && apt-get -y install curl build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install SSH

RUN apt-get update \
    && apt-get -y install ssh \
    && rm -rf /var/lib/apt/lists/*

# Install Node & Yarn
RUN curl -sL https://deb.nodesource.com/setup_9.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
        && echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
        && apt-get update \
        && apt-get install -y yarn \
        && rm -rf /var/lib/apt/lists/*

ENV PATH="${PATH}:`yarn global bin`"

# Install Rust
RUN curl https://sh.rustup.rs -sSf | sh -s -- --default-toolchain nightly --default-host x86_64-unknown-linux-gnu -y
ENV PATH="/root/.cargo/bin:$PATH"

# Cache app dependencies
WORKDIR /tmp
COPY . /tmp
RUN cd titan-web-client && yarn install && rm -rf node_modules
RUN echo ${PATH}
RUN cd titan-server && cargo fetch

# Set entrypoint
WORKDIR /app
VOLUME /app
