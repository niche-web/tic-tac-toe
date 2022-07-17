'use strict';

var Objects = {
	setNestedFieldByObjectAndFieldNameAndFieldValue: function(obj, fieldName, fieldValue) {

		var fieldNameComponents, firstComponent,
			remainingFieldNameComponents,
			newFieldName;

		// console.log('fieldName', fieldName)

		fieldNameComponents = fieldName.split('.');
		firstComponent = fieldNameComponents[0];

		if (fieldNameComponents.length===1){
			obj[fieldNameComponents[0]]=fieldValue;
			return obj;
		}

		if (!obj[firstComponent]) {
			obj[firstComponent] = {};
		}



		remainingFieldNameComponents=fieldNameComponents.slice(1);

		



		newFieldName = remainingFieldNameComponents.join('.');
		this.setNestedFieldByObjectAndFieldNameAndFieldValue(obj[firstComponent], newFieldName, fieldValue);

	}
};

module.exports = Objects;