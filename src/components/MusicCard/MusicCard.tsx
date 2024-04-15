import { useState } from 'react';
import { SongType } from '../../types';
import favorite from '../../images/checked_heart.png';
import notFavorite from '../../images/empty_heart.png';
import './MusicCard.css';

function MusicCard({ previewUrl, trackName, trackId }: SongType) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <div className="music-card-container">
        <p className="song-name">{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label
          className="favorite-label"
          htmlFor={ `favorite-${trackId.toString()}` }
          data-testid={ `checkbox-music-${trackId}` }
        >
          {isChecked
            ? <img className="heart-icon" src={ favorite } alt="favorite" />
            : <img className="heart-icon" src={ notFavorite } alt="favorite" />}
        </label>
        <input
          className="favorite-input"
          type="checkbox"
          name="favorite"
          id={ `favorite-${trackId.toString()}` }
          checked={ isChecked }
          onChange={ () => setIsChecked(!isChecked) }
        />
      </div>
      <hr className="music-card-hr" />
    </>
  );
}

export default MusicCard;
