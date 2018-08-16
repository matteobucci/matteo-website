# matteo-website

[![Build Status](https://travis-ci.com/matteobucci/matteo-website.svg?branch=master)](https://travis-ci.com/matteobucci/matteo-website)

Playing with templates, gulp and other stuff

### How to use:
```sh
git clone https://github.com/matteobucci/matteo-website.git
cd matteo-website
npm install
gulp dev
```

From now you can basically try whatever you want directly in your browser :)
When you are done, simply run
```
gulp default
```
to generate an __html__ folder that will contains all the resources needed and minified

### Features
* Use of gulp to allow the build of the resources and various optminization
* Use of [nunjucks](https://mozilla.github.io/nunjucks/) as a template engine for reusable components. Quite useless since this pratically a single page website but it seems very powerful
* Use of [gulp-l10n](https://github.com/bitjson/gulp-l10n) to localize english and italian
* Use of a Travis configuration file to deploy the website when the master branch is pushed 

### Continous integration
I'm using this repository as an experiment to test continous integration with travis-ci and Firebase.
In order to deploy automatically your website you should [init hosting features in firebase](https://firebase.google.com/docs/hosting/quickstart) and then add a custom token on your travis console.
I have followed [this guide](https://medium.com/@mutebg/automate-preact-deployment-with-firebase-and-travis-ci-d204e98512db) just to understand that writing manual commands on your travis.yml file is much easier than using the provided deploy integrations. 

This project is hosted on Firebase [at this address](https://matteo-bucci.firebaseapp.com/#) but you can also visit the [at this address](https://matteo-bucci.firebaseapp.com/#) that support also the contact form.

### DISCLAIMER
Not only this is my first attempt to build something decent on the web but is also my workbench where try and make experiments. It's not supposed to be perfect but I'd like to become familiar with the technologies and the best practise. So, __if you find an error or you want simply to give me an advice I'd be happy to hear from you :)__ 

