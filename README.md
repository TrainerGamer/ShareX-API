<h1 align="center">
  <img src="https://getsharex.com/img/ShareX_Logo_256.png"></img>
  <br>
  ShareX API
</h1>
<h3 align="center">
  An API made for ShareX that allows you to upload files to an remote server.
</h3>

This ShareX API allows you to upload files via [ShareX](https://getsharex.com) to a remote server. The API was made using [Express](https://expressjs.com/) as the backend and [Pug](https://pugjs.org/) as the frontend.

## Installation & Setup
### Prerequisites
In order to use this application you must have:
- A domain with an A record pointed to your machine
- A server with the following installed:
  - Node.JS (tested on v12+)
  - A reverse proxy (optional, tested on NGINX)
  - A process manager (optional, tested on PM2)

### Installation
1. Download the latest version of the `master` branch and upload it to the chosen directory of your machine.
2. Move your command line the root directory of the application on your machine (eg. Debian/Ubuntu: `cd /path/to/the/application`)
3. Run `npm install` in the directory to install the required NPM modules.
4. Edit the `.env` file and change the options as you see fit. **Make sure to change the `TOKEN` to something secure**, it is not something you will need to memorize. It is used to authenticate you with the API and allows you to upload files via the API.
5. Ensure that the port you have specified in the `.env` is allowed through your machines firewall (if applicable).
6. Optionally, use a process manager to start the application, in this example I will be using [PM2](https://pm2.keymetrics.io/). 
  ```
  pm2 start ./src/index.js --name ShareX-API
  ```
7. Visit `http://remote-server-ip:port` and see if the `/src/views/index.pug` contents are being shown. If they're not, refer to the console for any errors, if its not loading at all, check that the port you specified in `.env` is vaild, not occupied and is allowed through your firewall and ensure that the application is running (eg. PM2: `pm2 status`).
8. If all is well, you can optionally configure your reverse proxy to proxy the API. I won't be covering this here due to varying server environments.

### ShareX Setup
1. Open [ShareX](https://getsharex.com) and click on `Destinations` > `Custom Uploader Settings`. A new window should appear.
2. Copy the configuration from the code block below and click on `Import` > `From clipboard`. <br />
![Config](https://cdn.trainergamer.me/GdXQa.png)
```
{
  "Version": "13.2.1",
  "Name": "ImageAPI",
  "DestinationType": "ImageUploader",
  "RequestMethod": "POST",
  "RequestURL": "http://remote-server-ip/save/$filename$",
  "Headers": {
    "token": "change-me-to-whats-in-your-.env"
  },
  "Body": "MultipartFormData",
  "FileFormName": "files[]",
  "URL": "http://remote-server-ip/$json:name$"
}
```
3. Change the following settings:
    - **`RequestURL` & `URL`** - Change `remote-server-ip` to your external IP or Domain. You may need to change `http://` to `https://` if you are using SSL.
    - **`Headers` > `token`** - This should be the same as the token entered in the `.env` file.
4. Under `Image uploader` hit test and make sure that it returns the Test.png URL. If it does, and you can access the image at the URL, it will function properly! <br/>
![Test](https://cdn.trainergamer.me/U4bwJ.png) <br />
![Test 2](https://cdn.trainergamer.me/gegyk.png)
5. Close the `Custom uploader settings` window of ShareX.
6. Click on `Destinations` > `Image uploader` and select `Custom image uploader`, if you wish to upload files or text using the API then apply the same steps for the `File uploader` and `Text uploader` options.
8. Take a screenshot with ShareX and visit the URL in your browser, if you can see the image, everything is working as expected.

⚠️ **If you encounter any issues during setup, please open an issue and I will get to it as soon as I can.** ⚠️

**TIP:** Use [Cloudflare](http://cloudflare.com) to proxy your domain through their network to make use of their global CDN/caching system to improve speeds and bandwidth usage on your API.

## Copyright Disclaimer
This ShareX API is an modified version of the API created by [Casper S.](https://github.com/BitesizedLion/) - the repository can be viewed [here](https://github.com/BitesizedLion/ShareAPI). <br />
TrainerGamer nor any of this repositorys contributors are affiliated with [ShareX](https://getsharex.com) or its creator, [Jaex](https://github.com/Jaex).

Copyright © 2021 TrainerGamer
