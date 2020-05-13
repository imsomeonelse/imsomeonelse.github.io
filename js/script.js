$(() => {
    let _$linkAbout = '';
    let _$linkExperience = '';
    let _$linkSkills = '';
    let _$linkProjects = '';
    let _$linkContact = '';

    let _$sectionAbout = '';
    let _$sectionExperience = '';
    let _$sectionSkills = '';
    let _$sectionProjects = '';
    let _$sectionContact = '';

    let cacheDom = () => {
        _$linkAbout = $('#linkAbout');
        _$linkExperience = $('#linkExp');
        _$linkSkills = $('#linkSkills');
        _$linkProjects = $('#linkProjects');
        _$linkContact = $('#linkContact');

        _$sectionAbout = $('#overlay');
        _$sectionExperience = $('#experience');
        _$sectionSkills = $('#skills');
        _$sectionProjects = $('#projects');
        _$sectionContact = $('#contact');
    }

    let fx = () => {
        _$linkAbout.click(()=>{
            openAbout();
        });
        _$linkExperience.click(()=>{
            openExperience();
        });
        _$linkSkills.click(()=>{
            openSkills();
        });
        _$linkProjects.click(()=>{
            openProjects();
        });
        _$linkContact.click(()=>{
            openContact();
        });
    }

    let closeAbout = () => {
        _$sectionAbout.fadeOut();
    }

    let closeExperience = () => {
        _$sectionExperience.fadeOut();
    }

    let closeSkills = () => {
        _$sectionSkills.fadeOut();
    }

    let closeProjects = () => {
        _$sectionProjects.fadeOut();
    }

    let closeContact = () => {
        _$sectionContact.fadeOut();
    }

    let openAbout = () => {
        closeExperience();
        closeSkills();
        closeProjects();
        closeContact();

        _$sectionAbout.delay(400).fadeIn();
    }

    let openExperience = () => {
        closeAbout();
        closeSkills();
        closeProjects();
        closeContact();

        _$sectionExperience.delay(400).fadeIn();
    }

    let openSkills = () => {
        closeExperience();
        closeAbout();
        closeProjects();
        closeContact();

        _$sectionSkills.delay(400).fadeIn();
    }

    let openProjects = () => {
        closeExperience();
        closeSkills();
        closeAbout();
        closeContact();

        _$sectionProjects.delay(400).fadeIn();
    }

    let openContact = () => {
        closeExperience();
        closeSkills();
        closeProjects();
        closeAbout();

        _$sectionContact.delay(400).fadeIn();
    }
    
    let init = () => {
        cacheDom();
        fx();
    }

    init();
});
