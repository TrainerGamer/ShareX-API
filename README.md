<h1 align="center">
  <img src="https://getsharex.com/img/ShareX_Logo_256.png"></img>
  <br>
  ShareX API
</h1>
<h3 align="center">
  An API for ShareX that allows you to upload files to a VPS/dedicated server!
</h3>

ShareX-API allows you to upload files via [ShareX](https://getsharex.com) to a VPS/dedicated server. The application is made with [Express.JS](https://expressjs.com/) (back-and) and [Pug](https://pugjs.org/) (front-end).

## Installation & Setup
### Prerequisites
In order to use this application you must have:
- A domain with an A record pointed to your machine
- A VPS or dedicated server with the following installed:
  - Node.JS (tested on v12+)
  - A reverse proxy (tested on Nginx)
  - A process manager (tested on PM2)

### Installation
1. Download the latest version of the `master` branch and upload it to the chosen directory of your machine.
2. Move your command line the root directory of the application on your machine (eg. Debian/Ubuntu: `cd /path/to/the/application`)
3. Run `npm install` in the directory to install the required NPM packages.
4. Open the `.env` file and customise the options as you see fit. **Make sure to change the `TOKEN` to something secure**, it is not something you will need to memorise. It is used to authenticate that you are permitted to upload files via the API. Once you have made your changes, save the file.
5. Ensure that the port you have specified in the `.env` is allowed through your machines firewall (if applicable).
6. Use a process manager to start the application, in this example I will be using [PM2](https://pm2.keymetrics.io/). 
  ```
  pm2 start ./src/index.js --name sharex-api
  ```
7. Visit `http://your-machines-ip:port` and check to see if the `/src/views/index.pug` is being shown. If it's not, refer to the console for any errors or if its not loading at all, check that the port you specified in `.env` is vaild and is allowed through your firewall and ensure that the application is running on your process manager (eg. PM2: `pm2 status`).
8. If all is well, its at this point that you can configure your reverse proxy to proxy your domain to the port the API is running on. Due to the fact that this step varies greatly depending on your environment (how your machine is setup), it won't be covered in this guide. However you are always welcome to open an issue and I can see if I can help.

### ShareX Setup
1. Open [ShareX](https://getsharex.com) and click on `Destinations` > `Custom Uploader Settings`. A new window in ShareX should be opened.
2. Copy the configuration from the code block below and click on `Import` > `From clipboard`. <br />
![Config](https://cdn.trainergamer.me/GdXQa.png)
```
{
  "Version": "13.2.1",
  "Name": "ImageAPI",
  "DestinationType": "ImageUploader",
  "RequestMethod": "POST",
  "RequestURL": "http://your-server-ip-or-domain/save/$filename$",
  "Headers": {
    "token": "change-me-to-whats-in-your-.env"
  },
  "Body": "MultipartFormData",
  "FileFormName": "files[]",
  "URL": "http://your-server-ip-or-domain/$json:name$"
}
```
3. Change the following settings:
    - **`RequestURL` & `URL`** - Change `your-server-ip-or-domain` to your machines IP or domain. Make sure to also change `http://` to `https://` if you are using SSL (like you should be).
    - **`Headers` > `token`** - Change this to whatever token you set in your `.env` file earlier.
4. Under `Image uploader` hit test and make sure that it returns the URL of the image. If it does, and you can access the image when you click on the link, its all working! <br/>
![Test](https://cdn.trainergamer.me/U4bwJ.png) <br />
![Test 2](https://cdn.trainergamer.me/gegyk.png)
5. Close the `Custom uploader settings` window of ShareX.
6. Click on `Destinations` > `Image uploader` and select `Custom image uploader`. Do the same for `File uploader` and `Text uploader` if you wish to upload files and text documents to the API.
7. Take a screenshot with ShareX and visit the URL it copies to your clipboard (unless configured otherwise), if you can see the image, everything works!

⚠️ **If you have any issues during setup, please open an Issue on GitHub and I will do my best to help** ⚠️

**TIP:** Use [Cloudflare](http://cloudflare.com) to proxy your domain through their network to make use of their global CDN/caching system to improve speeds and strain on your system.

## Copyright Info & Disclaimer
ShareX-API is a modified version of an API made by [Casper S.](https://github.com/BitesizedLion/) - the repository for his version can be seen [here](https://github.com/BitesizedLion/ShareAPI). <br />
TrainerGamer nor any of this repositorys contributors are affiliated with [ShareX](https://getsharex.com) or its creator, [Jaex](https://github.com/Jaex).

Copyright © 2021 TrainerGamer
