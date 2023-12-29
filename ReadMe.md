
<p align="center">
  <img src="https://img.shields.io/npm/dw/sentinel-wrapper-js?style=for-the-badge">
  <img src="https://img.shields.io/npm/v/sentinel-wrapper-js?style=for-the-badge">
  <img src="https://img.shields.io/github/forks/justreddy7397/sentinel-js-wrapper?style=for-the-badge">
  <img src="https://img.shields.io/github/stars/justreddy7397/sentinel-js-wrapper?style=for-the-badge">
</p>

<p align="center">sentinel-js-wrapper, the API wrapper for Sentinel, allows you to easily make calls to Sentinel endpoints without writing the code for the connections and parsing the response yourself.</p>

## Installation
```bash
npm install sentinel-wrapper-js@latest
```
> :warning: **The wrapper version is not necessarily the same as your Sentinel server version. For example, the wrapper may be on version 1.0.0 while your server is on version 1.4.0**

## Creating a client
```javascript

// Everything here should be run ASYNCHRONOUSLY

import SentinelClient from 'sentinel-wrapper-js'

(async () => {
    const client = new SentinelClient("https://example.com/api/v1",
        "YOUR_AUTH_KEY", 
        // Optional, if you want to use encryption
        // This is in beta, might not work.
        "ENCRYPTION_SECRET_KEY_HERE");

    // Get the platform controller.
    const platform = client.platform;
    // Get the product controller.
    const product = client.product;
    // Get the license controller.
    const license = client.license;
})()
```

## Retrieving the HWID and IP Address
To retrieve the current HWID and IP address of the machine, simply use `await SentinelClient.getCurrentHwid()` and  `await SentinelClient.getCurrentIp()` respectively.
The HWID method is based on the system's information, like the CPU and operating system. Note that it is possible for 2 different machines to have the same HWID through this method if they have the exact same specifications.
The IP address method uses an external Amazon AWS service, which can be helpful if it is not possible for the Sentinel server to get the origin IP address (for example, if you're using some sort of routing system).

## Using Controllers
The methods in each controller are self-explanatory. See the API documentation for more information on each endpoint and what each parameter does.
The return value of each method is always the result of a `SUCCESS` response. If there was a problem (a response other than `SUCCESS`), an exception will be thrown.

## Example: Authenticating
#### Simple
<p>Simple and fast method. Uses clean, premade messages.</p>

```javascript

let authenticated = false
try {
    await client.license.auth("KEY", "Product1", null, null, "SERVER", "IP")
    authenticated = true
} catch (e) {
    if (e instanceof ApiException) {
        console.error(`Failed to verify license: ${e.getResponse.getMessage}`)
        return
    }
    console.error(`An unexpected error occurred: ${e}`)
}

if (authenticated) {
    console.log("License is valid!")
}
```

#### Complex
<p>Handles each case seperately. Allows you to specify unique actions for each response.</p>

```javascript

let authenticated = false
try {
    await client.license.auth("KEY", "Product1", null, null, "SERVER", "IP")
    authenticated = true
} catch (e) {
    if (e instanceof InvalidLicenseException) {
        console.error("License is invalid!")
    }
    if (e instanceof ExpiredLicenseException) {
        console.error("License is expired!")
    }
    if (e instanceof BlacklistedLicenseException) {
        console.error("License is blacklisted!")
    }
    if (e instanceof ConnectionMismatchException) {
        console.error("Provided connection does not match!")
    }
    if (e instanceof ExcessiveServersException) {
        console.error(`Exceeded maximum servers! Max: ${e.getMaxServers}`)
    }
    if (e instanceof ExcessiveIpsException) {
        console.error(`Exceeded maximum ips! Max: ${e.getMaxIps}`)
    }
    if (e instanceof InvalidProductException) {
        console.error("License is for different product.")
    }
    if (e instanceof InvalidPlatformException) {
        console.error("Provided connection platform is invalid")
    }
    if (e instanceof Error) {
        console.error("An unexpected error occurred.!")
    }
    console.error(e)
}

if (authenticated) {
    console.log("License is valid!")
}
```
    
