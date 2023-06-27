const fs = require('fs-extra');

function writeToEnvFile(key, value) {
  const envContent = fs.readFileSync('.env', 'utf8');

  const updatedEnvContent = `${envContent}\n${key}=${value}`;

  fs.writeFileSync('.env', updatedEnvContent);
}

module.exports = {
  writeToEnvFile: writeToEnvFile,
};
