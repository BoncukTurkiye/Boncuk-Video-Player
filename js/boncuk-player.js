var videoDiv;
var video;
var videoSource;
var videoId;
var videoController;
var videoControllerParts = [];
var videoControllerStatus;
var options;

var videoPlayButton;
var controllerTimeline;
var liveTimeline;

var controlTimer;
var controllerTime = 0;
var currentTime = [0, 0, 0];
var timer = 1000;
var timelineTimer = 50;
var controlTimelineTimer;

var extension;
var fileTypes = [
    {extension: 'mp4', mime: 'video/mp4'},
    {extension: 'webm', mime: 'video/mp4'},
    {extension: 'mkv', mime: 'video/mp4'},
    {extension: 'mov', mime: 'video/mp4'}
];

function AddElement(tag, attribute, text = "") {
    var element;
    element = document.createElement(tag);
    for(var i = 0; i < attribute.length; i++) {
        if(!attribute[i].key == '') {
            element.setAttribute(attribute[i].key, attribute[i].value);
        }
    }
    element.innerHTML = text;
    return element;
}

function BuildElement(videoId) {
    var element;

    document.head.innerHTML += '<link rel="stylesheet" href="css/style.css"/>';

    var vidId = videoId == '' ? {} : {key: "id", value: videoId + "-panel"};

    videoDiv = AddElement("div", [
        {key: "class", value: "boncuk-video-player"},
        vidId
    ]);
    
    document.body.appendChild(videoDiv);

    var mime = '';

    for(var i = 0; i < fileTypes.length; i++) {
        if(extension == fileTypes[i]['extension']) {
            mime = fileTypes[i]['mime'];
        }
    }

    mime = mime == '' ? 'video/mp4' : mime;

    element = AddElement("source", [
        {key: "src", value: videoSource},
        {key: "type", value: mime}
    ]);

    vidId = videoId == '' ? {} : {key: "id", value: videoId + ""};

    video = AddElement("video", [
        {key: "class", value: "boncuk-video-player"},
        vidId
    ]);

    video.muted = true;
    video.controls = false;
    videoDiv.append(video);
    video.append(element);

    video.append(document.createTextNode("Tarayıcınız video özelliğini desteklemiyor..."));

    videoController = AddElement("div", [{key: "class", value: "boncuk-video-controller"}]);
    videoDiv.append(videoController);

    var parts = ["left", "center", "right"];

    for(var i = 0; i < parts.length; i++) {
        videoControllerParts[i] = AddElement("div", [{key: "class", value: "boncuk-video-controller-" + parts[i]}]);
        videoController.append(videoControllerParts[i]);
    }

    videoPlayButton = AddElement("a", [
        {key: "class", value: "boncuk-video-play"},
        {key: "href", value: "#"},
        {key: "onclick", value: "BoncukPlayVideo(true); return false;"}
    ]);
    videoControllerParts[0].append(videoPlayButton);

    element = AddElement("i", [
        {key: "class", value: "fa fa-play"}
    ]);
    videoPlayButton.append(element);

    element = AddElement("a", [
        {key: "href", value: "#"},
        {key: "onclick", value: "BoncukRestartVideo(); return false;"}
    ], '<i class="fa fa-stop"></i>');
    videoControllerParts[0].append(element);

    playerTime = AddElement("span", [
        {key: "class", value: "boncuk-video-player-time"}
    ], "00:00:00");
    videoControllerParts[0].append(playerTime);

    controllerTimeline = AddElement("input", [
        {key: "type", value: "range"},
        {key: "class", value: "boncuk-video-controller-timeline"},
        {key: "min", value: 0},
        {key: "max", value: 1000},
        {key: "value", value: 0},
        {key: "onchange", value: "BoncukJumpTime();"}
    ]);
    videoControllerParts[1].append(controllerTimeline);

    /*element = AddElement("span", [
        {key: "class", value: "boncuk-logo-for-video"}
    ]);
    videoControllerParts[2].append(element);*/

    element = AddElement("a", [
        {key: "href", value: "#"}
    ], '<i class="fa fa-cog"></i>');
    videoControllerParts[2].append(element);

    element = AddElement("a", [
        {key: "href", value: "#"}
    ], '<i class="fa fa-expand"></i>');
    videoControllerParts[2].append(element);

    liveTimeline = AddElement("div", [
        {key: "class", value: "boncuk-video-live-timeline"}
    ]);
    liveTimeline.style.width = "0%";
    videoDiv.append(liveTimeline);
    videoDiv.addEventListener("mouseenter", function() {BoncukToggleController(true);});
    videoDiv.addEventListener("mouseleave", function() {BoncukToggleController(false);});
}

