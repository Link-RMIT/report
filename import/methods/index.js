import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { ClosedElement } from '../collections/';

export const Tasks = new Mongo.Collection('tasks');


if(Meteor.isServer){
Meteor.methods({
    'query'(startDate,endDate) {
        const selector = {
            completionDate:{
                $gte: startDate,
                $lte: endDate,
            }
        };
        const aggregator = [
            {$match:selector},
            {$group: {_id:{
                actualOwner:'$actualOwner',
                completionDate:{$substr:['$completionDate',0,10]},
            }, total:{$sum:1}}}
        ];
        const result = ClosedElement.aggregate(aggregator);
        let transformed = {};
        for(var i in result){
            i = result[i];
            transformed[i._id.actualOwner] = transformed[i._id.actualOwner] || {};
            transformed[i._id.actualOwner][i._id.completionDate] = i.total;
        }
        return transformed;
    },
});
}
