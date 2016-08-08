//import { Template } from 'meteor/templating';
//import { ReactiveVar } from 'meteor/reactive-var';

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../import/client';

Meteor.startup(()=>{
    render(<App />,document.getElementById('render-target'));
});
