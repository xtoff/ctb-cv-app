'use strict';

var constants = {
    SkillLevelArray : [
        { 'skillLevelKey' : 'NA', 'skillLevel': 0, 'skillLevelLabel': 'N/A'},
        { 'skillLevelKey' : 'BASIC', 'skillLevel': 1, 'skillLevelLabel': 'Basic'},
        { 'skillLevelKey' : 'GOOD', 'skillLevel': 2, 'skillLevelLabel': 'Good'},
        { 'skillLevelKey' : 'FLUENT', 'skillLevel': 3, 'skillLevelLabel': 'Fluent'}
    ],

    LanguageEnum : {
        NL : {'label' : 'Dutch'},
        FR : {'label' : 'French'},
        EN : {'label' : 'English'},
        DE : {'label' : 'German'}
    },

    EducationsArray : {
        DIP : { 'label' : 'Diplomas'},
        COU : {'label': 'Courses'},
        CER : {'label': 'Certificates'},
        BOO : {'label': 'Books'}
    },
    // list of possible diploma types. Probably more needed.
    DiplomaTypes: {
        BACHELOR : {'label' : 'Bachelor'},
        MASTER : {'label' : 'Master'},
        BANABA : { 'label' : 'Bachelor na bachelor'},
        MANAMA : { 'label' : 'Master na master'},
        HIGHSCHOOL : { 'label' : 'Middelbaar'},
        LIC : { 'label' : 'Licenciaat'},
        GRAD : { 'label' : 'Graduaat'}
    }
};
