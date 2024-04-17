import { SongType } from '../../types';
import favoriteImg from '../../images/checked_heart.png';
import notFavorite from '../../images/empty_heart.png';
import './MusicCard.css';

type SongsListType = {
  songData: SongType;
  onCheck: (id: number) => void;
};

function MusicCard({ songData, onCheck }: SongsListType) {
  const { previewUrl, trackId, trackName, favorite } = songData;

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
          {favorite
            ? <img className="heart-icon" src={ favoriteImg } alt="favorite" />
            : <img className="heart-icon" src={ notFavorite } alt="favorite" />}
        </label>
        <input
          className="favorite-input"
          type="checkbox"
          name="favorite"
          id={ `favorite-${trackId.toString()}` }
          checked={ favorite }
          onChange={ () => onCheck(trackId) }
        />
      </div>
      <hr className="music-card-hr" />
    </>
  );
}

export default MusicCard;
