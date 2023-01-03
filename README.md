# Image-To-CSV

Performs OCR on document images and generates CSV files from the extracted metadata. Configurable parsers are used to obtain each metadata field value, and sets of parsers for groups of similarly-formatted documents (i.e. invoices) can be saved for reuse. 


## Quick Start

```bash
# Install dependencies
npm install

# Add environment variables
<See .sample-env>

# Start Express dev server: (i.e. http://localhost:3000)
npm run dev

# Run automated tests
npm test
<You may see a "TLSWRAP" error in the console after running tests that contain an async beforeAll block, see open issue with this version of jest: https://github.com/facebook/jest/issues/11665. This is merely a nuisance though and does not affect the actual test results.>

# Generate JSDocs
npm run doc
<This generates interactive html documentation for the src/services and src/util directories. For interactive API documentation, checkout the SwaggerUI route shown in src/loaders/app.js, or use the following yaml file within SwaggerHub: src/config/swagger/swaggerhub.>
```

## App Info

### Author

Ryan Galbreath

### Version

1.0.0

### License

Apache Version 2.0