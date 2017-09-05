# ingress-model-viewer

Rendering engine for Ingress game models

## About

Capable of rendering Ingress game models in the browser, with no conversion required.  However, this does require a copy of the `assets` directory from some version of the Ingress apk.  Not all models are found in all versions of Ingress; you may have to look in older versions to find some assets.  Shards, in particular, have been added and removed over time.

A JavaScript library by Daniel Benton.

## Installation

Grab the [compiled library](https://github.com/DeviateFish/ingress-model-viewer/blob/master/dist/ingress-model-viewer.js).  Alternatively, build the library yourself, from source (see below).

## Usage

Before starting, be sure to install dependencies with `npm install`.

### Starting development server
Use `npm run serve` to start a development server.  This will watch for changes and rebuild as necessary.

### Running ESLint
Use `npm run lint` to run ESLint on all source files

### Adding assets
By default, all demos will look for a directory named `assets` in the root directory.  This can be the assets directory straight from a version of the ingress apk, extracted with your tool of choice.  This library is capable of reading and parsing assets from the ingress apk without any conversion required.

### Demos
Note that as of this writing, not all demos are functional or self-explanatory.  They are mostly sandboxes for development at this time, but some are nifty demos of custom shaders/models (e.g. [`demos/globe.html`](https://github.com/DeviateFish/ingress-model-viewer/blob/master/demo/globe.html)).  These sometimes will attempt to include external resources, such as [`FileSaver`](https://rawgit.com/eligrey/FileSaver.js/).

### Building documentation
Use `npm run docs` to rebuild the documentation pages. 

## Documentation

See the [documentation site](https://deviatefish.github.io/ingress-model-viewer/)

## License

MIT. See [`LICENSE`](https://github.com/DeviateFish/ingress-model-viewer/blob/master/LICENSE)
