import { useState } from 'react';
import { SongType } from '../types';
import favorite from '../images/checked_heart.png';
import notFavorite from '../images/empty_heart.png';

function MusicCard({ previewUrl, trackName, trackId }: SongType) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div>
      <p>{trackName}</p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
        .
      </audio>
      <label
        htmlFor={ `favorite-${trackId.toString()}` }
        data-testid={ `checkbox-music-${trackId}` }
      >
        {isChecked
          ? <img src={ favorite } alt="favorite" />
          : <img src={ notFavorite } alt="favorite" />}
      </label>
      <input
        type="checkbox"
        name="favorite"
        id={ `favorite-${trackId.toString()}` }
        checked={ isChecked }
        onChange={ () => setIsChecked(!isChecked) }
      />
    </div>
  );
}

export default MusicCard;
