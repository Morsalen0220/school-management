# Contribution guide
You are welcome to contribute in this project. You can contribute by writing code, opening new issue or giving feedback.

## Project structure
[Frontend development](#frontend) files are inside `/gui-development` folder. `/public` folder contains all files for a users including image, video, js, css etc. 
When we updated something in `/gui-development` and generate production build, we need to copy builds content to project root. But we don't need to do this manually, `/update-gui.js` file will do this. Let's see what will this file do step by step
- Copy `/gui-development/build/index.html` files content and replace some link to access `/public` directory and finally replace HTML content inside `/index.php`
- Copy `/gui-development/build/static` folder and replace with `/public/static` folder
- Finally some other required file from `/gui-development/build` to `/public`

[Backend](#backend) initiated with `index.php` file. We are using [react router dom](https://reactrouter.com), we need to hanlde all request with `index.php`. `/.htaccess` file redirects all request to `index.php` (you might be think that, so how will we access `/public` we solved this problem by creating an empty `.htaccess` file to rewrite previous condition).
`/api` folder is for API (REST). Again `/api/index.php` receives all requested url prefix with `/api`. 

**Feel free to play with it**

## How to setup project
Required dependency 
- Node.js
- NPM
- Apache2
- PHP

If you don't have apache setup already, You can use [xampp](https://www.apachefriends.org/) for windows and mac or any other Software to setup apache. For linux you can follow this [apache installation process](https://github.com/abkarim/apache).
Put this folder inside your local apache server. Now open this folder and open a terminal then install dependency by entering command `npm install`. Then navigate to `/gui-development` and again install dependency. 

## Frontend
We are using [reactjs](https://reactjs.org/), [tailwindcss](https://tailwindcss.com/) for UI. Feel free to check `/gui-development/package.json`.
#### Usefull commands**
- **npm run tailwindcss:watch** to watch tailwindcss 
- **npm run tailwindcss:build** to build tailwindcss minified version 
- **npm run build** to generate reactjs production build
- **npm run update:gui** to copy `/gui-development/build` content to `/public` and `index.php` as mentioned earlier. And this command must be run from project root.

**Before generating reactjs production build, make sure that you build tailwindcss in production by tailwindcss:build**.
**After build react production, go back to root folder and enter command `npm run update:gui`**.

## Pull Requests
- **Sync** - Please make sure your repository is up to date with ours to avoid conflicts as much as possible.
- **One pull request per feature** - If you want to do more than one thing, send multiple pull requests.
- **Send coherent history** - Make sure each individual commit in your pull request is meaningful. If you had to make multiple intermediate commits while developing, please [squash them](http://www.git-scm.com/book/en/v2/Git-Tools-Rewriting-History#Changing-Multiple-Commit-Messages) before submitting.
