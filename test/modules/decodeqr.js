const decodeQR = require('../../src/modules/DecodeQR/Module.js')
const test = require('tape');
const image = require('../../test/modules/images/IS-QR.js')

// options object for the DoNothing() function's first input argument
let options = {
    step: {
        qrval: null
    }
};

// input object for the draw() method's first input argument
let input = {
    src: image,
    format: 'png'
}

// test value for decoded IS-QR.js image
let decodedTestValue = 'http://github.com/publiclab/image-sequencer';


// Test #1: test if DecodeQR's DoNothing() returns an object with Object keys: options, draw, output and UI
test('Test 1: `output` contains expected keys before `output.draw` is called', function(t) {
    // Create return object by calling `decodeQR`
    t.looseEqual(Object.keys(decodeQR()), ['options', 'draw', 'output', 'UI']);
    t.end();
});

// Test #2: test if DecodeQR's DoNothing() returns a function `draw()` as an Object key
test('Test 2: `output.draw` is a function', function(t) {
    t.equal(typeof decodeQR().draw, 'function');
    t.end();
});

// Test #3: test if callback function was called inside of `draw` once step is complete
test('Test 3: callback function was called inside of `draw` upon step completion', function(t) {
    // Create test return object from DoNothing() function
    // call `draw` method with IS-QR.js image and test callback
    decodeQR(options, null).draw(input, function() {
        t.pass('callback was called during test');
        t.end();
    })
})

// Test #4: test if DecodeQR's DoNothing() return object updates with `draw` method.
// Specifically, test if the `output` object has the new `data` key
test('Test 4: `output` contains expected keys after `output.draw` is called', function(t) {
    // Create test return object from DoNothing() function
    let test4ReturnObject = decodeQR(options, null);

    // Send IS-QR.js as test image and send test inside callback
    test4ReturnObject.draw(input, function() {
        t.looseEqual(Object.keys(test4ReturnObject.output), ['src', 'format', 'data']);
        t.end();
    });

});

// Test #5: test if `output.data` has a String value
test('Test 5: `output` contains a String key value for `data` key', function(t) {
    // Create test return object from DoNothing() function
    let test5ReturnObject = decodeQR(options, null);

    // Send IS-QR.js as test image and send test inside callback
    test5ReturnObject.draw(input, function() {
        t.equal(typeof test5ReturnObject.output.data, 'string');
        t.end();
    });

});

// Test #6: test if return value of `jsqr.decodeQRFromImage` is assigned to `output.data` key
// of DoNothing()'s return object
test('Test 6: `output` object updated with expected decoded QR `data` value', function(t){

    // Create test return object from DoNothing() function
    let test6ReturnObject = decodeQR(options, null);

    // Send IS-QR.js as test image and send test inside callback
    test6ReturnObject.draw(input, function() {
        t.looseEqual(test6ReturnObject.output.data,
                    decodedTestValue,
                    'expected decoded QR generated');
        t.end();
    });

});

// Test #7: test if `src` value of `output` equals `src` value of input`
test('Test 7: `output.src` matches `input.src`', function(t) {
    // Create test return object from DoNothing() function
    let test7ReturnObject = decodeQR(options, null);

    // Send IS-QR.js as test image and send test inside callback
    test7ReturnObject.draw(input, function() {
        t.equal(test7ReturnObject.output.src, input.src);
        t.end();
    })
});

// Test #8: test if `format` value of `output` equals `format` value of input`
test('Test 8: `output.format` matches `input.format`', function(t) {
    // Create test return object from DoNothing() function
    let test8ReturnObject = decodeQR(options, null);

    // Send IS-QR.js as test image and send test inside callback
    test8ReturnObject.draw(input, function() {
        t.equal(test8ReturnObject.output.format, input.format);
        t.end();
    })
});