function BoncukVideoPlayer(source, _options = '') {
    videoSource = source;
    extension = source.split('.');
    extension = extension[extension.length-1];
    videoControllerStatus = true;
    
    _options.autoplay = _options.autoplay == undefined ? false : _options.autoplay;
    _options.muted = _options.muted == undefined ? false : _options.muted;
    _options.videoId = _options.videoId == undefined ? '' : _options.videoId;

    options = _options;
    videoId = _options.videoId;
}

function BoncukSetPad(value) {
    return parseInt(value).toString().padStart(2, 0);
}

function BoncukTextTime(currentTime) {
    playerTime.innerHTML = BoncukSetPad(currentTime[0]) + ":" + BoncukSetPad(currentTime[1]) + ":" + BoncukSetPad(currentTime[2]);
}

function BoncukVideoListener() {
    currentTime[2] = parseInt(video.currentTime % 60);
    if(video.currentTime / 60 != currentTime[1])
        currentTime[1] = video.currentTime / 60;
    if(video.currentTime / 3600 != currentTime[0])
        currentTime[0] = video.currentTime / 3600;

    BoncukTextTime(currentTime);

    if(video.paused) {
        videoPlayButton.childNodes[0].className = "fa fa-play";
        videoPlayButton.setAttribute("onclick", "BoncukPlayVideo(true); return false;");
    }else {
        videoPlayButton.childNodes[0].className = "fa fa-pause";
        videoPlayButton.setAttribute("onclick", "BoncukPlayVideo(false); return false;");
    }
}

function BoncukTimelineListener() {
    var _duration = video.currentTime * 100 / video.duration;
    controllerTimeline.value = _duration * 10;
    liveTimeline.style.width = _duration + "%";
}

function BoncukPlayVideo(state = false) {
    if(state) {
        if(video.currentTime >= video.duration)
            video.currentTime = 0;
        
        video.play();
        videoPlayButton.childNodes[0].className = "fa fa-pause";
        controlTimer = setInterval(BoncukVideoListener, timer);
        controlTimelineTimer = setInterval(BoncukTimelineListener, timelineTimer);
    }else {
        video.pause();
        videoPlayButton.childNodes[0].className = "fa fa-play";
        clearInterval(controlTimer);
        clearInterval(controlTimelineTimer);
        BoncukJumpTime();
    }

    video.muted = !state;
    videoPlayButton.setAttribute("onclick", "BoncukPlayVideo(" + !state + "); return false;");
}

function BoncukToggleController(status) {
    if(status) {
        videoController.style.display = "grid";
        liveTimeline.style.display = "none";
    }else {
        videoController.style.display = "none";
        liveTimeline.style.display = "block";
    }
}

function BoncukRestartVideo() {
    video.currentTime = 0;
    BoncukTextTime(currentTime);
    if(video.paused)
        video.play(); 
}

function BoncukJumpTime() {
    var currentValue = controllerTimeline.value;
    video.currentTime = currentValue / 10 * video.duration / 100;
}

document.addEventListener('DOMContentLoaded', function() {
    BuildElement(videoId);

    if(typeof(options) == 'object') {
        if(options.autoplay) {
            BoncukPlayVideo(true);
        }
        video.muted = options.muted;
    }
});
