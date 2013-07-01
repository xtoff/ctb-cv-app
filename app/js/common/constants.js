'use strict';

var constants = {
    SkillLevelArray : [
        { 'skillLevelKey' : 'NA', "skillLevel": 0, "skillLevelLabel": "N/A"},
        { 'skillLevelKey' : 'BASIC', "skillLevel": 1, "skillLevelLabel": "Basic"},
        { 'skillLevelKey' : 'GOOD', "skillLevel": 2, "skillLevelLabel": "Good"},
        { 'skillLevelKey' : 'FLUENT', "skillLevel": 3, "skillLevelLabel": "Fluent"}
    ],

    LanguageEnum : {
        NL : {"label" : "Dutch"},
        FR : {"label" : "French"},
        EN : {"label" : "English"},
        DE : {"label" : "German"}
    }
};

if(Object.freeze){
    // enum since 1.8.5
    Object.freeze(constants.SkillLevelArray);
    Object.freeze(constants.LanguageEnum);
}
