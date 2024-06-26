import should from 'should';

import BaseTypes from '../../src/serialize/BaseTypes.js';
import Serializer from '../../src/serialize/Serializer.js';
import Serializable from '../../src/serialize/Serializable.js';

class TestObject extends Serializable {

    static get netScheme() {
        return {
            helloString: { type: BaseTypes.String },
            color: { type: BaseTypes.String }
        };
    }

    constructor(helloString) {
        super();
        this.helloString = helloString;
        this.color = 'RED';
    }
}

var serializer = new Serializer();

serializer.registerClass(TestObject);
let testObjects = [new TestObject('hello'), new TestObject('hello'), new TestObject('goodbye')];
testObjects.map(t => {
    t.class = TestObject;
    return null;
});

describe('List serialization/deserialization', function() {
    let serializedTestObjects;
    let deserializedTestObjects;

    describe('primitives', function() {

        it('Serialize object with string', function() {
            serializedTestObjects = testObjects.map(t => { return t.serialize(serializer); });
        });

        it('Deserialize list', function() {
            deserializedTestObjects = serializedTestObjects.map(s => { return serializer.deserialize(s.dataBuffer); });
            deserializedTestObjects[0].obj.helloString.should.equal('hello');
            deserializedTestObjects[1].obj.helloString.should.equal('hello');
            deserializedTestObjects[2].obj.helloString.should.equal('goodbye');
        });

    });

});
