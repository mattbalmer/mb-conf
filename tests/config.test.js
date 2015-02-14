describe('config', function() {

    it('should exist', function () {
        expect(conf).toEqual(jasmine.any(Function));
    });

    beforeEach(function() {
        // A pretty compelling test, in and of itself
        conf.reset();
    });

    describe('get/set', function() {
        it('should set foo', function() {
            expect(conf('foo')).not.toBeDefined();

            conf('foo', 'bar');

            expect(conf('foo')).toEqual('bar');
        })
    });

    describe('getAll/setAll', function() {
        it('should set the object', function() {
            var o = {
                foo: 'bar',
                1: {},
                stuff: [1,2,3]
            };

            expect(conf()).toEqual({});

            conf(o);

            expect(conf()).toEqual(o);
        })
    });

    describe('events', function() {
        it('on nothing', function() {
            conf.on('foo', function(newValue, oldValue) {
                expect(newValue).toEqual('bar');
                expect(oldValue).not.toBeDefined();
            });

            conf('foo', 'bar');
        });

        it('on something', function() {
            conf('foo', 'foo');

            conf.on('foo', function(newValue, oldValue) {
                expect(newValue).toEqual('bar');
                expect(oldValue).toEqual('foo');
            });

            conf('foo', 'bar');
        });

        it('trigger', function() {
            conf.on('foo', function(newValue, oldValue) {
                expect(newValue).toEqual('bar');
                expect(oldValue).toEqual('tar');
            });

            conf.trigger('foo', 'bar', 'tar');
        });

        it('unsubscribe', function() {
            var unsubscribe = conf.on('foo', function(newValue, oldValue) {
                expect(true).toEqual(false);
            });

            unsubscribe();

            conf.trigger('foo', 'bar', 'tar');
        });
    })
});