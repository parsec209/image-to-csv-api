const fs = require('fs')
const path = require('path')

if (process.env.NODE_ENV === 'production') {
  fs.writeFileSync(path.normalize(__dirname + '/../GOOGLE_CRED.json'), process.env.GOOGLE_CRED)
  console.log('GOOGLE_CRED.json written!');
}

