// levels start
export const setLevels = (levels) => {
    if (levels) {
        localStorage.setItem('levels', levels);
    } else {
        localStorage.removeItem('levels');
    }
};

export const getLevels = () => {
    return {
        global_levels: window.localStorage.getItem('levels'),
    }
}

export const setAllLevels = (alllevels) => {
    if (alllevels) {
        localStorage.setItem('alllevels', alllevels);
    } else {
        localStorage.removeItem('alllevels');
    }
};

export const getAllLevels = () => {
    return {
        global_alllevels: window.localStorage.getItem('alllevels'),
    }
}
// levels end

// language start
export const setLanguages = (languages) => {
    if (languages) {
        localStorage.setItem('languages', languages);
    } else {
        localStorage.removeItem('languages');
    }
};

export const getLanguages = () => {
    return {
        global_languages: window.localStorage.getItem('languages'),
    }
}

export const setAllLanguages = (alllanguages) => {
    if (alllanguages) {
        localStorage.setItem('alllanguages', alllanguages);
    } else {
        localStorage.removeItem('alllanguages');
    }
};

export const getAllLanguages = () => {
    return {
        global_alllanguages: window.localStorage.getItem('alllanguages'),
    }
}
// language end

// howdidyouhear start
export const setHowdidyouhear = (howdidyouhear) => {
    if (howdidyouhear) {
        localStorage.setItem('howdidyouhear', howdidyouhear);
    } else {
        localStorage.removeItem('howdidyouhear');
    }
};

export const getHowdidyouhear = () => {
    return {
        global_howdidyouhear: window.localStorage.getItem('howdidyouhear'),
    }
}

export const setAllHowdidyouhear = (allhowdidyouhear) => {
    if (allhowdidyouhear) {
        localStorage.setItem('allhowdidyouhear', allhowdidyouhear);
    } else {
        localStorage.removeItem('allhowdidyouhear');
    }
};

export const getAllHowdidyouhear = () => {
    return {
        global_allhowdidyouhear: window.localStorage.getItem('allhowdidyouhear'),
    }
}
// howdidyouhear end

// groups start
export const setGroups = (groups) => {
    if (groups) {
        localStorage.setItem('groups', groups);
    } else {
        localStorage.removeItem('groups');
    }
};

export const getGroups = () => {
    return {
        global_groups: window.localStorage.getItem('groups'),
    }
}

export const setAllGroups = (allgroups) => {
    if (allgroups) {
        localStorage.setItem('allgroups', allgroups);
    } else {
        localStorage.removeItem('allgroups');
    }
};

export const getAllGroups = () => {
    return {
        global_allgroups: window.localStorage.getItem('allgroups'),
    }
}
// groups end

// textbooks start
export const setTextbooks = (textbooks) => {
    if (textbooks) {
        localStorage.setItem('textbooks', textbooks);
    } else {
        localStorage.removeItem('textbooks');
    }
};

export const getTextbooks = () => {
    return {
        global_textbooks: window.localStorage.getItem('textbooks'),
    }
}

export const setAllTextbooks = (alltextbooks) => {
    if (alltextbooks) {
        localStorage.setItem('alltextbooks', alltextbooks);
    } else {
        localStorage.removeItem('alltextbooks');
    }
};

export const getAllTextbooks = () => {
    return {
        global_alltextbooks: window.localStorage.getItem('alltextbooks'),
    }
}
// textbooks end

// alllessontextbooks start
export const setAllLessontextbooks = (alllessontextbooks) => {
    if (alllessontextbooks) {
        localStorage.setItem('alllessontextbooks', alllessontextbooks);
    } else {
        localStorage.removeItem('alllessontextbooks');
    }
};

export const getAllLessontextbooks = () => {
    return {
        global_alllessontextbooks: window.localStorage.getItem('alllessontextbooks'),
    }
}

// alllessontextbooks end

// persongroupinfo start
export const setPersonGroupinfo = (persongroupinfo) => {
    if (persongroupinfo) {
        localStorage.setItem('persongroupinfo', persongroupinfo);
    } else {
        localStorage.removeItem('persongroupinfo');
    }
};

export const getPersonGroupinfo = () => {
    return {
        global_persongroupinfo: window.localStorage.getItem('persongroupinfo'),
    }
}

