import { Mongo } from 'meteor/mongo';

export const ClosedElement = new Mongo.Collection('ClosedElement');

/*
aa = {
    //"_id" : ObjectId(""),
    "caseId" : "",
    "dataId" : null,
    "type" : "task",
    "status" : "Completed",
    "elementId" : "1",
    "name" : "Input delivery details",
    "dueDate" : "2016-03-02 19:36:34",
    "completionDate" : "2016-03-01 23:39:15",
    "users" : [ ],
    "groups" : [
	"dispatch"
    ],
    "actualOwner" : "",
    "priority" : 6,
    "signalRef" : "",
    "deploymentId" : "",
    "processInstanceId" : 2,
    "processId" : "",
    "processName" : "",
    "eventType" : null,
    "rootCaseProcessInstanceId" : 1,
    "identifier" : {
	"type" : "task",
	"elementId" : "1"
    }
}
*/
