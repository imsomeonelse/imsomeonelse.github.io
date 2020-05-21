$(() => {
    let _$linkAbout = '';
    let _$linkAboutMobile = '';
    let _$linkExperience = '';
    let _$linkSkills = '';
    let _$linkProjects = '';
    let _$linkContact = '';

    let _$sectionAbout = '';
    let _$sectionAboutMobile = '';
    let _$sectionExperience = '';
    let _$sectionSkills = '';
    let _$sectionProjects = '';
    let _$sectionContact = '';

    let _$titleAbout = '';
    let _$titleExperience = '';
    let _$titleSkills = '';
    let _$titleProjects = '';
    let _$titleContact = '';

    let _$linksYears = [];
    let _$sectionYears = [];

    let _$linksProjects = [];
    let _$indivProjects = [];

    let _$dot = '';
    let _$downBtn = '';
    let _$upBtn = '';
    let _currentYear = 0;

    let _$linkMenu = '';
    let _$menu = '';

    let cacheDom = () => {
        _$linkAbout = $('.linkAbout');
        _$linkAboutMobile = $('.linkAboutMobile');
        _$linkExperience = $('.linkExp');
        _$linkSkills = $('.linkSkills');
        _$linkProjects = $('.linkProjects');
        _$linkContact = $('.linkContact');

        _$sectionAbout = $('#overlay');
        _$sectionAboutMobile = $('#aboutMe');
        _$sectionExperience = $('#experience');
        _$sectionSkills = $('#skills');
        _$sectionProjects = $('#projects');
        _$sectionContact = $('#contact');

        _$titleAbout = $('#title-about');
        _$titleExperience = $('#title-exp');
        _$titleSkills = $('#title-skills');
        _$titleProjects = $('#title-projects');
        _$titleContact = $('#title-contact');

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

        _$linksProjects[0] = $("#link-silbato");
        _$linksProjects[1] = $("#link-sulky");
        _$linksProjects[2] = $("#link-arr");
        _$linksProjects[3] = $("#link-kitsune");
        _$linksProjects[4] = $("#link-lostspirit");

        _$indivProjects[0] = $("#silbato");
        _$indivProjects[1] = $("#sulky");
        _$indivProjects[2] = $("#arr");
        _$indivProjects[3] = $("#kitsune");
        _$indivProjects[4] = $("#lost-spirit");

        _$dot = $(".dot");

        _$downBtn = $(".icon-down-open");
        _$upBtn = $(".icon-up-open");

        _$linkMenu = $('.icon-menu');
        _$menu = $('#menu');
    }

    let fx = () => {
        _$linkAboutMobile.click(() => {
            closeExperience();
            closeSkills();
            closeProjects();
            closeContact();
    
            _$sectionAboutMobile.delay(500).fadeIn();
            _$titleAbout.delay(500).fadeIn();

        });
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

        _$upBtn.click(()=>{
            if(_currentYear-1>=0){
                _currentYear--;
                _$sectionYears.forEach(element => {
                    element.fadeOut();
                });
                _$dot.css("top", 30*(_currentYear+1)*1.5);
                _$sectionYears[_currentYear].delay(500).fadeIn();
            }
        });

        _$downBtn.click(()=>{
            if(_currentYear+1<_$sectionYears.length){
                _currentYear++;
                _$sectionYears.forEach(element => {
                    element.fadeOut();
                });
                _$dot.css("top", 30*(_currentYear+1)*1.5);
                _$sectionYears[_currentYear].delay(500).fadeIn();
            }
        });

        for(let i=0; i<_$linksYears.length; i++){
            _$linksYears[i].click(()=>{
                _$sectionYears.forEach(element => {
                    element.fadeOut();
                });
                _$dot.css("top", 30*(i+1)*1.5);
                _$sectionYears[i].delay(500).fadeIn();
                _currentYear = i;
            });
        }

        for(let i=0; i<_$linksProjects.length; i++){
            _$linksProjects[i].click(()=>{
                for(let i=0; i<_$linksProjects.length; i++){
                    _$indivProjects[i].fadeOut();
                    _$linksProjects[i].css("opacity", 0.5);
                }
                _$indivProjects[i].delay(400).fadeIn();
                _$linksProjects[i].css("opacity",1);
            });
        }

        _$linkMenu.click(() => {
            _$menu.fadeToggle();
        });
    }

    let closeAbout = () => {
        _$sectionAbout.fadeOut();
        _$titleAbout.fadeOut();
        _$sectionAboutMobile.fadeOut();
        _$menu.fadeOut();
    }

    let closeExperience = () => {
        _$sectionExperience.fadeOut();
        _$titleExperience.fadeOut();
        _$menu.fadeOut();
    }

    let closeSkills = () => {
        _$sectionSkills.fadeOut();
        _$titleSkills.fadeOut();
        _$menu.fadeOut();
    }

    let closeProjects = () => {
        _$sectionProjects.fadeOut();
        _$titleProjects.fadeOut();
        _$menu.fadeOut();
    }

    let closeContact = () => {
        _$sectionContact.fadeOut();
        _$titleContact.fadeOut();
        _$menu.fadeOut();
    }

    let openAbout = () => {
        closeExperience();
        closeSkills();
        closeProjects();
        closeContact();

        _$sectionAbout.delay(500).fadeIn();
        _$titleAbout.delay(500).fadeIn();
    }

    let openExperience = () => {
        closeAbout();
        closeSkills();
        closeProjects();
        closeContact();

        _$sectionExperience.delay(500).fadeIn();
        _$titleExperience.delay(500).fadeIn();
    }

    let openSkills = () => {
        closeExperience();
        closeAbout();
        closeProjects();
        closeContact();

        _$sectionSkills.delay(500).fadeIn();
        _$titleSkills.delay(500).fadeIn();
    }

    let openProjects = () => {
        closeExperience();
        closeSkills();
        closeAbout();
        closeContact();

        _$sectionProjects.delay(500).fadeIn();
        _$titleProjects.delay(500).fadeIn();
    }

    let openContact = () => {
        closeExperience();
        closeSkills();
        closeProjects();
        closeAbout();

        _$sectionContact.delay(500).fadeIn();
        _$titleContact.delay(500).fadeIn();
    }
    
    let init = () => {
        cacheDom();
        fx();
    }

    init();
});
