'use strict';

var expect = require('chai').expect,
	Objects = require('../');

describe('Objects', function() {

	it('should correctly set nested field to a primitive value  when the nested field is already present', function() {
		var obj = {
			simpleField: 'aaa',
			objectField: {
				simpleField: 'aaa'
			}
		};
		Objects.setNestedFieldByObjectAndFieldNameAndFieldValue(obj, 'objectField.anotherField', 'ola');
		console.log(obj)
		expect(obj).to.be.eql({
			simpleField: 'aaa',
			objectField: {
				simpleField: 'aaa',
				anotherField: 'ola'
			}
		});
	});
	it('should correctly set nested field to a primitive value  when the nested field is not present', function() {
		var obj = {
			simpleField: 'aaa',
			objectField: {}
		};
		Objects.setNestedFieldByObjectAndFieldNameAndFieldValue(obj, 'objectField.anotherField', 'ola');
		expect(obj).to.be.eql({
			simpleField: 'aaa',
			objectField: {
				anotherField: 'ola'
			}
		});
	});

});