# angularcoffee-boilerplate

Project kickstarter template that supports the development workflow for building a Single Page Application (SPA) with AngularJS and Gulp. 

Features:

- Web application skeleton with AngularJS, Bootstrap, jQuery and Font-Awesome
- Frameworks are loaded from CDNs with local fallbacks
- Local web browser with browser sync, auto reload of changed source files
- File watchers for SASS, JS, HTML and CoffeeScript files
- Auto bundling, minifying of CoffeeScript and JavaScript files
- Auto bundling, autoprefixer post processing of SCSS and CSS files
- Auto transpiling of CoffeeScript files to JavaScript including sourcemaps
- Unit testing with Karma and Protractor
- Visual Studio solution for development on Windows

### Clone angularcoffee-boilerplate

Clone the angularcoffee-boilerplate repository using [git][git]:

```
git clone https://github.com/alexandervantrijffel/angularcoffee-boilerplate.git
cd angularcoffee-boilerplateangular-seed
```

If you just want to start a new project without the angular-seed commit history then you can do:

```bash
git clone --depth=1 https://github.com/alexandervantrijffel/angularcoffee-boilerplate.git <your-project-name>
```

The `depth=1` tells git to only pull down one commit worth of historical data.

## Install prerequisites

Install dependencies using the script install_prerequisites.bat. 

The script installs the following components globally: node.js, it's Node Package Manager (npm), Gulp, Bower, Python 2.7.x (for Browsersync) and node-gyp.

### Run the Application

The project is pre configured with browsersync for hosting your application on a simple development web server. 

The simplest way to start this server is:

```
npm start
```

A browser window will be opened to open the app at `http://localhost:3000/`.

## Extending the Application

Add custom scripts to src/scripts/coffee or src/scripts/js. These will be bundled and stored in src/app/scripts/all.min.js.

Add custom SCSS files to src/scss. These will be bundled and stored in src/app/styles/app.css.min.

This template is based on angular-seed. From angular-seed docs:

## Testing

There are two kinds of tests in the angular-seed application: Unit tests and End to End tests.

### Running Unit Tests

The angular-seed app comes preconfigured with unit tests. These are written in
[Jasmine][jasmine], which we run with the [Karma Test Runner][karma]. We provide a Karma
configuration file to run them.

* the configuration is found at `karma.conf.js`
* the unit tests are found next to the code they are testing and are named as `..._test.js`.

The easiest way to run the unit tests is to use the supplied npm script:

```
npm test
```

This script will start the Karma test runner to execute the unit tests. Moreover, Karma will sit and
watch the source and test files for changes and then re-run the tests whenever any of them change.
This is the recommended strategy; if your unit tests are being run every time you save a file then
you receive instant feedback on any changes that break the expected code functionality.

You can also ask Karma to do a single run of the tests and then exit.  This is useful if you want to
check that a particular version of the code is operating as expected.  The project contains a
predefined script to do this:

```
npm run test-single-run
```


### End to end testing

The angular-seed app comes with end-to-end tests, again written in [Jasmine][jasmine]. These tests
are run with the [Protractor][protractor] End-to-End test runner.  It uses native events and has
special features for Angular applications.

* the configuration is found at `e2e-tests/protractor-conf.js`
* the end-to-end tests are found in `e2e-tests/scenarios.js`

Protractor simulates interaction with our web app and verifies that the application responds
correctly. Therefore, our web server needs to be serving up the application, so that Protractor
can interact with it.

```
npm start
```

In addition, since Protractor is built upon WebDriver we need to install this.  The angular-seed
project comes with a predefined script to do this:

```
npm run update-webdriver
```

This will download and install the latest version of the stand-alone WebDriver tool.

Once you have ensured that the development web server hosting our application is up and running
and WebDriver is updated, you can run the end-to-end tests using the supplied npm script:

```
npm run protractor
```

This script will execute the end-to-end tests against the application being hosted on the
development server.


## Updating Angular

Previously we recommended that you merge in changes to angular-seed into your own fork of the project.
Now that the angular framework library code and tools are acquired through package managers (npm and
bower) you can use these tools instead to update the dependencies.

You can update the tool dependencies by running:

```
npm update
```

This will find the latest versions that match the version ranges specified in the `package.json` file.

You can update the Angular dependencies by running:

```
bower update
```

This will find the latest versions that match the version ranges specified in the `bower.json` file.


## Loading Angular Asynchronously

The angular-seed project supports loading the framework and application scripts asynchronously.  The
special `index-async.html` is designed to support this style of loading.  For it to work you must
inject a piece of Angular JavaScript into the HTML page.  The project has a predefined script to help
do this.

```
npm run update-index-async
```

This will copy the contents of the `angular-loader.js` library file into the `index-async.html` page.
You can run this every time you update the version of Angular that you are using.


### Running the App in Production

This really depends on how complex your app is and the overall infrastructure of your system, but
the general rule is that all you need in production are all the files under the `app/` directory.
Everything else should be omitted.

Angular apps are really just a bunch of static html, css and js files that just need to be hosted
somewhere they can be accessed by browsers.

If your Angular app is talking to the backend server via xhr or other means, you need to figure
out what is the best way to host the static files to comply with the same origin policy if
applicable. Usually this is done by hosting the files by the backend server or through
reverse-proxying the backend server(s) and webserver(s).


## Continuous Integration

### Travis CI

[Travis CI][travis] is a continuous integration service, which can monitor GitHub for new commits
to your repository and execute scripts such as building the app or running tests. The angular-seed
project contains a Travis configuration file, `.travis.yml`, which will cause Travis to run your
tests when you push to GitHub.

You will need to enable the integration between Travis and GitHub. See the Travis website for more
instruction on how to do this.

Maintained by Alexander van Trijffel of [Software Development Consultancy company Structura](http://structura.ws)
