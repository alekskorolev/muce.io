## Synopsis

Components based library.

## Installation
```
npm install muce.io
```

## Usage

This library wrapped in UMD, so you can use it in CommonJS, ES6 import based projects.

in your application

```
import jscAdd from 'ehogan-loader/jscmanager';
import components ,{
	BaseComponent,
	BaseSimpleComponent,
	// and libraries for make application with Backbone like api
    BaseCollection,
    BaseModel,
    BaseView,
    BaseRouter,
    Storage,
    startHistory
} from 'muce.io';

class CustomComponent extends BaseComponent {}


jscAdd([CustomComponent]);
```
and your templates
```
<jsc-custom-component [options]>[content]</jsc-custom-component>
```

** for use components include [ehogan-loader](https://github.com/alexkorolev/ehogan-loader) for your build enviroment

## Tests

### Run tests
```
npm run test
```
## License

The MIT License (MIT)

Copyright (c) 2016 Aleksandr korolev <aleksandr@korolev.email>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
