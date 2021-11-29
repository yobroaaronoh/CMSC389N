import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import moveAlong from './moveAlong.mp3';
import twice from './twice.mp3';
import post from './post.mp3';
import coco from './coco.mp3';
import guy from './guy.png';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Musicians from './components/Musicians';



class MusicPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.sub = {
      email: '', confirme: '', password: '', confirmp: '',
      first: '', last: '', song: '', artist: '', band: '', genre: ''
    };
  }


  mySubmitHandler = (event) => {
    event.preventDefault();
    let email = this.sub.email;
    let confirme = this.sub.confirme;
    let password = this.sub.password;
    let confirmp = this.sub.confirmp;

    if (email == '' || confirme == '' || password == '' || confirmp == '') {
      alert("Must be filled out");
    }
    if (email != confirme) {
      alert("Emails do not match");
    }
    if (password != confirmp) {
      alert("Passwords do not match");
    }
  }

  mySubmitUpHandler = (event) => {
    event.preventDefault();

    let email2 = this.sub.email2;
    let confirme2 = this.sub.confirme2;
    let password2 = this.sub.password2;
    let confirmp2 = this.sub.confirmp2;
    let first = this.sub.first;
    let last = this.sub.last;
    if (email2 == '' || confirme2 == '' || password2 == '' || confirmp2 == '' || first == '' || last == '') {
      alert("Must be filled out");
    }
    if (email2 != confirme2) {
      alert("Emails do not match");
    }
    if (password2 != confirmp2) {
      alert("Passwords do not match");
    }
  }

  myTasteHandler = (event) => {
    event.preventDefault();

    let song = this.sub.song;
    let band = this.sub.band;
    let artist = this.sub.artist;
    let genre = this.sub.genre;
    if (song == '' || band == '' || artist == '' || genre == '') {
      alert("Must be filled out");
    } else {
      alert("You have great music taste!");
    }
  }

  state = {
    index: 3,
    currentTime: '0:00',
    musicList: [{
      name: 'Move Along', author: 'The All American Rejects', img: 'data:image/jpeg;base64,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',
      audio: moveAlong, duration: '4:03'
    },
    { name: 'What is Love?', author: 'Twice', img: 'https://uploads.disquscdn.com/images/89a2f79be1063d1e2c7d7bf137c77233e1a5f5c6a16f5e4b5fe9ff7f57f07fd1.jpg?w=800&h', audio: twice, duration: '3:28' },

    {
      name: 'Circles', author: 'Post Malone', img: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYVFRgVFhYZGBgaHBoaGhkcGhwaGh4aGBwcHhoZGiEcIS4lIR4rIRoYJzgmKy8xNTU1ISQ7QDszPy40NTEBDAwMBgYGEAYGEDEdFh0xMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAAAQQFAgMGB//EAEIQAAEDAgQDBQYEAgcJAQAAAAEAAhEDIQQSMUEFUWEGInGBkTJCobHB8BNS0eEUcmJjkqKywvEVIyQ0Q1N00uIW/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ANyEk0AhCEDTSTQCEQmgEIhCATCSaAQgpSgaaxlNA0JJhAJlJNAgmhNAJpIQNCJQEAhCEBCE0IIyEIQBTlJCBhNJCBoQhA0FJYPqBoJJAA1J080GyVpxGJYwS9waOphc5xXtEZLKI6Z/0CrcPQc8h73Fx3LrxytPNBe4jtNTB7jXP6izZnSSoze0rzB/CESQe9+y1N4U0gtkguvMQAJublGJwAAaG6aA2tyBsL387IJTO1TNH03t6iHBWeE4xRfZjwTyNj8VxlalltEHlFh4hRatMHUQdjz5oPTGvWUrzzAcSrUzDH5gPcdf0nzXWcK40yt3fYfplO9vd6ILhH39wsQVkgYSRKaAQhAQATQEQgAE0IQKOiEIQRk0BCAlCE0AhATQCESkUGNV4aCToLrkOL8SNUloMNG06+PorDjnEO9kGg85Kj4bg7nNDyDBv49PggqsNhZNtbnoLanoL7FW+Gyxr3WxM6uO8AbD5x554fhjnO9g5WzLp1J2AnaeXJScRw6pDGNDszpkyQADygRIAvPPdAYavDi4tLRm0M2bHdHiS4x1K1x3CHwIY48w4OnKG9QforJ3Bw9wJL9JIzGQLaQdr+q04fhrnZmvaCJDmtnMQ06CXGCJtHQ80HN4nDFo7zmyTMyJHOdz5KKzCk2ufK8bLssRwBxfm9wQMoAsG3E67SCVnW4C0lrwO82CIJAIG1vO/htZBw+JY4GCIvyGnTot1Cg4jMHElsQd+kFdhxfhbYJFtAR/MYn1j0XK0XfguLXNkHrvzAP6oOh4HxPOMjz3xud+vyV2uHr1Q17KjCZn1HVdlhK2drXc4Qb00gnKAQhEoGEIQAgYQhNAQhKPv7KEEVNJNABNJNA0JJoBR8bXDGOcToP9FvKp+0dSGAc3fK/rZBR4KkajySbCTznSYj7ldvQqPczKxgb3bFzgCJFiAJjmub4HSyS6NYHjc2F7TLbrp8JlEhh7wcA47ExMR4HZBOwLHlgnJMcjvtqpYpvBvlOwsY67mEsM5T2oI/4DuTR1krXTwRBHe7t7ADy18Sp6xKCNXoWu53rHyVO/ChpIBMeMQR4fdlc132VTXegrcfTbAcSTBsCC4GCCNBa4XLcapS/NNrlpBkAWHqfp0XY1MrTmcdRl+ZsPvTouQ7Qta0523a/S8g75vp5aoOfD4Bbe1/jGnmus7LYrMws/Lof22XIvsD9zO/qrXsviMtYNPvAx46oO6CaxasggaEJoBARCEDQgJoBCU9PiUIIwRCEFAIQmgAmhCBLn+1Xss/mXQlUfaiiTSDh7rgfJBlwr2WjQEwD1F5+CuOG0HMHeNzeOQGk3PM6Kq4QRkAe29iBoZM36Wv5hXTG52mCRtOu3syQdydEFrhXyAQZ5Kxa5UmGzyAQQIsJA3Hn4K2wz5EoJIWDkZ0GqBug01WDkq+sAJJIAGpW3FcUpN9p4HmFW1cdRDXF72mZIIIsNBHX6oKzHVS8FrHh5yzDWtynXNcgx+WJm657i+HLRaTGYAQd2za1mgbeK6F/GKDjrECAdo5fAKJjyCJb3jBA+BkkX280HCV3G8iCIsVv4Q8itTcNcwHrZSeN4XKc0zOtt5lReF0/97TGvfafQ/sg9OaFnKhcQ4pTpNaDdzjoDoNz4BTGuQMJoCEAiUIQNOEk0BCE4QgiBCAhAJhIJoGEIQgYUfiNIOpPaRYgi3hr4KSFoY4io4G7SBblaDHogrKLgKbHHTLJHOJj9EmdpmMsWkCdRGvyWytgvxKbWNMAEHyjT4qHU4VSaP946fgfhdBliu3AB7jCbRJIAPIxB6qZge2Zc2S24BnrexHr5Lm8Y7CMnKxziNTcgX3J01C14LE05lrAPLw6oPSeHcUFZuaIPIqt7R4p8Nawkbujfl8UuzkGwt+3JLtK4tgC5Ngg4jEYOo90bdSpNDsy8iXVA3pCnmhUEABwLrzEm5i2wHUqZxjg76eHa+nULqpID4ykNaTrDmue7b3hzgCyCnxHBmM/6hPUQPkm2s4PkG0AR4aKsNCvYvMEncAO+EH1V/wAI4S97g5xGWJJ++iCv4hTLpYGSXXk/GP7X3CreFPDHl591pI8dl2NbDEOc50DKIa2PdJNzO/dH2Vx9KlNYt2JP2UFk2m57g5xkn4ArscKIY3+UfJc5hKJaHMO2keX6rqWtsAgaaUJhAIQhBkgoCEDQhCCIhCEAmhNAQhCaBtWYbcGNJWtY1a2RrnDUAkIInD2EtZDZJaMxJjWCRG/7qJxXghebuN9QDAPIGNR0U7h7gaQm4yMJIiYGUyJG2qmYmp3GBoyNsJgOgDYA9LToEFLX4dSfTYx7A38My1zSAbxOoIvA2Kk8L4PSYZFIAbZpcT1M6aDZSmVnAnuAE+w3LBAgkZzzMaAW8wTtOIeRYBpPnrofiEE6iRnEKu437bfGVYYC7/BRu0dOO/uPkgwa/M3KCR4FaalB598GPzA2+Pgo1FweAQTzIGp6c91JNLPBuGi9iQYBnYzeI80EKhw9j3Hv5o1AEDcfQ38VfUsO1jC2YJHn43VazCvA7hyXnYEzqSY18lFxJexjy4y8tIkEnQH82mpMdUGninF2lxAHdktzfY5yFx+PflrSNZHqQp2KxJLQBoGn4i5+PzVRj398HcAeqDuMPhXQydXDO/oPdb8leFVHCyQxsmS8gb+6L/AK2PJAIQhA0wkE0DCEIQEITzfcIQREBAQAgaAkmgaEIQOVqxJ7jvA621W0LRinlrXPDc4a15IlogZHgvhwg5Jzx/R6IIHZ+sHU2zoAWHzJH0arvCXYA4ARaOUW381yHCagZXfSkFjgHsOxa8B7SPIsK6+k6yCUxjReBP6fZWNVg11ISDlskRdBr4Y9rXEkzzuNdwq7jGOpueQ91r226yqXEY1jKr8jx3nd4X1Hw81T8Vwxqd5zu6LQDY+mqC6pYumHNdSfLCYtddNRdLZXn3CHU2PbmMBt4FgD1/MV3LcYwtBDhHl0QSKj4Cqse+QRZSn1Q4GLgqtxdUAXKDl8ThMpue7Nh8fRUld8vnaQrbiuKuVQucguMdxpz2kMc5oFRjwQSCCWFhA39xm/PmV1PZnjv44yPI/EaNfzt/MOukriDTY0tyVM+Zgc/uFmV5BLmXPeyke0LFYis5j2vYS1zYIPVB600phU3AeMtxDPyvb7bf8AM3+if2VwEGSJQhBkE1iFkgWVCfmmghlCEIBNJNAJwkmgFA41inU6L3tIDhliROpA+qnqp7Sj/h3+LP8AEEHGPxL/AMUvmRTbSZsIYxjWMHWzR812/CuJB7dfvkuFxM/8Sb2dSBO/tED5J4DGuZEbaeKDv+K8UFIdToPDdc1je0LyInbTnO1tgFGx+KFVrHcoDjqsmcEc8AgxaR1+7oKtuILnF2+qvcRw57aIcXNJ1gEX6eK0YfglQyC/J4tH6Le/hNYiHVxEa5Dm/RBQ1ahBuIPNb2Y1wi8ELZiuGEGA8v6myxpcO3I9UEvAcXc14Bu12o+oW/jPEdgeSgnAhpzjlp+nxVViapJMoNdeoSVolNxWtxQSsO4SwQBeCRMnNa8mLTsB5pOasMMJcFYVafe0sgj4TEPpPD2GHN0PTcHmCvReC8YZiGSLPEZ2bg8xzHIrzp9MrZhMS+g8PYbt9CDq09Cg9WCYULh+PZWYHscCDrzB1gjYqYCgyCcpBZIGhL72QgiIRCJQCaQKaBlCQTCAWjG4VtRhY+YdExY2vyUgICDm8X2SpPcX53hxJJNjc+ixd2YYykWB7ic2YOIEgxEQNrBdKgoPO8LQcx/4dQFvTn57q7wGLyOE3a2Wi82MfKLK34rwpldsOs4ey4ag/ouUDn0Hlj4JiAdiCdb9fig6PEY5xbmDR0m0+EKgxHF3zFvjp6q2wdaWGXNIiwi7SY96b+EKhxhAedOU6oJNCq5+p+Fip4o2kqvwVcC5iN08bxdsW1QaeI1mj7uufqPlZ4isXEklRyUASkhAQScEBmEq7pNzCLxsBqqPDm66Gg/uxPr6Qfu6CI6nO0dT93Wg4Y8lZEEgkADw36/JanGeiCsoVn03ZmOLXDcfI8/Arp+G9riIbWbI/O3/ADN/T0XKVXXK1OdCD1nAY5lZuem8PG8ajoRqD0KlArzDAcXDGNaGEPa5xzteQ4tMQ3Ke7Yz3hEgwQdV0HC+1t8tYW2eB/jaPmPRB2KFVf7aw3/eZ/aCaCQmkhAwiUIQMJrFNA0wVimgCVg94aJJAAuSdI5kqJxfiAoUnPIkiAB1OkkCwXB8T4/Vr5mlwaw+4AIjk4m5QdNxHtZSYB+GPxHETazfMkfKVymO4o+q4OeGjWA0RrzvdQWti5SJ3QT6OLIm/3ZRn1iSozXJlyCSa59Foe+VjmWBKBuKxQhAJtSWxgQbaLLhT2PI3UZtghr0FhTxR02W1xbe2jSY8lXsdGq2U68Bx+Phf6R5oID7vIG5gD5KRiKOSGH2jr0/db+Dta3NVf7vs9XHko9Al73vPIk+eiCG9l1KwmIaJa9maYynNlymRM2MgiRFoN76F1GRC1VKFpCCw/gv6yj61P/RCqfwzyQg9cTSQgYKaEIAIQESgcLFzoEm0X9E5VDx3tAykCxnfeREbNndx08kHJca4s/EvkyGD2WzIA/MeZKrgEBDigHFJ+gQnibGOUINIKyWITQNJCEAhJOEAFuotWsBSaAQZlqMqykBa3PQNzoSe+GEc1rc5OJyjqg21nkMazlc+d/0U3hVGaT3f02t+BM+qr65i2pOpVnwquG0Xg8wdelkEbHRmyi8alS24buiyjYCnnerSsO+GciAgqv4UfcIV5/DeHoUkHWhZJIlA00kBA1i5yHG0/cLiePdoS/uUyQN3THp06oNGO7Q4hweJDGucQI9oASCAdx1VCSt2FwrqjgAQ0FzWF7pDGl85Q5wBiYMefIoxeFfTeab2lr2mC06goNW3ikU36+FligzoiXDxWOJMuPituFF81rc1HqaoE1NATQYwhOEQgSYRCcIBq3h8LUAmEGwFYOckSkga3t953KGjxP2VoYbrcw2A8XH6fAINVXVZsdAWtx3UluHJAACDouxXBKuJe802Ehogu0aHG8ZjaYvGseKgcRfkxBbY/hvh0EOEsMEAixuNRZTOAYrCvoOwuMZVLWvL6b6Tmgtc4EOzBwgm+sHQC0X5/GYXI/J3gye7miY5kNtPRBc/7UHIIWv/APPf1/8Ac/8AtCDvUBCaARKAgoKTtRjDToEAgF5DRe5B9qPJefvXT9uKgz0m7BpJHi79lzAcJ6IM2VnBuUOIbmD4Foe0EBwOoMFbcVjX1nuq1Xl7zBLnGSSAGt9AB6KO0J1GFvdOoN7g6W1FuaDAJOKyjYJFiBvcRpotcrN+gPktaDIJpBZBAwsg1ACTjKASKZ0WdJl55IE6nAlYNcVuqvkIpU5CDSXIWb6dm9Z+cBYFl4QHNbAbO8AFi1pJjlJ9LlNhlpM7/FBnQfDm2k6axraT66b9FNOLnNsBoPkq6iYcHfelllPdQbMK+CZ0IP8AqttWtnawO9ps96/s7TboopJvGmhPRbKNQtLizTLfNGlha+s7ILX+P6v9GfqhVX8Q7n/dZ+iEHqbVl+6EIGPv4rF2hTQg8/7Y/wDMn+Vn1VCNUIQScJ7Q/mb81rr+0UIQFD2vIpVvaQhBg72fP6LWhCDJqzYhCBu+iHoQgFIZ7J+9kIQaHKTQ9k+CaEGLf+n4fVYe/wCqEIMT7/8AI76K/wC2GuH/APFw/wDhCEIOcZ9fos/dPkmhBpctzvZHl9UIQaEIQg//2Q==',
      audio: post, duration: '3:46'
    },

    {
      name: 'Un Poco Loco', author: 'Anthony Gonzalez, Gael García Bernal', img: 'https://sm.ign.com/t/ign_in/review/c/coco-revie/coco-review_qkpv.1200.jpg',
      audio: coco, duration: '1:52'
    }],
    pause: false,
  };


  updatePlayer = () => {
    const { musicList, index } = this.state;
    const currentSong = musicList[index];
    const audio = new Audio(currentSong.audio);
    this.playerRef.load();
  }

  nextSong = () => {
    const { musicList, index, pause } = this.state;

    this.setState({
      index: (index + 1) % musicList.length
    });
    this.updatePlayer();
    if (pause) {
      this.playerRef.play();
    }
  };

  prevSong = () => {
    const { musicList, index, pause } = this.state;

    this.setState({
      index: (index + musicList.length - 1) % musicList.length
    });
    this.updatePlayer();
    if (pause) {
      this.playerRef.play();
    }
  };


  playOrPause = () => {
    const { musicList, index, pause } = this.state;
    const currentSong = musicList[index];
    const audio = new Audio(currentSong.audio);
    if (!this.state.pause) {
      this.playerRef.play();
    } else {
      this.playerRef.pause();
    }
    this.setState({
      pause: !pause
    })
  }

  clickAudio = (key) => {
    const { pause } = this.state;

    this.setState({
      index: key
    });

    this.updatePlayer();
    if (pause) {
      this.playerRef.play();
    }
  }


  render() {
    const { musicList, index, currentTime, pause } = this.state;
    const currentSong = musicList[index];

    return (

      <div className="App">

        <nav className="Navbar">
          <h2></h2>
          <ul>
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/About">about</Link>
            </li>
            <li>
              <Link to="/Play Music"> play </Link>
            </li>
            <li>
              <Link to="/Login">log in</Link>
            </li>
            <li>
              <Link to="/Sign Up">sign up</Link>
            </li>
            <li>
              <Link to="/tasty"> music taste</Link>
            </li>
            <li>
              <Link to="/musician"> Musicians</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/">
            <img src={guy} alt="guy" />
                <div class="motto">
              Share the Sound.
    </div>

            <div class="mission">
              <em> Why don't we listen </em>
              <br></br>
              <em> together?</em>
            </div>
          </Route>
          <Route path="/about">
            <h1> The final exam of CMSC389N </h1>
            <h1> by Aaron Oh </h1>
          </Route>
          <Route path="/Play Music">
            <div className="player">
              <div className="current-song">
                <audio ref={ref => this.playerRef = ref}>
                  <source src={currentSong.audio} type="audio/ogg" />
              Your browser does not support the audio element.
          </audio>
                <div className="img-wrap">
                  <img src={currentSong.img} />
                </div>
                <span className="song-name">{currentSong.name}</span>
                <span className="song-autor">{currentSong.author}</span>

                <div className="time">
                  <div className="current-time">{currentTime}</div>
                  <div className="end-time">{currentSong.duration}</div>
                </div>

                <div ref={ref => this.timelineRef = ref} id="timeline">
                  <div ref={ref => this.playheadRef = ref} id="playhead"></div>
                  <div ref={ref => this.hoverPlayheadRef = ref} class="hover-playhead" data-content="0:00"></div>
                </div>

                <div className="controls">
                  <button onClick={this.prevSong} className="prev prev-next current-btn"><i className="fas fa-backward"></i></button>

                  <button onClick={this.playOrPause} className="play current-btn">
                    {
                      (!pause) ? <i className="fas fa-play"></i>
                        : <i class="fas fa-pause"></i>
                    }
                  </button>
                  <button onClick={this.nextSong} className="next prev-next current-btn"><i className="fas fa-forward"></i></button>
                </div>

              </div>

              <div className="play-list" >
                {musicList.map((music, key = 0) =>
                  <div key={key}
                    onClick={() => this.clickAudio(key)}
                    className={"track " +
                      (index === key && !pause ? 'current-audio' : '') +
                      (index === key && pause ? 'play-now' : '')} >

                    <img className="track-img" src={music.img} />
                    <div className="track-discr" >
                      <span className="track-name" >{music.name}</span>
                      <span className="track-author" >{music.author}</span>
                    </div>
                    <span className="track-duration" >
                      {(index === key)
                        ? currentTime
                        : music.duration
                      }
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Route>

          <Route path="/login" >
            <div class="form-container sign-in-container">
              <form name="signin" onSubmit={this.mySubmitHandler} action="#">
                <h1>Log in</h1>
                <input type="email" name="email" placeholder="Email" />
                <input type="email" name="confirme" placeholder="Confirm Email" />
                <input type="password" name="password" placeholder="Password" />
                <input type="password" name="confirmp" placeholder="Confirm Password" />
                <a href="#">Forgot your password?</a>
                <input type="submit" value="Sign In" />
              </form>
            </div>
          </Route>

          <Route path="/Sign Up">
            <div class="form-container sign-up-container">
              <form name="signup" onSubmit={this.mySubmitUpHandler} action="#">
                <h1>Create Account</h1>
                <input type="text" name="first" placeholder="First Name" />
                <input type="text" name="last" placeholder="Last Name" />
                <input type="email" name="email2" placeholder="Email" />
                <input type="email" name="confirme2" placeholder="Confirm Email" />
                <input type="password" name="password2" placeholder="Password" />
                <input type="password" name="confirmp2" placeholder="Confirm Password" />
                <input type="submit" value="Sign Up" />
              </form>
            </div>
          </Route>

          <Route path="/tasty">
            <div class="taste-container">
              <form name="taste" onSubmit={this.myTasteHandler} action="#">
                <h1>How is your taste in music?</h1>
                <input type="text" name="song" placeholder="Favorite Song?" />
                <input type="text" name="artist" placeholder="Favorite Artist?" />
                <input type="text" name="band" placeholder="Favorite Band?" />
                <input type="text" name="genre" placeholder="Favorite Genre?" />
                <input type="submit" value="Submit" />
              </form>
            </div>
          </Route>

          <Route path="/musician">
            <div class="taste-container">
              <Musicians />
            </div>
          </Route>

        </Switch>

        <div className="logo">
          <li class="material-icons logo"> music_note</li>
          <li class="material-icons brand"> Busking </li>

        </div>
      </div>

    );
  }
}


ReactDOM.render(
  <Router>
    <MusicPlayer />
  </Router>,
  document.getElementById('root')
)




