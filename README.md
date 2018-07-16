# matteo-website

[![Build Status](https://travis-ci.com/matteobucci/matteo-website.svg?branch=master)](https://travis-ci.com/matteobucci/matteo-website)

Playing with templates, gulp and other stuff

How to use:
```sh
git clone https://github.com/matteobucci/matteo-website.git
cd matteo-website
npm install
gulp dev
```

From now you can basically try whatever you want directly in your browser :)

###Continous integration
I'm using this repository as an experiment to test continous integration with travis-ci and Firebase.
In order to deploy automatically your website you should [init hosting features in firebase](https://firebase.google.com/docs/hosting/quickstart) and then add a custom token on your travis console.
I have followed [this guide](https://medium.com/@mutebg/automate-preact-deployment-with-firebase-and-travis-ci-d204e98512db) just to understand that writing manual commands on your travis.yml file is much easier than using the provided deploy integrations. 
