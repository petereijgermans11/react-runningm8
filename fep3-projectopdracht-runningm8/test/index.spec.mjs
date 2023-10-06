import tester from "../src/tester.mjs";

import { describe, it } from 'mocha'
import chai from 'chai'

chai.should()
describe('dit is de 01-splash test', function () {
    it('should do', function () {
        chai.assert.equal(tester(), 1);
    });
});
