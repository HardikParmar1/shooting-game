import './App.css';
import {useState, useEffect} from "react";
import Button from "./button";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import gunShot from "./sounds/sound.mp3";
function App() {
  const [p1Score , setp1Score]= useState(0);
  const [p2Score , setp2Score]= useState(0);
  const [p1RandomPower, setp1RandomPower]= useState(Math.random()*5+1);
  const [p2RandomPower, setp2RandomPower]= useState(Math.random()*5+1);
  const [round , setRound] =useState(1);
  const [winner , setWinner] = useState();
  const [p1Health , setP1Health ] = useState(100);
  const [p2Health , setP2Health ] = useState(100);
  const [playSound, setPlaySound] = useState({
      sound:true,
      showIcon:"mute"
  });

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  function setScore(){
    setp1RandomPower(Math.random()*5+1);
    setp2RandomPower(Math.random()*5+1);

    if(round <=5){
      setRound(round + 1);
      if(p1RandomPower>p2RandomPower){
        setp1Score(p1Score + 1);
        setP2Health(p2Health - (p1RandomPower+25));
      }else if(p1RandomPower===p2RandomPower){
        setp1Score(p1Score + 1);
        setp2Score(p2Score + 1);
      }else{
        setp2Score(p2Score + 1);
        setP1Health(p1Health -(p2RandomPower+25));
      }
    }else{
      setRound("Game Over")
    }

    if(playSound.sound === true){
      var audio = new Audio(gunShot);
      audio.play();
    }
  }

  function reset(){
    setRound(1);
    setp1Score(0);
    setp2Score(0);
    setWinner();
    setP1Health(100);
    setP2Health(100);
    document.querySelector(".p1-health-bar").style.width = "100%";
    document.querySelector(".p2-health-bar").style.width = "100%";
  }


useEffect(()=>{
  if(p1Score>=3){
    setWinner("Player 1 wins 🏅");
  } else if (p2Score >=3){
    setWinner("Player 2 wins 🏅");
  }
  document.querySelector(".p2-health-bar").style.width = `${p2Health}%`;
  document.querySelector(".p1-health-bar").style.width = `${p1Health}%`;
})

  return (
    <>
      <div className="container">
      {playSound.showIcon === "mute"? (
        <div className="sound">
        <VolumeUpIcon onClick={() =>{setPlaySound({sound:false , showIcon:"unMute"})}} style={{ color: "#C2FFF9" }} sx={{ fontSize: 34 }}/>
        </div>):

      (<div className="sound">
        <VolumeMuteIcon onClick={() =>{setPlaySound({sound:true , showIcon:"mute"})}} style={{ color: "#71DFE7" }} sx={{ fontSize: 34 }} />
      </div>)
      }

      <div className="about">
      <InfoIcon onClick={handleClick} style={{ color: "#C2FFF9" }} sx={{ fontSize: 33 }}/>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
             vertical: 'top',
             horizontal: 'center',
          }}
      >
        <Typography sx={{ p: 2 }} >
            <>
            <li className="about-title">Game details</li>
            <li className="about-text"> The game has 5 rounds in total.</li>
            <li className="about-text"> Both players will have 100% health when the game starts.</li>
            <li className="about-text"> When you start the game the player generates power which reduces the opponent's health.</li>
            <li className="about-text"> The player has to win at least 3 rounds to win the game.</li>
            <li className="about-text"> The player who wins 3 games will automatically be declared as the winner with no more further rounds.</li>
            </>
        </Typography>
      </Popover>
    </div>

      <h1>{round>5 || round === "Game Over"?"Game Over" :  (!winner?`Round ${round}`: "Congratulations")}</h1>
        <div className="game">
          <div className="player">
        <p>Player 1  Won: <span>{p1Score}</span></p>
        <div className="health">
        <div className="p1-health-bar">
          <p>{`${Math.floor(p1Health)}%`}</p>
        </div>
        </div>
        </div>
        <div className="player">
        <p>Player 2   Won: <span>{p2Score}</span></p>
          <div className="health">
          <div className="p2-health-bar">
          <p>{`${Math.floor(p2Health)}%`}</p>
        </div>
        </div>
        </div>

  </div>
      <div className="buttonArea">
      {
        !winner?(
          <Button
          className="start-btn"
          type="button"
          onClick={setScore}
          text="Start Game"
          />
      )
        :
          (
          <Button
          className="reset-btn"
          type="button"
          onClick={reset}
          text="Reset"
          />
        )
      }
      </div>
      <h2>{winner}</h2>

      </div >
  </>
);
}

export default App;
