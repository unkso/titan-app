# Project Titan Monorepo
The monolithic repository containing all the code for project titan.

To start the app, run `bin/start`. As long as you have Rust and Yarn installed,
the frontend and server should start up without issue.

## API Codegen

```
$ cd titan-web-client/src/http/api
$ openapi-generator generate -g typescript-rxjs -i openapi/titan.v1.yaml -o ./generated/v1
```