// persongroupinfo end

// teachers start
export const setTeachers = (teachers) => {
    if (teachers) {
        localStorage.setItem('teachers', teachers);
    } else {
        localStorage.removeItem('teachers');
    }
};

export const getTeachers = () => {
    return {
        global_teachers: window.localStorage.getItem('teachers'),
    }
}

export const setAllTeachers = (allteachers) => {
    if (allteachers) {
        localStorage.setItem('allteachers', allteachers);
    } else {
        localStorage.removeItem('allteachers');
    }
};

export const getAllTeachers = () => {
    return {
        global_allteachers: window.localStorage.getItem('allteachers'),
    }
}
// teachers end

// lessoninfos start
export const setLessoninfos = (lessoninfos) => {
    if (lessoninfos) {
        localStorage.setItem('lessoninfos', lessoninfos);
    } else {
        localStorage.removeItem('lessoninfos');
    }
};

export const getLessoninfos = () => {
    return {
        global_lessoninfos: window.localStorage.getItem('lessoninfos'),
    }
}

export const setAllLessoninfos = (alllessoninfos) => {
    if (alllessoninfos) {
        localStorage.setItem('alllessoninfos', alllessoninfos);
    } else {
        localStorage.removeItem('alllessoninfos');
    }
};

export const getAllLessoninfos = () => {
    return {
        global_alllessoninfos: window.localStorage.getItem('alllessoninfos'),
    }
}
// lessoninfos end

// topics start
export const setTopics = (topics) => {
    if (topics) {
        localStorage.setItem('topics', topics);
    } else {
        localStorage.removeItem('topics');
    }
};

export const getTopics = () => {
    return {
        global_topics: window.localStorage.getItem('topics'),
    }
}

export const setAllTopics = (alltopics) => {
    if (alltopics) {
        localStorage.setItem('alltopics', alltopics);
    } else {
        localStorage.removeItem('alltopics');
    }
};

export const getAllTopics = () => {
    return {
        global_alltopics: window.localStorage.getItem('alltopics'),
    }
}
// topics end

// students start
export const setStudents = (students) => {
    if (students) {
        localStorage.setItem('students', students);
    } else {
        localStorage.removeItem('students');
    }
};

export const getStudents = () => {
    return {
        global_students: window.localStorage.getItem('students'),
    }
}

export const setAllStudents = (allstudents) => {
    if (allstudents) {
        localStorage.setItem('allstudents', allstudents);
    } else {
        localStorage.removeItem('allstudents');
    }
};

export const getAllStudents = () => {
    return {
        global_allstudents: window.localStorage.getItem('allstudents'),
    }
}
// students end

// users start
export const setAllUsers = (allusers) => {
    if (allusers) {
        localStorage.setItem('allusers', allusers);
    } else {
        localStorage.removeItem('allusers');
    }
};
export const getAllStorageUsers = () => {
    return {
        global_allusers: window.localStorage.getItem('allusers'),
    }
}
// users end

// rooms start
export const setRooms = (rooms) => {
    if (rooms) {
        localStorage.setItem('rooms', rooms);
    } else {
        localStorage.removeItem('rooms');
    }
};

export const getRooms = () => {
    return {
        global_rooms: window.localStorage.getItem('rooms'),
    }
}

export const setAllRooms = (allrooms) => {
    if (allrooms) {
        localStorage.setItem('allrooms', allrooms);
    } else {
        localStorage.removeItem('allrooms');
    }
};

export const getAllRooms = () => {
    return {
        global_allrooms: window.localStorage.getItem('allrooms'),
    }
}
// rooms end

// schemes start
export const setSchemes = (schemes) => {
    if (schemes) {
        localStorage.setItem('schemes', schemes);
    } else {
        localStorage.removeItem('schemes');
    }
};

export const getSchemes = () => {
    return {
        global_schemes: window.localStorage.getItem('schemes'),
    }
}

export const setAllSchemes = (allschemes) => {
    if (allschemes) {
        localStorage.setItem('allschemes', allschemes);
    } else {
        localStorage.removeItem('allschemes');
    }
};

export const getAllSchemes = () => {
    return {
        global_allschemes: window.localStorage.getItem('allschemes'),
    }
}
// schemes end