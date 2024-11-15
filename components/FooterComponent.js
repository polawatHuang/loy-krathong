import React, { useState, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';

const FooterComponent = ({ soundOn, soundOff, loyKrathongSong }) => {
    var [count, setCount] = useState(0);
    var [changeImage, setChangeImage] = useState(soundOn);
    var [soundText, setSoundText] = useState('คลิกเพื่อปิดเสียง');
    var [mutedSound, setMutedSound] = useState(false);

    useEffect(() => {
        setDefaultData()
    })

    const setDefaultData = async () => {
        document.getElementById('show_count').innerHTML = count;
    }

    const onClickSound = () => {
        changeImage === soundOn ? setChangeImage(soundOff) : setChangeImage(soundOn);
        soundText === 'คลิกเพื่อปิดเสียง' ? setSoundText('คลิกเพื่อเปิดเสียง') : setSoundText('คลิกเพื่อปิดเสียง');
        mutedSound === false ? setMutedSound(true) : setMutedSound(false);
    }

    return (
        <div className="Footer">
            <footer>
                <p>
                    เว็บไซต์นี้จัดทำโดย <a href="https://www.facebook.com/joediary1996" style={{ color: "yellow" }}>เพจบักทึงของโจ้</a> เพื่อช่วยเหลือสื่งแวดล้อมทางน้ำให้สวยงาม (App version 1.0.0)
                </p>
                <button onClick={onClickSound}>
                    {soundText + " "} <img id="btn" src={changeImage} className="App-sound" alt="btn" />
                </button>
                <ReactAudioPlayer
                    src={loyKrathongSong}
                    autoPlay={true}
                    muted={mutedSound}
                    loop={true}
                    volume={0.1}
                />
            </footer>
        </div>
    )
}

export default FooterComponent;