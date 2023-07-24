const media = function(){

    //access to each class in HTML
    const audio=document.querySelector(".song");
    const playButton=document.querySelector(".play");
    const outline =document.querySelector(".moving-outline circle");
    const videoEffect = document.querySelector(".vide-container video");


    //access to sounds picker button
    const sounds =document.querySelectorAll(".sound-pick button");

    //access to  paly time progress
    const timeDisplay =document.querySelector(".time-progress");

    //retrieve the total outline length of an SVG 
    const outlineLength = outline.getTotalLength();

    // assigns duration 2 minutes value (60 seconds x 2 =120)
    let timeDuration = 120;
        outline.style.strokeDasharray = outlineLength;   //determines the pattern of dashes and gaps in the stroke of an outline.
        outline.style.strokeDashoffset = outlineLength;  //determines the distance by which the dash pattern is offset


    //function to play a different sound when a user click a each button
    sounds.forEach((button)=> {         // iterates over each element in the sounds NodeList using the forEach method
        button.addEventListener('click', () =>{
           const soundSrc = button.getAttribute('data-sound');   //retrieves the value of the data-sound attribute of the clicked button
           const videoSrc  = button.getAttribute('data-video');  //retrieves the value of the data-video attribute of the clicked button
           audio.src = soundSrc;
           videoEffect.src =videoSrc;
            checkPlaying(audio);
        });
        
    });


    //function to play sound
    playButton.addEventListener('click', ()=> {
        checkPlaying(audio);
    });

    // function to stop and play the sounds
    const  checkPlaying = audio => {
        if (audio.paused) {
          audio.play();
          videoEffect.play();
          playButton.src = './svg/pause.svg'; // To get the value of the src of a pause button
        } else {
          audio.pause();
          videoEffect.pause();
          playButton.src = './svg/play.svg'; // To get the value of the src of a play button
        }
      };
     
    //function for animating the circle to show update status
    audio.ontimeupdate = () => {
        let currentTime = audio.currentTime;
        let elapsed = timeDuration -currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed /60);
        

    //animate the circle
     let progress = outlineLength - (currentTime /timeDuration) * outlineLength;
     outline.style.strokeDashoffset = progress;
     

    //count down time
    timeDisplay.textContent = minutes +":" + seconds

    // function to stop from playing when current time position goes back to 0
    if(currentTime >= timeDuration){
        audio.pause();     //pauses the audio playback by calling the pause() method. This stops the audio from playing
        audio.currentTime =0;   //sets the current playback time of the audio to 0, effectively resetting it to the beginning of the audio
        playButton.src ="./svg/play.svg"
        videoEffect.pause();   //pauses the playback of a video effect by calling the pause() method 
    }

    };
};

media();