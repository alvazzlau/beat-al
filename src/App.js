import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import P1 from './components/P1';
import {spring, parallel, tween, easing, keyframes} from 'popmotion';

const HEIGHT = 215

let _punchSound, _growingSound;

function App() {
  const [scale, setScale] = useState(100);
  const [tranY, setTranY] = useState(100);
  const [rotate, setRotate] = useState(0);
  const [height, setHeight] = useState(HEIGHT);
  const [gameOver, setGameOver] = useState(false);
  const [p1Opacity, setP1Opacity] = useState(1);

  useEffect(() => {
    const punchSound = new Audio(require('./asset/image/punch.mp3'));
    const growingSound = new Audio(require('./asset/image/mario_growing.mp3'))
    punchSound.volume = 0.2;
    punchSound.preload = 'auto';
    punchSound.load();

    growingSound.volume = 0.2;
    _punchSound = punchSound;
    _growingSound = growingSound;
  }, [])

  useEffect(() => {
    if (scale < 1) {
      setGameOver(true);
    }
  }, [scale])

  useEffect(() => {
    if (!gameOver) {
      setScale(100);
      setTranY(100);
      keyframes({
        values: [0, 1, 0, 1, 0, 1, 0, 1, 0,1,0,1,0,1,0,1,0,1],
        duration: 1200
      })
        .start(v => setP1Opacity(v));
    }
  }, [gameOver])

  const playPunchSound = () => {
    const sound = _punchSound.cloneNode();
    sound.volume = .2;
    sound.play();
  }

  const handleOnClick = () => {
    console.log('haha')
    playPunchSound();
    tween({
      from: 0,
      to: 70,
      flip: 1,
      duration: 150,
      ease: easing.easeIn
    })
      // .start(v => {
      //   setRotate(v);
        
      // });
      .start({
        update: v => setRotate(v),
        complete: () => {}
      })
    if (!gameOver) {
      parallel(
        spring({
          from: {
            scale,
            tranY,
          },
          to: {
            scale: scale - 2.5,
            tranY: tranY - 3,
          },
          stiffness: 3200,
          damping: 10
        }),
      )
        .start(([{ scale, tranY }]) => {
          setScale(scale);
          setTranY(tranY);
        });
    }
  }

  const handleOnRespawn = () => {
    _growingSound.play();
    setGameOver(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="background">
          <P1
            p1Opacity={p1Opacity}
            scale={scale}
            tranY={tranY}
            rotate={rotate}
            onP1Clicked={handleOnClick}
          />
          <div className="counter">
            {`${
              Math.floor(height * (scale/100)) > 5
              ? Math.floor(height * (scale / 100))
              : '?? '
            }cm`}
          </div>
          {
            gameOver
            && (
              <div
                className="respawn"
                onClick={handleOnRespawn}>
                {'復活'}
              </div>
            )
          }
        </div>
      </header>
    </div>
  );
}

export default App;
