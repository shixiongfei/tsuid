# tsuid

Timed Sequence Unique ID

Generates 8-byte UUID that consists of:

- 41 bits for time in milliseconds (we can use it until 2084/09/06 lunch time comes)
- 13 bits for additional information - Can be used it to store the logical shard ID
- 10 bits that represent an auto-incrementing sequence.

## Installation

```
$ npm install --save tsuid
```

## Examples

```js
const tsuid = require('tsuid');

tsuid();            // Default: Base64 - "D6zWpFyMJGc"
tsuid("hex");       // Hex String      - "facd6acec2ff868"
tsuid("decimal");   // Decimal String  - "1129513692534654057"
```

## Documentation

### tsuid(options)

Generates and returns UUID.

* `options` (object || string): Generating options. (or return type)

Option      | Description                                                  | Range | Default
-------     | ------------------------------------------------------------ | ---- | ------
type        | Return type of generated ID. See below for more details. | - | 'base64'
additional  | Additional Unique Information (ex: Logical Shard ID) | 0 ~ 8191 | *(Random)*
countNumber | Auto-incrementing sequence - to prevent conflicting  | 0 ~ 1023 | *(Random)*

##### Return types

Name     | Description            | Type     |
---------| ---                    | ---      |
base64   | Base64 Hash (Note that this is not pure Base64. *We uses URL-Safe Base64URL*) | *String* |
decimal  | Decimal **String**     | *String* |
number   | *(Same as above)*        | -        |
hex      | Hex String             | *String* |
hash     | *(Same as above)*        | -        |
long     | [Long](https://github.com/dcodeIO/Long.js) object | *Long* |

#### License: Apache-2.0

#### Author: [shixiongfei](https://github.com/shixiongfei)
