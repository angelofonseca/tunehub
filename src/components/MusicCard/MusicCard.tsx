import { SongType } from '../../types';
import favoriteImg from '../../images/checked_heart.png';
import notFavorite from '../../images/empty_heart.png';
import './MusicCard.css';

type SongsListType = {
  songData: SongType;
  onCheck: (songData: SongType) => void;
  isFavorite: boolean;
};

function MusicCard({ songData, onCheck, isFavorite }: SongsListType) {
  const { previewUrl, trackId, trackName } = songData;

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
          <img
            className="heart-icon"
            src={ isFavorite ? favoriteImg : notFavorite }
            alt="favorite"
          />
        </label>
        <input
          className="favorite-input"
          type="checkbox"
          name="favorite"
          id={ `favorite-${trackId.toString()}` }
          checked={ isFavorite }
          onChange={ () => onCheck(songData) }
        />
      </div>
      <hr className="music-card-hr" />
    </>
  );
}

export default MusicCard;
