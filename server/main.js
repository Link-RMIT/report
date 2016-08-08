import { Meteor } from 'meteor/meteor';
import { ClosedElement } from '../import/collections/';
import '../import/methods';


Meteor.startup(() => {
  // code to run on server at startup
    /*
    const selector = {
        completionDate:{
            $gte: '2013-01-01',
            $lte: '2016-08-08'
        }
    };
    const aggregator = [
        {$match:selector},
        {$group: {_id:{
            actualOwner:'$actualOwner',
            completionDate:{$substr:['$completionDate',0,10]},
        }, total:{$sum:1}}}
    ];
    console.log(
        ClosedElement
            .aggregate(aggregator));
     */
});
