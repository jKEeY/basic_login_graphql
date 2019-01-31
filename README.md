# Procedure for installation on your pc

1. yarn or npm install
2. Create a file in the root folder of the project called config.js:
  * Here is an example file:
  ```
   export default {
    URLDB: 'mongodb://yourlink_to_mongodb',
    SECRET: 'secret_key'
  }
   
  ```
  3. yarn dev
