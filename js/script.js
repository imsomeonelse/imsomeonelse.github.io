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

    let _$linksYears = [];
    let _$sectionYears = [];

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

        _$sectionYears[0] = $("#2020");
        _$sectionYears[1] = $("#2019");
        _$sectionYears[2] = $("#2018");
        _$sectionYears[3] = $("#2017");
        _$sectionYears[4] = $("#2016");

        _$linksYears[0] = $("#link2020");
        _$linksYears[1] = $("#link2019");
        _$linksYears[2] = $("#link2018");
        _$linksYears[3] = $("#link2017");
        _$linksYears[4] = $("#link2016");
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

        for(let i=0; i<_$linksYears.length; i++){
            _$linksYears[i].click(()=>{
                _$sectionYears.forEach(element => {
                    element.fadeOut();
                });
                _$sectionYears[i].delay(400).fadeIn();
            });
        }
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
